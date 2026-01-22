import adminApi from "../../apis/adminApi";

class AuthService {
  constructor() {}

  login(email: string, password: string) {
    return adminApi.post("/login", { email, password });
  }

  logout() {
    return adminApi.post("/logout");
  }
}

export default AuthService;
