import {Link} from 'react-router-dom'

import './index.css'

const ReactSlick = props => {
  const {bookDetails} = props
  const {coverPic, title, authorName, id} = bookDetails
  return (
    <Link to={`/books/${id}`} className="react-slick-link">
      <li className="list-item" key={id}>
        <img src={coverPic} alt={title} className="slick-image" />
        <h1 className="title">{title}</h1>
        <p className="author-name">{authorName}</p>
      </li>
    </Link>
  )
}

export default ReactSlick
