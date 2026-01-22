import adminApi from "../../apis/adminApi";

class StatsService {
  // Get dashboard overview stats
  getDashboardStats() {
    return adminApi.get("/stats/dashboard");
  }
}

export default new StatsService();
