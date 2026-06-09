# FreeAPI React Authentication App

A modern, and fully featured authentication application built with **React**, **Vite**, and **Vanilla CSS**. This app integrates with the **FreeAPI Authentication Module** to demonstrate modern frontend auth flows, token-based session persistence, loading indicators, custom toast alerts, and a responsive glassmorphic dashboard.

🔗 **GitHub Repository:** [PushkarAdhikari/freeapi-auth](https://github.com/PushkarAdhikari/freeapi-auth)

---

## ✨ Key Features

*   🔒 **Secure JWT Auth Flow**: Registers and logs in users, storing JWT tokens (`accessToken` & `refreshToken`) securely in `localStorage` for cross-request authorization.
*   🔄 **Auto Session Restoration**: Checks for active tokens on page load and queries the profile API to instantly restore user sessions without manual log in.
*   🍞 **Interactive Toast Alerts**: A custom, floating toast notification system in the top-right corner providing smooth micro-animations for success and error messages.
*   💼 **User Dashboard**: Displays profile details (Username, Email, account role) with status indicators and an inline **Raw JSON Viewer** with a click-to-copy utility.
*   ⏳ **Loading States**: Integrated button spinners and session loader overlays blocking double-submission and enhancing UX during API delays.
*   🎨 **Glassmorphism Design**: Taylored deep-space gradient background, high-blur glass surfaces, glowing border effects, custom Plus Jakarta Sans typography, and native Dark/Light mode theme adaptation.

---

## 🛠️ Tech Stack & Structure

### Frontend Stack
*   **React 19** - Single-page application logic and state.
*   **Vite 8** - Lightning-fast bundling and Hot Module Replacement (HMR).
*   **Vanilla CSS** - Premium custom layout, variables, grids, and keyframe transitions.

### Project Directory
```
freeapi-auth/
├── src/
│   ├── components/            # Reusable UI Components
│   │   ├── Header.jsx         # App navbar, active badge & logout action
│   │   ├── Footer.jsx         # Branding credit footer
│   │   ├── LoginForm.jsx      # Login page credentials form
│   │   └── RegisterForm.jsx   # Register page inputs & role selection
│   ├── util/                  # Utility Services & Assets
│   │   ├── api.js             # FreeAPI services wrapper & token storage
│   │   └── icons.jsx          # Modular clean SVG react icons
│   ├── App.jsx                # Main controller & view router
│   ├── App.css                # Card, form, spinner & toast stylesheet
│   ├── index.css              # Custom HSL variables & global scrollbars
│   └── main.jsx               # Entrypoint mounting App
├── index.html                 # Main template index file
└── package.json               # Package dependencies & scripts
```

---

## 📡 API Endpoints Used

The project connects to the interactive user module on `https://api.freeapi.app`:

1.  **Register User**: `POST /api/v1/users/register` - Formulates user profile schema (Email, Password, Username, Role: `USER` or `ADMIN`).
2.  **Login User**: `POST /api/v1/users/login` - Authenticates user credentials, receives session payloads and populates access tokens.
3.  **Get Current User**: `GET /api/v1/users/current-user` - Returns metadata of the currently active session (requires Bearer token header).
4.  **Logout User**: `POST /api/v1/users/logout` - Invalidate credentials on backend, then clear cache locally.

---

## 🚀 Getting Started

Follow these instructions to run the project locally.

### Prerequisites
Make sure you have Node.js (version 18 or above) installed on your system.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/PushkarAdhikari/freeapi-auth.git
   cd freeapi-auth
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```

### Running the App
Start the Vite local development server:
```bash
npm run dev
```
Open your browser and navigate to the local address (typically `http://localhost:5173`) to view and interact with the application.
