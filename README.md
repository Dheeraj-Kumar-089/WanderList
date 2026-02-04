# WanderList

**WanderList** is a full-stack web application of travelling app Airbnb. It features a robust backend handling authentication and data management, paired with a modern, responsive frontend.

## 🚀 Tech Stack

### Backend
*   **Runtime Environment**: Node.js
*   **Framework**: Express.js
*   **Database**: MongoDB (Atlas) with Mongoose ODM
*   **Authentication**: Passport.js (Local Strategy)
*   **Image Storage**: Cloudinary with Multer
*   **Validation**: Joi (Server-side validation)
*   **Session Management**: Express Session & Connect Mongo

### Frontend
*   **Framework**: React (Vite)
*   **Styling**: Tailwind CSS
*   **HTTP Client**: Axios
*   **Routing**: React Router DOM
*   **Notifications**: React Hot Toast
*   **State Management**: React Context API
*   **NotFound Page**: Custom 404 Not Found Page
*   **Protected Routes**: Client-side route protection redirects unauthenticated users.
*   **Admin Dashboard**: Dedicated dashboard accessible for administrative tasks.
*   **Like System**: Interactive "Like" functionality for users to save their favorite destinations.
*   **Search & Filtering**: Integrated functionality to filter listings by states.



## ✨ Features

### Backend Highlights
The backend is built with a scalable **MVC (Model-View-Controller)** architecture, ensuring clean code separation and maintainability.

*   **Authentication & Authorization**:
    *   Secure user signup and login functionality using **Passport.js**.
    *   **Protected Routes**: Middleware (`isLoggedIn`) ensures only authenticated users can create or modify content.
    *   **Role-Based Access**: Authorization middleware (`isOwner`, `isReviewAuthor`) restricts edit/delete actions to the original creators.
*   **Comprehensive CRUD Operations**:
    *   **Listings**: Create, Read, Update, and Delete travel listings with images and details.
    *   **Reviews**: Users can add and delete reviews for listings.
*   **Advanced Image Handling**:
    *   Seamless image uploads using **Multer**.
    *   Cloud storage integration with **Cloudinary** for optimized asset delivery.
*   **Data Integrity & Security**:
    *   **Schema Validation**: Robust server-side data validation using **Joi** to prevent invalid data entry.
    *   **Session Security**: Secure session management using **MongoDB Store** (connect-mongo) with cookie-based persistence.
*   **Global Error Handling**: Centralized error handling mechanism to gracefully manage runtime errors and provide meaningful feedback.

### Frontend Highlights
*   **Enhanced Responsiveness**: 
    *   **Fully Adaptive Layouts**: Meticulously crafted to look perfect on all devices, from small mobile screens to large desktop monitors.
    *   **Fluid Typography & Spacing**: utilizing Tailwind CSS for scaling and readability across viewports.
    *   Real-time feedback with **React Hot Toast** notifications for success and error states.
*   **Navigation & Routing**:
    *   **Protected Routes**: Client-side route protection redirects unauthenticated users.

## 🛠️ Installation & Setup

Follow these steps to run the project locally.

### Prerequisites
*   Node.js installed
*   MongoDB Atlas Account
*   Cloudinary Account

### 1. Clone the Repository
```bash
git clone <repository-url>
cd unique-destinations
```

### 2. Backend Setup
Navigate to the backend directory (or root if served from there) and install dependencies.

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following variables:

```env
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

Start the backend server:

```bash
node app.js
# The server will typically run on http://localhost:8080
```

> **Note**: The backend `allowedOrigin` is currently configured for the production URL. For local development, please manually update the `allowedOrigin` variable in `backend/app.js` to match your local frontend URL (e.g., `http://localhost:5173`).

### 3. Frontend Setup
Open a new terminal and navigate to the frontend directory.

```bash
cd frontend
npm install
```

Start the development server:

```bash
npm run dev
```

Visit the application in your browser (usually at `http://localhost:5173`).

---

*Developed with ❤️ by [Your Name]*
