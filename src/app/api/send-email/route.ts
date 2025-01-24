import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Define types
type CartItem = {
  name: string;
  price: number;
  quantity: number;
};

type EmailRequestBody = {
  email: string;
  name: string;
  cartItems: CartItem[];
  totalPrice: number;
};

export async function POST(request: Request) {
  // Parse the request body with the defined type
  const { email, name, cartItems, totalPrice }: EmailRequestBody =
    await request.json();

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Format the cart items for the email
  const itemsList = cartItems
    .map(
      (item) =>
        `<li>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</li>`
    )
    .join("");

  // Email content
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "🎉 Thank you for your purchase! 🎉",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h1 style="color: #4CAF50;">Hello ${name},</h1>
        <p>Thank you for shopping with <strong>Bandage Online Shopping</strong>! </p>
        <p>We're excited to let you know that your order has been successfully placed. </p>
        
        <h2 style="color: #4CAF50;">📦 Your Order Details:</h2>
        <ul style="list-style-type: none; padding: 0;">
          ${itemsList}
        </ul>
        <p><strong>💵 Total: $${totalPrice.toFixed(2)}</strong></p>

        <p> Your parcel will be delivered to you soon! We hope you love your new items.</p>
        <p>If you have any questions or need assistance, feel free to contact us at <a href="mailto:muhammadumar.1101111@gmail.com" style="color: #4CAF50; text-decoration: none;">ukubaid74@gmail.com</a> or call us at <strong>+92-3172077696</strong>.</p>

        <p>Thank you again for choosing <strong>Bandage Online Shopping</strong>! We appreciate your trust in us. </p>
        <p>Have a great day! </p>

        <p style="font-size: 12px; color: #777;">
          This is an automated email. Please do not reply directly to this message.
        </p>
      </div>
    `,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send email" },
      { status: 500 }
    );
  }
}