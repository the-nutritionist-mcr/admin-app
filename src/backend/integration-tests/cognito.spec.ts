import path from "path";
import { loginToCognito } from "./loginToCognito";

describe("backend stack userpool", () => {
  it("accepts a login and returns a token", async () => {
    const token = await loginToCognito()
    expect(token).not.toBeNull()
  })
});
