import { useState } from "react";
import Login from "./Login";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [amount, setAmount] = useState("");

  function handleRegister() {
    const user = {
      username: username,
      password: password,
      amount: amount,
    };
    console.log("user: ", user);

    fetch("http://localhost:4001/users", {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => console.log("got response", res))
      .then((data) => console.log(data));
  }

  return (
    <div className="App">
      <h1>MUJI BANK</h1>
      <h2>Register</h2>
      <form className=" flex flex-col border border-s-orange-100">
        <label>Write a Username </label>
        <input
          title="username"
          placeholder="username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>New a Password</label>
        <input
          title="password"
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>amount</label>
        <input
          title="amount"
          placeholder="amount"
          type="number"
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="button" title="register-account" onClick={handleRegister}>
          {" "}
          Register here!
        </button>
      </form>
      <Login />
    </div>
  );
}

export default App;
