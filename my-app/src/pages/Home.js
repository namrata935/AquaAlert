import React from "react";

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh", // Full viewport height
        textAlign: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#d6eaff", // Light blue card color
          padding: "40px",
          borderRadius: "15px", // Curved edges
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Subtle shadow
          maxWidth: "700px", // Limit card width
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "4rem", // Large heading
            fontWeight: "700", // Bold font weight
            fontFamily: "'Raleway', sans-serif", // Using Raleway font
            color: "#3A88FC", // Aqua blue color
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
            color: "#333", // Neutral dark text color
            maxWidth: "600px", // Limit width for readability
            lineHeight: "1.8", // Comfortable spacing
            margin: "0 auto",
          }}
        >
          Stay safe and prepared with our flood prediction tool and resources.
        </p>
      </div>
    </div>
  );
};

export default Home;
