import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container } from "semantic-ui-react";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <div className="login">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#title">ProtestPlots</Navbar.Brand>
          <Nav className="me-auto navbar-fixed-top" activeKey="/login">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/protestpg">Find Protests</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className="login__container">
      <h1 className="login__h1">
        Login to ProtestPlots
      </h1>
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="login__btn"
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          Continue with Google
        </button>
        <div className = "login__options">
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div className = "login__options">
          Don't have an account?&nbsp;<Link to="/register">Register</Link>&nbsp;now.
        </div>
      </div>
    </div>
  );
}
export default Login;