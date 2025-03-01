"use client";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/shared/services/auth-context";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import "@/shared/styles/globals.scss";
import { setContext } from "@apollo/client/link/context";
import Cookies from "js-cookie";

const inter = Inter({
  subsets: ["cyrillic", "latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
});

const httpLink = createHttpLink({
  uri: "https://trainess-api.dev-vt2b.ru/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get("authAccessToken");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={inter.className}>
        <ApolloProvider client={client}>
          <AuthProvider>{children}</AuthProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
