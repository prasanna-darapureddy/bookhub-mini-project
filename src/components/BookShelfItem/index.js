import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'

import './index.css'

const BookShelfItem = props => {
  const {eachBookShelfDetails} = props
  const {
    id,
    title,
    readStatus,
    rating,
    authorName,
    coverPic,
  } = eachBookShelfDetails

  return (
    <>
      <Link to={`/books/${id}`} className="linked-shelf-item">
        <li className="book-shelf-item">
          <img src={coverPic} alt={title} className="cover-img" />
          <div className="item-content">
            <h1 className="title">{title}</h1>
            <p className="author">{authorName}</p>
            <div className="rating-container">
              <p className="rating-line">
                Avg rating
                <BsFillStarFill className="star-icon" />
                {rating}
              </p>
            </div>
            <p className="status-text">
              Status: <span className="status">{readStatus}</span>
            </p>
          </div>
        </li>
      </Link>
    </>
  )
}
export default BookShelfItem
