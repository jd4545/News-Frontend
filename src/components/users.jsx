import { useEffect, useState, useContext } from "react";
import { getUsers } from "../api";
import { UserContext } from "../contexts/user-context";

export default function Users() {


    const { loggedInUser, setLoggedInUser } = useContext(UserContext);

    function handleClick(user) {
        setLoggedInUser(user);
    }

    // Setting initial users STATE:
    const [users, setUsers] = useState([]);
    useEffect(() => {
      getUsers().then((users) => {
        setUsers(users);
      });
    }, []);

    console.log("logged in:", loggedInUser)
    
    return (
        <div className="user--list">
          <div className="header--banner">
          <h2> List of users: </h2>
          </div>
          {users.map((user) => {
        return (
          <div className="user-card">
            <h3>{user.username} </h3>

            <button className="login-btn" onClick={() => handleClick(user)}>Log In</button>

          </div>
        );
      })}
        </div>
      );
    
}