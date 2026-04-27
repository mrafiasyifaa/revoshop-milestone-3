/**
 * @jest-environment node
 */
import { POST } from "@/src/app/api/auth/logout/route";

describe("POST /api/auth/logout", () => {
  it("should return success true", async () => {
    const response = await POST();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({ success: true });
  });

  it("should clear auth_session cookie", async () => {
    const response = await POST();
    const setCookie = response.headers.get("set-cookie");

    expect(setCookie).toContain("auth_session=");
    expect(setCookie).toMatch(/expires=Thu, 01 Jan 1970/i);
  });
});
