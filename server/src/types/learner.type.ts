export interface Learner {
  id: string;
  name: string;
  company?: string;
  designation: string;
  address: string;
  number: string;
  email: string;
  password: string;
  role: string;
  refreshToken?: string;
  otp?: string;
  tlsi?: string; // temporary login session identifier 
  createdAt: string;
  updatedAt: string;
}
