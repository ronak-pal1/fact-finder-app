import { v4 as uuidv4 } from "uuid";

export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};


export const generateTlsi = () => {
  return uuidv4();
}
  

export const sendOtp = async (email: string, otp: string) => {
  console.log(`OTP sent to ${email}: ${otp}`);
  return true;
};
