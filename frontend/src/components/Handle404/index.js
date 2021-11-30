import "./Handle404.css"
import { Link } from "react-router-dom"

export default function Handle404() {
    return (
        <div className="no-page-container">
            <h1>
                Sorry, this page isn't available.
            </h1>
            <h3>
            The link you followed may be broken, or the page may have been removed.
                {" "}
                <Link to="/posts">Go back to Spacestagram Feed</Link>
            </h3>
        </div>
    )
}