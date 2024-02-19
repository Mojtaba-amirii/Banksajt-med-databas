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
    <div className="">
      <h2>Register</h2>
      <label> username </label>
      <input
        title="username"
        type="text"
        placeholder="Enter username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <label>password</label>
      <input
        type="text"
        placeholder="Enter a strong password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <label>Amount</label>
      <input
        type="number"
        placeholder="Insert the amount"
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="button" onClick={handleRegister}>
        {" "}
        Register here!
      </button>
      <Login />
    </div>
  );
}

export default App;
