import { auth } from "../services/firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Private({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setSigned(true);
        setLoading(false);
      } else {
        setSigned(false);
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (signed) {
    return <>{children}</>;
  }

  if (!signed) {
    navigate("/login");
  }

  return <>{}</>;
}
