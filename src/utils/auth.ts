import { createHash } from "crypto";

// 认证 token 为密码的哈希，避免使用可预测的固定值（如 "authenticated"）被伪造 cookie 绕过
export function tokenFor(password: string): string {
  return createHash("sha256").update(`portfolio-auth:${password}`).digest("hex");
}
