import { useState } from "react";
import Login from "./components/Login";
import "./styles/App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [amount, setAmount] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState(null);

  function handleRegister() {
    console.log("API Base URL:", import.meta.env.VITE_API_BASE_URL);

    const user = {
      username: username,
      password: password,
      amount: amount,
    };

    fetch(`${import.meta.env.VITE_API_BASE_URL}/users`, {
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

        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return res.json();
        } else {
          return res.text();
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
    <main className="flex flex-col justify-center items-center bg-slate-500 gap-y-5 w-full h-full py-4">
      <header className="w-full text-center bg-inherit sticky top-0 z-10">
        <h1 className=" text-4xl font-bold">MUJI BANK</h1>
      </header>
      <section className="w-2/3 flex flex-col mx-auto gap-y-6">
        <form className="w-1/2 mx-auto flex flex-col gap-3">
          <h2 className="text-2xl text-center">
            Create your bank account here
          </h2>
          <label>Choose Username</label>
          <input
            title="username"
            type="text"
            placeholder="Enter username"
            autoComplete="username"
            onChange={(e) => setUsername(e.target.value)}
            className="p-1 rounded-sm"
          />
          <label>Choose Password</label>
          <input
            title="password"
            type="password"
            placeholder="Enter a strong password"
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
            className="p-1 rounded-sm"
          />
          <label>Put any Amount</label>
          <input
            title="amount"
            type="number"
            placeholder="Insert the amount"
            autoComplete="off"
            onChange={(e) => setAmount(e.target.value)}
            className="p-1 rounded-sm"
          />
          <button
            title="Register account button"
            type="button"
            className="bg-blue-500 p-1 mt-2"
            onClick={handleRegister}
          >
            Register
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
      </section>
      <footer>Designed and developed by Mojtaba Amiri</footer>
    </main>
  );
}

export default App;
