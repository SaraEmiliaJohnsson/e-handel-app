import { Link } from "react-router-dom";
import './NotFoundPage.css';


const NotFoundPage = () => {


	return (
		<div className="notfound-container">
			<h1 className="error-title">404</h1>
			<p className="error-paragraph">Sidan hittades inte</p>
			<Link to="/" className="home-link">Gå till startsidan</Link>
		</div>
	);
};

export default NotFoundPage;