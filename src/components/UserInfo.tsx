import React, { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const UserInfo: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Redirige al login después de cerrar sesión
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
    }
  };

  if (!user) return null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "10px",
      }}
    >
      {user.photoURL && (
        <img
          src={user.photoURL}
          alt="User Avatar"
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            marginRight: 10,
          }}
        />
      )}
      <span>{user.displayName}</span>
      <button className="btn btn-danger btn-sm ms-3" onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default UserInfo;
