import { useState, useCallback } from "react";

const USERS_KEY = "quisip_users";
const CURRENT_USER_KEY = "quisip_current_user";

export default function useAuth() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(CURRENT_USER_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  const getUsers = () => {
    const saved = localStorage.getItem(USERS_KEY);
    return saved ? JSON.parse(saved) : [];
  };

  const register = useCallback((username, email, password) => {
    const users = getUsers();

    if (users.find((u) => u.username === username)) {
      return { success: false, error: "Username sudah terdaftar" };
    }

    if (users.find((u) => u.email === email)) {
      return { success: false, error: "Email sudah terdaftar" };
    }

    const newUser = { username, email, password, createdAt: Date.now() };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    return { success: true };
  }, []);

  const login = useCallback((identifier, password) => {
    const users = getUsers();
    const found = users.find(
      (u) =>
        (u.username === identifier || u.email === identifier) &&
        u.password === password
    );

    if (!found) {
      return { success: false, error: "Username/email atau password salah" };
    }

    const userData = {
      username: found.username,
      email: found.email,
      loginTime: Date.now(),
    };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData));
    setUser(userData);

    return { success: true };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setUser(null);
  }, []);

  return {
    user,
    isLoggedIn: !!user,
    login,
    register,
    logout,
  };
}
