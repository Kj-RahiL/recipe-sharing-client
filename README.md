# 🍲 Recipe Sharing Community

**Recipe Sharing Community** is a full-stack web application for cooking enthusiasts. It allows users to share, discover, and organize recipes. Users can register, post their favorite recipes, explore those shared by others, and engage in a vibrant culinary community.

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup & Installation](#setup--installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Live Demo & Server URL](#live-demo--server-url)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Features
- **User Authentication**: Secure registration, login with JWT, and password recovery.
- **Profile Management**: Customizable profiles, options to follow/unfollow other users.
- **Recipe Management**: Submit, update, delete, and view recipes with rich text formatting and image upload.
- **Ingredient Checklist**: Interactive checklist to track gathered ingredients.
- **Timer Functionality**: Built-in cooking timer for tracking cooking times.
- **Ratings & Comments**: Users can rate, comment, and upvote/downvote recipes.
- **Recipe Feed**: Infinite scroll feed with advanced search and filter options.
- **Admin Dashboard**: Admin controls for managing users, recipes, and content moderation.
- **Premium Membership**: Subscription system unlocking exclusive content and features.

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js
- **State Management**: TanstackQuery and Nexios(axios)
- **Language**: TypeScript

### Backend
- **Server**: Node.js
- **Framework**: Express
- **Database**: MongoDB
- **ODM**: Mongoose

### Deployment
- **Frontend**: Vercel 
- **Backend**: Hosted on Vercel

## ⚙️ Setup & Installation

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** instance (local or cloud-based like MongoDB Atlas)

### Installation Steps

1. **Clone the repository**:
  # Frontend dependencies
   ```bash
   git clone https://github.com/Kj-RahiL/recipe-sharing-client.git
   cd recipe-sharing-client
   npm install
   npm run dev
   ```
  # Backend dependencies
  ```bash
   git clone https://github.com/Kj-RahiL/recipe-sharing-server.git
   cd recipe-sharing-server
   npm install
   npm run start:dev
   ```
2. **Environment Variables**:
    ```bash
    NODE_ENV=development
    PORT=your port
    DATABASE_URL=database url
    BCRYPT_SALT_ROUNDS = 5
    JWT_ACCESS_SECRET = your access secret
    JWT_ACCESS_EXPIRE_IN=time
    JWT_REFRESH_SECRET = your refresh secret
    JWT_REFRESH__EXPIRE_IN=time
    STORE_ID = aamarpaytest
    SIGNATURE_KEY = your sign key
    PAYMENT_URL = url
    PAYMENT_VERIFY_URL = verify url
    RESET_PASS_UI_LINK=frontend ui link
    ```
## 🚀 Usage

### Running the Application Locally
- Start the server and frontend as described in the setup instructions.
- Register a user and explore various features: submit recipes, follow users, rate and comment on recipes, and more.

### Admin Access
- To access admin features, create an admin account manually in the MongoDB database or seed one if your project includes a seeding script.

## 🔗 API Endpoints

Below are some key API endpoints available for this application. For a full list, refer to the API Documentation if Swagger or similar is set up.

| Endpoint                       | Method | Description                   |
|--------------------------------|--------|-------------------------------|
| `/api/auth/register`           | POST   | Register a new user           |
| `/api/auth/login`              | POST   | Login user                    |
| `/api/recipes`                 | GET    | Get list of recipes           |
| `/api/recipes/:id`             | GET    | Get a single recipe           |
| `/api/recipes`                 | POST   | Submit a new recipe           |
| `/api/recipes/:id/rating`      | POST   | Rate a recipe                 |
| `/api/comments/:recipeId`      | GET    | Get comments for a recipe     |
| `/api/comments/:recipeId`      | POST   | Post a comment                |
| `/api/users/:id/follow`        | POST   | Follow/unfollow a user        |

## 🌐 Live Demo & Server URL

- **Live URL**: [https://recipe-sharing-client-mu.vercel.app](https://recipe-sharing-client-mu.vercel.app)
- **Server URL**: [https://recipe-sharing-server-olive.vercel.app](https://recipe-sharing-server-olive.vercel.app)

> Replace these URLs with your actual deployed links.

## 🤝 Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/YourFeature

3. Commit your changes:
    ```bash
    git commit -m 'Add Your Feature'

4. Push to the branch:
    ```
    git push origin feature/YourFeature
    ```
5. Create a Pull Request.

## 📜 License

This project is licensed under the **MIT License**.

## 📬 Contact

For questions or support, please reach out through the [Contact Us](#) page on the website or email us at **rahiilarham@gmail.com**.

Happy Cooking! 🥘
