// Frontend - React (SaveUp.js)
import React, { useState } from "react";
import { Button, Input } from "@/components/ui/button";
import "./styles.css";

export default function SaveUp() {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [savingsGoal, setSavingsGoal] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const balance = income - expenses;

  const handleLogin = async () => {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) setIsLoggedIn(true);
  };

  const handleSaveData = async () => {
    await fetch("http://localhost:5000/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, income, expenses, savingsGoal }),
    });
  };

  return (
    <div className="container">
      {!isLoggedIn ? (
        <div className="login-box">
          <h2>Hyr në SaveUp</h2>
          <Input type="text" placeholder="Emri i përdoruesit" value={username} onChange={(e) => setUsername(e.target.value)} />
          <Input type="password" placeholder="Fjalëkalimi" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={handleLogin}>Hyr</Button>
        </div>
      ) : (
        <div className="dashboard">
          <header className="header">
            <h1>SaveUp!</h1>
            <p>Menaxho Financat e tua</p>
          </header>
          <main className="content">
            <div>
              <label>Të ardhurat mujore:</label>
              <Input type="number" value={income} onChange={(e) => setIncome(Number(e.target.value))} />
            </div>
            <div>
              <label>Shpenzimet mujore:</label>
              <Input type="number" value={expenses} onChange={(e) => setExpenses(Number(e.target.value))} />
            </div>
            <div>
              <label>Objektivi i kursimeve:</label>
              <Input type="number" value={savingsGoal} onChange={(e) => setSavingsGoal(Number(e.target.value))} />
            </div>
            <Button onClick={handleSaveData}>Ruaj të dhënat</Button>
            <div className="balance">
              <h3>Bilanci: {balance} €</h3>
              <p className={balance >= savingsGoal ? "positive" : "negative"}>
                {balance >= savingsGoal ? "Urime! Po kurseni me sukses!" : "Keni nevojë për të kursyer më shumë."}
              </p>
            </div>
          </main>
          <footer className="footer">
            <p>© 2025 SaveUp. Të gjitha të drejtat e rezervuara.</p>
          </footer>
        </div>
      )}
    </div>
  );
}
