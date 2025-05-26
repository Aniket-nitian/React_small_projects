import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
//import UserContextProvider from "./context/UserContextprovider";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { UserContextProvider } from "./context/UserContextprovider";

function App() {
  return (
    <>
      <UserContextProvider>
        <h1>Hello Context API</h1>
        <Login />
        <Profile />
      </UserContextProvider>
    </>
  );
}

export default App;
