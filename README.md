# 🥗 What's in Your Fridge?

A React Native (Expo) mobile application that helps users discover recipes based on ingredients they already have at home.

The app allows users to enter available ingredients, validates them through TheMealDB ingredient list, and displays recipe suggestions with images, ingredient details, and step-by-step cooking instructions.

## 🚀 Project Overview

What's in Your Fridge? is a mobile recipe discovery app designed around a simple idea: users should be able to cook with what they already have.

The app combines a clean mobile interface, ingredient-based search, Firebase Authentication, and TheMealDB API to provide personalized recipe results.

## ⚙️ Tech Stack

* React Native
* Expo
* JavaScript
* Firebase Authentication
* TheMealDB API
* React Navigation

## 💡 Features

* User authentication with Firebase
* Ingredient input and validation
* Recipe search based on available ingredients
* Recipe result list with images
* Detailed recipe pages with ingredients and instructions
* Profile/password update flow
* Account deletion flow
* Clean and minimal mobile UI

## 🧩 System Flow

1. The user signs in or creates an account through Firebase Authentication.
2. The user enters ingredients they currently have.
3. The app validates ingredients using TheMealDB ingredient list.
4. The app fetches matching recipes from TheMealDB API.
5. The user can open each recipe to view ingredients and step-by-step instructions.

## 📁 Project Structure

```text
whatIsInMyFridge/
├── assets/
├── components/
│   ├── HomePage.js
│   ├── IngredientInput.js
│   ├── IngredientList.js
│   └── RecipeList.js
├── screens/
│   ├── AuthScreen.js
│   ├── ProfileUpdate.js
│   ├── RecipeDetailScreen.js
│   └── RecipeListScreen.js
├── App.js
├── app.json
├── package.json
└── README.md
```

## 🔐 Firebase Setup

This repository does not include production Firebase credentials.

Create a `firebase.js` file in the project root using the example below:

```javascript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

## 🛠️ Getting Started

```bash
git clone https://github.com/Busrwa/whatIsInMyFridge.git
cd whatIsInMyFridge
npm install
npx expo start
```

## 📌 Project Type

React Native / Mobile App / Recipe Discovery App

## 📄 License

This project is for academic and portfolio purposes.
