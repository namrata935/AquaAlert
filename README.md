# AquaAlert 🌊

AquaAlert is a comprehensive flood management and community support platform designed to help users predict floods, assess severity, and stay safe. Built with modern web technologies and APIs, it combines predictive analytics, community forums, and donation/volunteer systems for real-time flood assistance.

## Key Features

1. **Flood Prediction**  
   - Predicts potential floods using a **logistic regression model** trained on historical rainfall and weather data.
   - Users input subdivision, average June rainfall, increase from May to June, and total annual rainfall.
   - State-specific models are stored as `.pkl` files for accurate local predictions.

2. **Flood Severity Index**  
   - Calculates flood severity using the **OpenWeather API** and various calculations.
   - Provides real-time severity levels to help users gauge potential risk.

3. **Community Forum**  
   - A Quora-like platform built with **Firebase**.
   - Users can ask questions, post images, share updates, and post links to help their community during floods.

4. **Donation System**  
   - Lists verified charities for flood relief.
   - Users can donate via **Razorpay** or generate a **UPI QR code** for direct contributions.

5. **Safety Guidelines**  
   - Provides crucial **pre-flood, during-flood, and post-flood** safety tips to protect life and property.

6. **Volunteer System**  
   - Allows users to register as volunteers with skills such as **First Aid, Driving, Search & Rescue, or Cooking**.
   - Volunteers can be located within a **5 km radius** using **OpenStreetMap**.
