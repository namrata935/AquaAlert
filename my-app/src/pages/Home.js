import React from "react";

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh", // Full viewport height
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1
        style={{
          fontSize: "4rem", // Large heading
          fontWeight: "700", // Bold font weight
          fontFamily: "'Raleway', sans-serif", // Using Raleway font
          color: "#1A73E8", // Aqua blue color
          marginBottom: "20px",
        }}
      >
        Welcome to AquaAlert
      </h1>
      <p
        style={{
          fontSize: "1.5rem", // Large paragraph font
          fontWeight: "bold", // Regular font weight
          fontFamily: "'Raleway', sans-serif", // Using Raleway font
          color: "whitesmoke", // Neutral text color
          maxWidth: "600px", // Limit width for readability
          lineHeight: "1.8", // Comfortable spacing
        }}
      >
        Stay safe and prepared with our flood prediction tool and resources.
      </p>
    </div>
  );
};

export default Home;
