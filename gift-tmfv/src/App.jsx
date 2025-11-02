import React, { useState } from "react";
import Login from "./Login";

function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div>
      <h1>مرحبًا {user.name}</h1>
      {user.role === "owner" ? (
        <h2>لوحة التحكم الخاصة بالمدير 🛠️</h2>
      ) : (
        <h2>صفحة الطالب 👩‍🎓</h2>
      )}
    </div>
  );
}

export default App;
