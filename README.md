# E-Commerce Site with React, Vite, Firebase, and React Router

This project is a minimal setup for an e-commerce website built with React, managed by Vite, and uses Firebase for backend services including database and authentication, along with React Router for routing.

**Technologies**

- [React](https://react.dev/learn/start-a-new-react-project): A JavaScript library for building user interfaces.
- [Vite](https://vitejs.dev/guide/): A build tool that aims to provide a faster and leaner development experience for modern web projects.
- [Firebase](https://firebase.google.com/): A platform developed by Google for creating mobile and web applications. It provides functionalities like analytics, databases, messaging, and crash reporting so you can move quickly and focus on your users.
- [React Router](https://reactrouter.com/en/main): Declarative routing for React apps.


## Getting Started:

**Clone the repository:**

```
git clone https://github.com/your-username/your-repo-name.git

cd your-repo-name
```

**Install dependencies:**

```
npm install
```

**Run the development server:**

```
npm run dev
```

## Configuration

Ensure that your Firebase configuration is properly set up by editing the **firebaseConfig.js** file in the **src** folder with your project credentials:

```
const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "PROJECT_ID.firebaseapp.com",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};
```



Thank you for exploring our e-commerce site powered by React, Vite, Firebase, and React Router. We hope this project serves as a robust starting point for your e-commerce endeavors and inspires innovation and creativity in your development journey.