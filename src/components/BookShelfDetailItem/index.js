import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const BookShelfDetailItem = props => {
  const {bookShelfDetailedList} = props
  const {
    title,
    readStatus,
    rating,
    authorName,
    coverPic,
    aboutAuthor,
    aboutBook,
  } = bookShelfDetailedList

  return (
    <div className="detailed-content-container">
      <div className="bookItem-container">
        <img src={coverPic} alt={title} className="detailed-cover-img" />
        <div className="detailed-item-content">
          <h1 className="detailed-title">{title}</h1>
          <p className="detailed-author">{authorName}</p>
          <div className="detailed-rating-container">
            <p className="detailed-rating-line">
              Avg rating
              <BsFillStarFill className="detailed-star-icon" />
              {rating}
            </p>
          </div>
          <p className="detailed-status-text">
            Status: <span className="detailed-status">{readStatus}</span>
          </p>
        </div>
      </div>

      <hr className="line" />

      <div className="about-author-container">
        <h1 className="about-author">About Author</h1>
        <p className="author-description">{aboutAuthor}</p>
      </div>

      <div className="about-author-container">
        <h1 className="about-book">About Book</h1>
        <p className="book-description">{aboutBook}</p>
      </div>
    </div>
  )
}
export default BookShelfDetailItem
