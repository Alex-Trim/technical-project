import { NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";

interface DecodedToken {
  userId: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ valid: false });
  }

  try {
    const decoded = verify(
      token,
      process.env.JWT_SECRET as string
    ) as DecodedToken;
    return res.status(200).json({ valid: true, user: decoded });
  } catch (error) {
    console.error("Ошибка проверки токена:", error);
    return res.status(401).json({ valid: false });
  }
}
