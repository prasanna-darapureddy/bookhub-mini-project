import {Link} from 'react-router-dom'

import './index.css'

const TopRatedBookItem = props => {
  const {eachBookDetails} = props
  const {id, title, authorName, coverPic} = eachBookDetails

  return (
    <Link to={`/books/${id}`} className="linked-carousel-item">
      <li className="carousel-item">
        <img src={coverPic} alt={title} className="top-rated-cover-image" />
        <h1 className="top-rated-book-title">{title}</h1>
        <p className="top-rated-book-author-name">{authorName}</p>
      </li>
    </Link>
  )
}

export default TopRatedBookItem
