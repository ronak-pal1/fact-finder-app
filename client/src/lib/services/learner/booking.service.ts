import { learnerApiClient } from "../../api/learner.client";

export interface Booking {
  id: string;
  courseId: string;
  courseTitle: string;
  bookingDate: string;
  status: "pending" | "confirmed" | "cancelled";
}

class BookingService {
  public async createBooking(courseId: string): Promise<Booking> {
    const response = await learnerApiClient.post<Booking>("/bookings", {
      courseId,
    });
    return response.data;
  }

  public async getMyBookings(): Promise<Booking[]> {
    const response = await learnerApiClient.get<Booking[]>(
      "/bookings/my-bookings",
    );
    return response.data;
  }
}

export const bookingService = new BookingService();
