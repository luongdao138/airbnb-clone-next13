import argon2 from "argon2";

export interface AuthUtil {
  hashPwd: (pwd: string) => Promise<string>;
  verifyPwd: (hashed: string, pwd: string) => Promise<boolean>;
}

const authUtil: AuthUtil = {
  async hashPwd(pwd) {
    return await argon2.hash(pwd);
  },
  async verifyPwd(hashed, pwd) {
    return await argon2.verify(hashed, pwd);
  },
};

export default authUtil;
