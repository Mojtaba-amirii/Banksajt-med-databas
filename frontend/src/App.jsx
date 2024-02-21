import { useState } from "react";
import Login from "./Login";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [amount, setAmount] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState(null);

  function handleRegister() {
    const user = {
      username: username,
      password: password,
      amount: amount,
    };

    fetch("http://localhost:4001/users", {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        // Check if the response is JSON or text
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return res.json();
        } else {
          return res.text(); // Handle non-JSON responses
        }
      })
      .then((data) => {
        if (typeof data === "object") {
          console.log("Registration successful:", data);
          setRegistrationStatus("success");
        } else {
          console.log("Registration successful (non-JSON response):", data);
          setRegistrationStatus("success");
        }
      })
      .catch((error) => {
        console.error("Error during registration:", error);
        setRegistrationStatus("error");
      });
  }

  return (
    <div className="flex flex-col justify-center items-center bg-slate-500 gap-5 w-full h-full p-10">
      <header>
        <h1 className="text-4xl font-bold">MUJI BANK</h1>
      </header>
      <main className="w-2/3 mx-auto">
        <form className="w-1/2 mx-auto flex flex-col gap-2">
          <h2 className="text-xl">Create your bank account here</h2>
          <label>Username</label>
          <input
            title="username"
            type="text"
            placeholder="Enter username"
            autoComplete="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter a strong password"
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Amount</label>
          <input
            type="number"
            placeholder="Insert the amount"
            autoComplete="off"
            onChange={(e) => setAmount(e.target.value)}
          />
          <button type="button" onClick={handleRegister}>
            REGISTER
          </button>
          {registrationStatus === "success" && (
            <p className="text-green-500">Registration successful!</p>
          )}
          {registrationStatus === "error" && (
            <p className="text-red-500">
              Registration failed. Please try again.
            </p>
          )}
        </form>
        <Login />
      </main>
    </div>
  );
}

export default App;
