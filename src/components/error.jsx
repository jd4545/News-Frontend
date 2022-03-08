import {Link} from "react-router-dom";

export default function Error() {
    return (
        <div>
        <h2>Whoops! Page not found...</h2>
        <Link to="/">Return Home</Link>
        </ div>
    )
}
