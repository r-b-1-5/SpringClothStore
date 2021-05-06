import React, { createContext, useContext, useState } from "react";
import SETTINGS from "./settings";

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const login = async (username, password) => {
    const raw = await fetch(`${SETTINGS.BASE_URL}/tokens/obtain`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    });
    const json = await raw.json();
    console.log(json);
    const token = json.token;
    console.log(token);
    const payload = JSON.parse(atob(token.split(".")[1]));
    setUser({ token: token, payload: payload });
  };

  const logout = () => {
    setUser(false);
  };

  // Return the user object and auth methods
  return {
    user,
    login,
    logout,
  };
}
