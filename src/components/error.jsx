import {Link} from "react-router-dom";

export default function Error({status, msg}) {
    // status and msg from backend
    // if status sent from backend exists, set status, otherwise 404
    status = status ? status : "404";
    return (
        <div>
        <h2>
           {status}: {msg ? msg: "Whoops! Page not found..." } </h2>
        <Link to="/">Return Home</Link>
        </ div>
    )
}
