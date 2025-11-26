import React, { useState } from "react";
import FormCard from "../components/FormCard";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleReset = () => {
    alert("Password reset instructions sent (demo only).");
  };

  return (
    <FormCard title="Forgot Password">
      <input
        className="input-box"
        type="email"
        placeholder="Enter your account email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button className="btn-primary" onClick={handleReset}>
        Send Reset Link
      </button>

      <p style={{ marginTop: "15px", textAlign: "center" }}>
        Back to{" "}
        <Link to="/login" className="text-link">
          Login
        </Link>
      </p>
    </FormCard>
  );
};

export default ForgotPassword;
