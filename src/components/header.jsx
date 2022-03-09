import { Link } from "react-router-dom";

export default function Header() {
    // RENDER header
    return (
        <header className="header">
            <h1 >
                NC News
            </h1>
            <Link className="header--users__Link" to="/users">
                      Users
                  </Link>
        </header>
    )
}