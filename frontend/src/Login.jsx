import { useState } from "react";

let myToken;

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [amount, setAmount] = useState("");

  function handleLogin() {
    const user = {
      username: username,
      password: password,
    };
    fetch("http://localhost:4001/sessions", {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.token);
        myToken = data.token;
      });
  }

  function handleGetAccount() {
    fetch("http://localhost:4001/me/accounts", {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + myToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAmount(data.amount);
      });
  }

  return (
    <div className="App">
      <h2>login into your Bank account</h2>
      <label>Your username </label>
      <input
        title="Log in"
        type="text"
        placeholder="Your username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <label>Your password</label>
      <input
        type="password"
        placeholder="Your password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="button" onClick={handleLogin}>
        {" "}
        Click to log in!
      </button>
      <br />
      <br />
      <div>
        <h2>Account</h2>
        <button onClick={handleGetAccount}>Get account</button>
      </div>
      <div>{amount}</div>
    </div>
  );
}
export default Login;
