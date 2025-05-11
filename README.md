# 🧳 Traveletix — Travel & Booking Web Application

## 📌 Overview
Traveletix is a full-stack travel web application that allows users to **book hotels, rooms, and explore travel destinations**. The application is built using **Node.js and Express.js** on the backend and follows the **MVC (Model-View-Controller)** design pattern for clean and maintainable code.

## 🛠️ Tech Stack

- **Backend:** Express.js (Node.js)
- **Frontend:** HTML5, CSS3, JavaScript
- **Database:** MongoDB Atlas (Cloud NoSQL DB)
- **Authentication & Authorization:** Fully implemented login/signup and secure access
- **Templating Engine:** EJS
- **Cloud Image Storage:** Cloudinary (if used)

## ✨ Features

- User registration and secure login with password hashing
- Explore and book hotels, rooms, and tourist destinations
- Complete authentication and authorization flow
- MVC architecture for better scalability and code separation
- RESTful routing for listing management and user interactions
- Responsive design for mobile and desktop compatibility

## 📁 Project Structure
/Traveletix
├── models/ # MongoDB models
├── routes/ # Express routes
├── views/ # EJS templates
├── public/ # Static assets (CSS, JS)
├── controllers/ # Business logic
├── .env # Environment variables
├── index.js # Entry point (server setup)
└── package.json # NPM dependencies and scripts


## 🚀 How to Run Locally

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/traveletix.git
2. Navigate into the project.
3. Install dependencies: npm install
4. Set up your .env file with the following:
PORT=8080
ATLAS_URL=your-mongodb-atlas-connection-string
CLOUD_NAME=your-cloudinary-name
CLOUD_API_KEY=your-cloudinary-api-key
CLOUD_API_SECRET=your-cloudinary-api-secret
SECRET=your-session-secret
5.Visit:
http://localhost:8080

🌐 Deployment
Hosted on Render
Environment variables securely managed via Render Dashboard

🙌 Contributions
Pull requests and issues are welcome!
