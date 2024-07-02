"use client";

import React, { createContext, useState, useContext } from "react";
import { getUserSession } from "@/utils/userAuth";
import LoadingScreen from "@/components/Navigation/LoadingScreen";

// Create the context
const UserAuthContext = createContext({});

export default function UserAuthContextProvider({ children }) {
  const [session, setSession] = useState("");

  const userSession = async () => {
    try {
      const {
        data: { session },
        error,
      } = await getUserSession();

      if (!error && session) {
        setSession({
          isAuthenticated: Boolean(session.access_token),
          userInfo: session.user,
        });
      } else {
        setSession({
          access_token: "",
          userInfo: {},
          isAuthenticated: false,
        });
      }
    } catch (e) {
      setSession({
        access_token: "",
        userInfo: {},
        isAuthenticated: false,
      });
    }
  };

  React.useEffect(() => {
    userSession();
  }, []);

  if (!session) {
    return <LoadingScreen />;
  }

  return (
    <UserAuthContext.Provider
      value={{
        isAuthenticated: session.isAuthenticated,
        userData: { ...session.userInfo },
        setUserData: setSession,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(UserAuthContext);
