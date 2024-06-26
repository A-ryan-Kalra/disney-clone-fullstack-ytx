import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  try {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res.status(401).json({ error: "Invalid request" });
    }
    const existingUser = await prismadb.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      return res
        .status(422)
        .json({ error: "Email already taken please try another email" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prismadb.user.create({
      data: {
        email: email,
        name: username,
        hashedPassword: hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
}
