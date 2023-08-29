import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";

const Root = () => {
  const [posts, setPosts] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState('')
  const [token, setToken] = useState('')
  
  return (
    <>
    <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setToken={setToken} setUser={setUser}/>
    <Outlet context={{posts, setPosts, isLoggedIn, setIsLoggedIn, user, setUser, token, setToken}}/>
    </>
  );
};

export default Root;