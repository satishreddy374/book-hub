import {Link} from 'react-router-dom'

import {BsFillStarFill} from 'react-icons/bs'

import './index.css'

const BookItem = props => {
  const {bookDetails} = props
  const {coverPic, title, rating, readStatus, authorName, id} = bookDetails
  return (
    <Link to={`/books/${id}`} className="book-item-link">
      <li className="book-list-item">
        <img src={coverPic} alt={title} className="image" />
        <div className="book-item-details-container">
          <h1 className="book-item-title">{title}</h1>
          <p className="book-item-author">{authorName}</p>
          <div className="rating-text-and-rating-container">
            <p className="book-rating">Avg Rating</p>
            <div className="rating-container">
              <BsFillStarFill size={15} color="#FBBF24" />
              <p className="rating">{rating}</p>
            </div>
          </div>

          <p className="book-status">
            Status : <span className="book-status-text">{readStatus}</span>
          </p>
        </div>
      </li>
    </Link>
  )
}

export default BookItem
