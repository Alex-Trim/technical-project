import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

interface AuthRequestBody {
  login: string;
  password: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { login, password } = req.body as AuthRequestBody;

    try {
      const response = await axios.post(
        "https://trainess-api.dev-vt2b.ru/auth/login",
        {
          login,
          password,
        }
      );

      return res
        .status(200)
        .json({ data: response.data, message: "Успешная авторизация" });
    } catch (error: unknown) {
      console.error("Ошибка авторизации:", error);

      if (axios.isAxiosError(error)) {
        return res.status(error.response?.status || 500).json({
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
