"use client";
import React, { useEffect, useState, ReactNode, JSX } from "react";
import { useRouter } from "next/navigation";
import { setToken, storeCookiesOfObject } from "@/helper/function";
import { jwtDecode } from "jwt-decode";
import { useSession } from "next-auth/react";
import Cookies from "js-cookie";

interface AuthContextType {
  user: any;
  Logout: () => Promise<void>;
  userId: any;
  authError: any;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = React.createContext<AuthContextType | null>(null);

export function AuthContextProvider({ children }: AuthProviderProps): JSX.Element {
  const [user, setUser] = useState<any>(undefined);
  const [authError, setAuthError] = useState<any>(undefined);
  const [userId, setUserId] = useState<any>(null);

  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      let decoded: any = undefined;
      let id_token: any = undefined;
      let decodedRefresh: any = undefined;

      if (session["accessToken"]) {
        decoded = jwtDecode(session["accessToken"]);
      }
      if (session["id_token"]) {
        id_token = jwtDecode(session["id_token"]);
      }
      if (session["refreshToken"]) {
        decodedRefresh = jwtDecode(session["refreshToken"]);
      }

      if (session["accessToken"] && decoded) {
        setToken("accessToken", session["accessToken"], decoded["exp"]);
      }
      if (session["refreshToken"] && decodedRefresh) {
        setToken("refreshToken", session["refreshToken"], decodedRefresh["exp"]);
      }

      if (session["accessToken"] && decoded) {
        const token = session["accessToken"].split(".");
        setToken("headerPayload", `${token[0]}.${token[1]}`, decoded["exp"]);
        setToken("signature", `${token[2]}`, decoded["exp"]);
      }

      if (id_token) {
        storeCookiesOfObject(id_token, id_token.exp);
      }
    }
  }, [session]);

  const Logout = async () => {
    try {
      const res = await fetch("/user/auth/logout", { method: "POST" });
      const data = await res.json();

      if (data.statusCode === 200) {
        router.push("/auth/login");
        window.sessionStorage.clear();
        window.localStorage.clear();

        const cookies = Cookies.get();
        for (const cookie in cookies) {
          Cookies.remove(cookie);
        }

        setUser(undefined);
        setUserId(undefined);
        setAuthError(undefined);
      } else {
        setAuthError(data);
      }
    } catch (error: any) {
      setAuthError(error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, Logout, userId, authError }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }
  return context;
};
