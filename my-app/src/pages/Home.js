import React from "react";

const Home = () => {
  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        fontFamily: "'Raleway', sans-serif",
      }}
    >
      {/* Large Blue Background Box */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "50%",
          height: "100%",
          backgroundColor: "#1D3557", // Blue color
          zIndex: 1,
        }}
      ></div>

      {/* Background Image */}
      <img
        src="img/backg.png" // Replace with the actual image path
        alt="Ocean Background"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "50%", // Restrict width to 50% of the screen
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />

      {/* Welcome Section - Vertical Rectangle White Box */}
      <div
        style={{
          position: "absolute",
          top: "10%", // Leave some space at the top
          right: "5%", // Positioned on the right
          backgroundColor: "white",
          width: "40%", // Slimmer width
          height: "80%", // Tall vertical rectangle
          textAlign: "center",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          zIndex: 3,
          border: "none", // No rounded edges
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            color: "#1D3557",
            marginBottom: "20px",
          }}
        >
          Welcome to AquaAlert
        </h1>
        <a
          href="#"
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: "#457B9D",
            textDecoration: "none",
          }}
        >
          Get the Latest Flood Updates →
        </a>
      </div>


    </div>
  );
};

export default Home;
