import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [myToken, setMyToken] = useState(null); // State to store the token

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const user = { username, password };

      const response = await fetch("http://localhost:4001/sessions", {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.token) {
        console.log(data.token);
        setIsLoggedIn(true);
        setMyToken(data.token); // Set the token in state
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Error during login", error);
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGetAccount = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!isLoggedIn) {
        throw new Error("User is not logged in");
      }

      if (!myToken) {
        throw new Error("Token not available");
      }

      const response = await fetch("http://localhost:4001/me/accounts", {
        method: "GET",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + myToken,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setAmount(data.amount);
    } catch (error) {
      console.error("Error during get account", error);
      setError("Failed to retrieve account information.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-5">
      <h2>Login into your Bank account</h2>
      <form className="w-1/2 mx-auto flex flex-col gap-2">
        <label>Your username </label>
        <input
          title="Log in"
          type="text"
          placeholder="Your username"
          autoComplete="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Your password</label>
        <input
          type="password"
          placeholder="Your password"
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={handleLogin} disabled={loading}>
          {loading ? "Logging In..." : "Log In"}
        </button>
        {isLoggedIn && <div>{`Welcome ${username}!`}</div>}
        <div>
          <h2>Your Credit</h2>
          <button type="button" onClick={handleGetAccount} disabled={loading}>
            {loading ? "Checking..." : "Check"}
          </button>
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <div>{amount}</div>
      </form>
    </div>
  );
}

export default Login;
