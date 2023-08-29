import { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

const URL = "https://strangers-things.herokuapp.com/api/2303-ftb-mt-web-pt";

const Login = () => {
    const { setIsLoggedIn, setUser } = useOutletContext();
    const { setToken } = useOutletContext();
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const navigate = useNavigate();

    const logIn = async () => {
      try {
        const response = await fetch(`${URL}/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: {
              username: username,
              password: password,
            },
          }),
        });
        const result = await response.json();
        console.log(result);
        if (result.data) {
        setIsLoggedIn(true);
        setToken(result.data.token);
        setUser(username);
        navigate("/home");
        } else {
            alert("Invalid username or password: please try again");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setUsername("");
        setPassword("");  
      }
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      logIn();
    };

     return (
       <div className="text-center flex-col">
         <h2 className="m-10 text-2xl">Please sign in to continue</h2>
         <form className="flex-col" onSubmit={handleSubmit}>
           <div>
             <label htmlFor="username">Username:</label>
             <input
               name="username"
               type="text"
               className="text-black ml-2"
               value={username}
               onChange={(event) => setUsername(event.target.value)}
               minLength="4"
               maxLength="15"
               required
             />
           </div>
           <div className="m-4">
             <label htmlFor="password">Password:</label>
             <input
               name="password"
               type="password"
               className="text-black ml-2"
               value={password}
               onChange={(event) => setPassword(event.target.value)}
               minLength="4"
               maxLength="15"
               required
             />
           </div>
           <button type="submit" className="m-4 border-black border-2">
             Login
           </button>
         </form>
         <p>
           New to StrangeStuff?{" "}
           <Link to="/register" className="underline">
             Register here!
           </Link>
         </p>
       </div>
     );
};
    
export default Login