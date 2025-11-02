import React, { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebaseConfig";
import "./login.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const usersRef = collection(db, "students");
      const q = query(
        usersRef,
        where("username", "==", username),
        where("password", "==", password)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("❌ اسم المستخدم أو كلمة المرور غير صحيحة");
      } else {
        const userData = querySnapshot.docs[0].data();
        setError("");
        alert(`✅ مرحبًا ${userData.name}!`);
        onLogin(userData);
      }
    } catch (err) {
      console.error(err);
      setError("حدث خطأ أثناء تسجيل الدخول");
    }
  };

  return (
    <div className="login-container">
      <h1>🎓 تسجيل الدخول</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="اسم المستخدم"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">تسجيل الدخول</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Login;
