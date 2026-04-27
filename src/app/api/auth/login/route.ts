import { NextRequest, NextResponse } from "next/server";
import { loginCounter } from "@/src/app/api/metrics/route";

//Rate Limit
const rateLimitMap = new Map<string, {count: number; resetAt: number}>();
const RATE_LIMIT = 5
const WINDOW_MS = 15*60*1000

function checkRateLimit(ip: string): {allowed: boolean, remaining: number}{
    const now = Date.now()
    const entry = rateLimitMap.get(ip)

    if(!entry || now > entry.resetAt){
        rateLimitMap.set(ip, {count: 1, resetAt: now+WINDOW_MS})
        return {allowed: true, remaining: RATE_LIMIT-1}
    }

    entry.count++;
    if(entry.count>RATE_LIMIT){
        return {allowed: false, remaining:0}
    }

    return {allowed: true, remaining: RATE_LIMIT-entry.count}
}

const EMAIL_REGEX = /^[^@\s]{1,64}@[^@\s]{1,255}$/;

export async function POST(request: NextRequest){
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown"
    const timestamp = new Date().toISOString()

    const rateLimit = checkRateLimit(ip)
    if(!rateLimit.allowed){
        console.log(JSON.stringify({event: "auth.login.rate_limited", ip, timestamp}))

        loginCounter.inc({ status: "rate_limited" });

        return NextResponse.json(
            {error: "Too many login attempts!"},
            {status: 429, headers: {"Retry-After":"900"}}
        )
    }

    let body: {email?: string; password?: string}
    try {
        body = await request.json()
    } catch{
        return NextResponse.json({error: "Invalid request body"},{status: 400})
    }

    const {email, password} = body

    if(!email || !password){
        return NextResponse.json(
            {error: "Email and password are required!"},
            {status: 400}
        )
    }

    if(!EMAIL_REGEX.test(email)){
        return NextResponse.json({error: "Invalid email format!"},{status: 400})   
    }

    if(password.length<4){
        return NextResponse.json(
            {error: "Password must be at least 4 characters"},
            {status: 400}
        )
    }

    //Proxy
    try{
        const loginResponse = await fetch("https://api.escuelajs.co/api/v1/auth/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        })

        if(!loginResponse.ok){
            console.log(JSON.stringify(
                {event: "auth.login.failed", ip, timestamp, email}
            ))

            loginCounter.inc({ status: "failed" });

            return NextResponse.json({error: "Invalid email or password!"},{status:401})
        }

        const {access_token} = await loginResponse.json()

        const profileResponse = await fetch("https://api.escuelajs.co/api/v1/auth/profile",{
            method: "GET",
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        })

        if (!profileResponse.ok){
            return NextResponse.json({error: "Failed to fetch user profile!"},{status:502})
        }

        const raw = await profileResponse.json()
        const user = {
            id: raw.id,
            email: raw.email,
            name: raw.name,
            role: raw.role,
            avatar: raw.avatar
        }

        console.log(JSON.stringify({
            event: "auth.login.success",
            ip,
            timestamp,
            email,
            userId: user.id
        }))

        loginCounter.inc({ status: "success" });

        const response = NextResponse.json({ success: true, user });
        response.cookies.set("auth_session", JSON.stringify(user), {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24,
          path: "/",
        });
        return response;

    } catch (error){
        console.log(JSON.stringify({
            event: "auth.login.error",
            ip,
            timestamp,
            error: error instanceof Error ? error.message : "Unknown error"
        }))
        return NextResponse.json({error: "Internal server error"}, {status: 500})
    }

}