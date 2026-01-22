import adminApi from "../../apis/adminApi";

class UserService {
  // Get all users
  getAllUsers() {
    return adminApi.get("/users");
  }

  // Get user KYC details
  getUserKYC(userId: string) {
    return adminApi.get(`/users/${userId}/kyc`);
  }

  // Approve KYC
  approveKYC(userId: string) {
    return adminApi.post(`/users/${userId}/kyc/approve`);
  }

  // Reject KYC
  rejectKYC(userId: string, reason: string) {
    return adminApi.post(`/users/${userId}/kyc/reject`, { reason });
  }
}

export default new UserService();
