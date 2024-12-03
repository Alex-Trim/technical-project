import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

interface AuthRequestBody {
  login: string;
  password: string;
  email: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { login, password, email } = req.body as AuthRequestBody;

    try {
      const response = await axios.post(
        "https://trainess-api.dev-vt2b.ru/auth/registration",
        {
          login,
          password,
          email,
        }
      );

      return response.data;
    } catch (error: unknown) {
      console.error("Ошибка авторизации:", error);

      if (axios.isAxiosError(error)) {
        return res
          .status(error.response?.status || 500)
          .json({
            message: error.response?.data?.message || "Ошибка авторизации",
          });
      } else {
        return res.status(500).json({ message: "Неизвестная ошибка" });
      }
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Метод ${req.method} не разрешен`);
  }
}
