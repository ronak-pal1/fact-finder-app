import adminApi from "../../apis/adminApi";

class BookingService {
  // Get all bookings
  getAllBookings() {
    return adminApi.get("/bookings");
  }

  // Get booking stats
  getBookingStats() {
    return adminApi.get("/bookings/stats");
  }
}

export default new BookingService();
