import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <>
    <div className="page-not-found-container">
      <img
        src="https://res.cloudinary.com/dbyzrfi0m/image/upload/v1686570946/Group_7484_u3tmbu.png"
        className="not-found-img"
        alt="not found"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-description">
        we are sorry, the page you requested could not be found, Please go back
        to the homepage.
      </p>
      <Link to="/" className="linked-button">
        <button className="go-back-to-home-button" type="button">
          Go Back to Home
        </button>
      </Link>
    </div>
  </>
)
export default NotFound
