/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";
import { POST } from "@/src/app/api/auth/login/route";

jest.mock("@/src/app/api/metrics/route", () => ({
  loginCounter: { inc: jest.fn() },
  httpRequestDuration: { observe: jest.fn() },
}));

const makeRequest = (body: object, ip: string) =>
  new NextRequest("http://localhost/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(body),
  });

const validBody = { email: "test@example.com", password: "validpass" };

describe("POST /api/auth/login", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it("should return 400 when email is missing", async () => {
    const response = await POST(makeRequest({ password: "pass123" }, "10.1.0.1"));
    expect(response.status).toBe(400);
  });

  it("should return 400 when password is missing", async () => {
    const response = await POST(makeRequest({ email: "test@example.com" }, "10.1.0.2"));
    expect(response.status).toBe(400);
  });

  it("should return 400 for invalid email format", async () => {
    const response = await POST(makeRequest({ email: "not-an-email", password: "pass123" }, "10.1.0.3"));
    expect(response.status).toBe(400);
  });

  it("should return 400 for password shorter than 4 characters", async () => {
    const response = await POST(makeRequest({ email: "test@example.com", password: "ab" }, "10.1.0.4"));
    expect(response.status).toBe(400);
  });

  it("should return 401 for invalid credentials", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
    const response = await POST(makeRequest(validBody, "10.1.0.5"));
    expect(response.status).toBe(401);
  });

  it("should return 502 when profile fetch fails", async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({ ok: true, json: async () => ({ access_token: "token" }) })
      .mockResolvedValueOnce({ ok: false });

    const response = await POST(makeRequest(validBody, "10.1.0.6"));
    expect(response.status).toBe(502);
  });

  it("should return 200 with user and set HttpOnly cookie on success", async () => {
    const mockUser = {
      id: 1,
      email: "test@example.com",
      name: "Test User",
      role: "customer",
      avatar: "avatar.jpg",
    };

    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({ ok: true, json: async () => ({ access_token: "token" }) })
      .mockResolvedValueOnce({ ok: true, json: async () => mockUser });

    const response = await POST(makeRequest(validBody, "10.1.0.7"));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.user).toEqual(mockUser);

    const setCookie = response.headers.get("set-cookie");
    expect(setCookie).toContain("auth_session=");
    expect(setCookie).toContain("HttpOnly");
  });

  it("should return 500 when fetch throws an error", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));
    const response = await POST(makeRequest(validBody, "10.1.0.8"));
    expect(response.status).toBe(500);
  });

  it("should return 429 after exceeding rate limit", async () => {
    const ip = "10.1.0.99";
    (global.fetch as jest.Mock).mockResolvedValue({ ok: false });

    for (let i = 0; i < 5; i++) {
      await POST(makeRequest(validBody, ip));
    }

    const response = await POST(makeRequest(validBody, ip));
    expect(response.status).toBe(429);
  });
});
