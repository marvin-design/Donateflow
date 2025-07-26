// src/hooks/useAuth.js
import { useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("user_id");
    
    if (token && role && userId) {
      setUser({ role, userId });
    }
  }, []);

  return { user };
}