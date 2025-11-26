import React from "react";

const FormCard = ({ title, children }) => {
  return (
    <div className="center-container">
      <div className="card">
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
};

export default FormCard;
