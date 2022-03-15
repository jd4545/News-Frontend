import { useEffect, useState, useContext } from "react";
import { getUsers } from "../api";
import { UserContext } from "../contexts/user-context";

export default function Users() {

    // sets CONTEXT for logged in user
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
    
    // RENDER user list
    return (
        <div className="users">
          <h2 id="users--userheader"> Users </h2>
          <div className="users--header__banner">
          {/* Shows logged in user: */}
          <h3> { (loggedInUser.username) ?
            `Logged in user: ${loggedInUser.username}`
            : `Logged out`
        }
         </h3>
         {/* Logs out user */}
          <button className="user--login__btn" 
            onClick={() => setLoggedInUser([])}>Log out
            </button>
          </div>
          <h3 id="users--userheader"> List of users: </h3>
          {users.map((user) => {  
        return (
          <div className="user--card">
            <h3>{user.username} </h3>
            <div className="user--login__btnArea">
                {/* logs in user: */}
            <button className="user--login__btn" 
            onClick={() => handleClick(user)}>Log In
            </button>
            </div>
          </div>
        );
      })}
        </div>
      );
    
}