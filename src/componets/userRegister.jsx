import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";


const URL = "https://strangers-things.herokuapp.com/api/2303-ftb-mt-web-pt";

const Register = () => {
  const { setIsLoggedIn, setUser } = useOutletContext();
  const { setToken } = useOutletContext();
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();


  const registerUser = async () => {
    try {
      const response = await fetch(
        `${URL}/users/register`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user: {
              username: newUsername,
              password: newPassword
            }
          })
        }
      );
      const result = await response.json()
      if (result.data) {
      setIsLoggedIn(true)
      setToken(result.data.token)
      setUser(newUsername);
      navigate("/home");
      } 
    } catch (error) {
      console.error(error)
      alert('Registration unsuccessful, please try again')
    } finally {
      setNewUsername('');
      setNewPassword('');
      setConfirmPassword('');
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitted with ", newUsername, newPassword, confirmPassword);
    if (newPassword === confirmPassword) {
      registerUser()
  } else {
    alert('Passwords must match in order to register')
  }};

  return (
    <div className="text-center flex-col">
      <h2 className="m-10 text-2xl">Sign Up:</h2>
      <form onSubmit={handleSubmit} className="flex-col">
        <div>
          <label htmlFor="username">Username:</label>
          <input
            className="text-black ml-2"
            name="username"
            type="text"
            placeholder="Choose a username"
            value={newUsername}
            onChange={(event) => setNewUsername(event.target.value)}
            minLength="4"
            maxLength="15"
            required
          />
        </div>
        <div className="m-4">
          <label htmlFor="password">Password:</label>
          <input
            className="text-black ml-2"
            name="password"
            type="password"
            placeholder="Choose a password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            minLength="4"
            maxLength="15"
            required
          />
        </div>
        <div>
          <label htmlFor="passwordConfirm">Confirm Password:</label>
          <input
            className="text-black ml-2"
            name="confirmPassword"
            type="password"
            placeholder="Retype password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            minLength="4"
            maxLength="15"
            required
          />
        </div>
        <button type="submit" className="m-4 border-black border-2">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Register;