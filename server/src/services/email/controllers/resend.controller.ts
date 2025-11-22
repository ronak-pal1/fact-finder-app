import { Request, Response } from "express";
import { render } from "@react-email/components";
import OtpTemplate from "../templates/otp.template";
import React from "react";
import asyncHandler from "../../../utils/asyncHandler";

export const resendOTPTemplate = asyncHandler(async (req: Request, res: Response) => {
  const html = await render(
    React.createElement(OtpTemplate, {
      otp: "123456",
      description: "Your OTP is 123456",
      email: "ronakpaul1@gmail.com",
      name: "Ronak",
    })
  );


  res.set("Content-Type", "text/html");
  res.send(html);
});
