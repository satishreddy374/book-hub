import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {Link} from 'react-router-dom'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Header from '../Header'
import ReactSlick from '../ReactSlick'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
}

const settings = {
  dots: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class Home extends Component {
  state = {topRatedBooksList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getTopRatedBooksList()
  }

  getTopRatedBooksList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
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
      const updatedList = data.books.map(eachBook => ({
        id: eachBook.id,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        title: eachBook.title,
      }))
      this.setState({
        topRatedBooksList: updatedList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  /* Success View Container  */

  renderSuccessViewContainer = () => {
    const {topRatedBooksList} = this.state

    return (
      <ul className="top-rated-books-list-container">
        <Slider {...settings}>
          {topRatedBooksList.map(book => (
            <ReactSlick bookDetails={book} key={book.id} />
          ))}
        </Slider>
      </ul>
    )
  }

  onClickTryAgainButton = () => {
    this.getTopRatedBooksList()
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
    const {apiStatus} = this.state
    return (
      <div className="home-page-container">
        <Header home />
        <div className="home-page-details-container">
          <h1 className="home-page-heading">Find Your Next Favorite Books?</h1>
          <p className="home-page-text">
            You are in the right place.Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations
          </p>
          <Link to="/shelf">
            <button className="find-books-button-mobile-view" type="button">
              Find Books
            </button>
          </Link>
          <div className="top-rated-books-container">
            <div className="find-books-container">
              <h1 className="top-rated-books-text">Top Rated Books</h1>
              <Link to="/shelf">
                <button
                  className="find-books-button-desktop-view"
                  type="button"
                >
                  Find Books
                </button>
              </Link>
            </div>
            {this.renderAllPossibleViews()}
          </div>

          {apiStatus === 'SUCCESS' && (
            <div className="social-media-networks-container">
              <Footer />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Home
