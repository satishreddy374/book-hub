import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {BsFillStarFill} from 'react-icons/bs'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
}

class BookItemDetails extends Component {
  state = {bookData: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getBookDetails()
  }

  getBookDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = {
        id: data.book_details.id,
        aboutAuthor: data.book_details.about_author,
        authorName: data.book_details.author_name,
        coverPic: data.book_details.cover_pic,
        aboutBook: data.book_details.about_book,
        rating: data.book_details.rating,
        readStatus: data.book_details.read_status,
        title: data.book_details.title,
      }
      this.setState({
        bookData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessViewContainer = () => {
    const {bookData, apiStatus} = this.state
    const {
      title,
      coverPic,
      authorName,
      rating,
      readStatus,
      aboutAuthor,
      aboutBook,
    } = bookData
    return (
      <div className="book-item-details-page-container">
        <div className="book-card-container">
          <div className="book-image-and-book-details-container">
            <img src={coverPic} alt={title} className="cover-pic" />
            <div className="book-details-container">
              <h1 className="book-title">{title}</h1>
              <p className="book-author">{authorName}</p>
              <div className="avg-rating-text-and-rating-container">
                <p className="avg-rating-text">Avg Rating</p>
                <div className="rating-container">
                  <BsFillStarFill size={15} color="#FBBF24" />
                  <p className="rating">{rating}</p>
                </div>
              </div>
              <p className="status-text">
                Status: <span className="read-status-text">{readStatus}</span>
              </p>
            </div>
          </div>

          <hr className="line" />

          <div className="about-author-container">
            <h1 className="about-author-heading">About Author</h1>
            <p className="about-author-text">{aboutAuthor}</p>
          </div>
          <div className="about-book-container">
            <h1 className="about-book-heading">About Book</h1>
            <p className="about-book-text">{aboutBook}</p>
          </div>
        </div>
        {apiStatus === 'SUCCESS' && (
          <div className="social-media-networks-container">
            <Footer />
          </div>
        )}
      </div>
    )
  }

  onClickTryAgainButton = () => {
    this.getBookDetails()
  }

  /* Failure View Container */

  renderFailureViewContainer = () => (
    <div className="failure-view-container">
      <img
        src="https://i.ibb.co/wsbmjM5/failure-image.png"
        alt="failure view"
        className="failure-image"
      />
      <p className="failure-heading">Something went wrong, Please try again</p>
      <button
        type="button"
        className="try-again-button"
        onClick={this.onClickTryAgainButton}
      >
        Try Again
      </button>
    </div>
  )

  /* Loader View Container */

  renderLoaderViewContainer = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderAllPossibleViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessViewContainer()
      case apiStatusConstants.failure:
        return this.renderFailureViewContainer()
      case apiStatusConstants.inProgress:
        return this.renderLoaderViewContainer()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="book-items-details-page">
        <Header />
        {this.renderAllPossibleViews()}
      </div>
    )
  }
}

export default BookItemDetails
