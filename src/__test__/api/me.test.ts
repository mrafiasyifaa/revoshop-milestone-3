/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";
import { GET } from "@/src/app/api/auth/me/route";

jest.mock("@/src/app/api/metrics/route", () => ({
  httpRequestDuration: { observe: jest.fn() },
}));

const makeRequest = (cookieHeader?: string) =>
  new NextRequest("http://localhost/api/auth/me", {
    headers: cookieHeader ? { cookie: cookieHeader } : {},
  });

describe("GET /api/auth/me", () => {
  it("should return null user when no cookie present", async () => {
    const response = await GET(makeRequest());
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({ user: null });
  });

  it("should return user from valid auth_session cookie", async () => {
    const mockUser = {
      id: 1,
      email: "test@example.com",
      name: "Test User",
      role: "customer",
      avatar: "avatar.jpg",
    };

    const response = await GET(
      makeRequest(`auth_session=${encodeURIComponent(JSON.stringify(mockUser))}`)
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.user).toEqual(mockUser);
  });

  it("should return null user when cookie contains invalid JSON", async () => {
    const response = await GET(makeRequest("auth_session=not-valid-json"));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({ user: null });
  });
});
