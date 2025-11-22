import { render } from "@react-email/render";
import React from "react";
import OtpTemplate from "./templates/otp.template";
import { Resend } from "resend";
import { config } from "../../env.config";

const resend = new Resend(config.resend.API_KEY);

export async function sendOtpEmail(to: string, otp: string, description: string, name:string) {
  const html = await render(
    React.createElement(OtpTemplate, {
      otp,
      description,
      email: to,
      name,
    })
  );

  return await resend.emails.send({
    from: "Aries <no-reply@no-reply.ronakpaul.com>",
    to,
    subject: "Your Aries OTP Code",
    html,
  });
}
