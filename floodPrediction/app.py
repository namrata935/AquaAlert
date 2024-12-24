import streamlit as st
import os
import numpy as np
from joblib import load
import base64

# Directory where models and processed data are saved
model_dir = './models'

# Function to encode a local image to Base64
def get_base64_image(image_path):
    with open(image_path, "rb") as img_file:
        return base64.b64encode(img_file.read()).decode()

# Add custom CSS for navbar and background image
background_image = get_base64_image("flood.jpg")  # Make sure flood.jpg is in the same directory

# Add custom CSS for styling
st.markdown(
    f"""
    <style>
        /* Navbar styling */
        .navbar {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            background-color: rgb(20, 141, 228);
            color: white;
            font-size: 20px;
        }}
        .navbar a {{
            text-decoration: none;
            color: white;
            margin: 0 10px;
            font-weight: bold;
        }}

        /* Blurred background image styling */
        .background {{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url("data:image/jpeg;base64,{background_image}") no-repeat center center fixed;
            background-size: cover;
            filter: blur(8px);  /* Apply blur effect */
            z-index: -1;  /* Send background to the back */
        }}

        /* Prevent other content from being blurred */
        .stApp {{
            background: none;
        }}

        /* Styling for selectbox and input fields */
        div[data-testid="stSelectbox"] label, 
        div[data-testid="stNumberInput"] label {{
            color: white;  /* Make label text white */
        }}

        div[data-testid="stSelectbox"] .st-bs, 
        div[data-testid="stNumberInput"] input {{
            background-color: rgba(255, 255, 255, 0.1);  /* Transparent background */
            color: black;  /* Black text inside the dropdown and input boxes */
            border: 1px solid white;  /* Add white border for better visibility */
        }}

        /* Placeholder text styling */
        ::placeholder {{
            color: rgba(255, 255, 255, 0.7);  /* Semi-transparent white placeholder */
        }}
    </style>
    <div class="background"></div>
    <div class="navbar">
        <div>AquaAlert</div>
        <div><a href="/">Home</a></div>
    </div>
    """,
    unsafe_allow_html=True
)

# List of subdivisions
subdivisions = [
    "Andaman & Nicobar Islands", "Arunachal Pradesh", "Assam & Meghalaya", 
    "Naga Mani Mizo Tripura", "Sub Himalayan West Bengal & Sikkim", 
    "Gangetic West Bengal", "Orissa", "Jharkhand", "Bihar", 
    "East Uttar Pradesh", "West Uttar Pradesh", "Uttarakhand", 
    "Haryana Delhi & Chandigarh", "Punjab", "Himachal Pradesh", 
    "Jammu & Kashmir", "West Rajasthan", "East Rajasthan", 
    "West Madhya Pradesh", "East Madhya Pradesh", "Gujarat Region", 
    "Saurashtra & Kutch", "Konkan & Goa", "Madhya Maharashtra", 
    "Matathwada", "Vidarbha", "Chhattisgarh", "Coastal Andhra Pradesh", 
    "Telangana", "Rayalseema", "Tamil Nadu", "Coastal Karnataka", 
    "North Interior Karnataka", "South Interior Karnataka", 
    "Kerala", "Lakshadweep"
]

# Main Content
st.title("Flood Prediction for Indian Subdivisions")

# Dropdown for subdivision selection
place_name = st.selectbox("Select a subdivision:", subdivisions)

# Input fields for user data (integer input)
avg_june_rainfall = st.number_input("Enter average June rainfall for 10 days (mm):", min_value=0, step=1, placeholder="e.g., 50")
sub_increase = st.number_input("Enter increase in rainfall from May to June (mm):", min_value=0, step=1, placeholder="e.g., 20")
annual_rainfall = st.number_input("Enter total annual rainfall (mm):", min_value=0, step=1, placeholder="e.g., 1000")

if st.button("Predict Flood"):
    # Load the model for the selected place
    model_path = os.path.join(model_dir, f"{place_name.replace(' ', '_')}_model.pkl")
    if not os.path.exists(model_path):
        st.success(f"No flood risk for {place_name}.", icon="✅")
    else:
        try:
            # Load the trained model
            model = load(model_path)

            # Prepare the input data
            user_input = np.array([[avg_june_rainfall, sub_increase, annual_rainfall]])

            # Predict using the model
            prediction = model.predict(user_input)[0]

            # Display the result
            if prediction == 1:
                st.warning(f"Flood is likely in {place_name}.", icon="⚠️")
            else:
                st.success(f"No flood risk for {place_name}.", icon="✅")
        except Exception as e:
            st.error(f"An error occurred during prediction: {e}", icon="🚫")
