import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import BookShelvesPathItem from '../BookShelvesPathItem'
import BookItem from '../BookItem'
import Footer from '../Footer'

import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
}

class BookShelves extends Component {
  state = {
    activeShelfPath: bookshelvesList[0].value,
    searchInput: '',
    booksList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getBooksList()
  }

  getBooksList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {activeShelfPath, searchInput} = this.state
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${activeShelfPath}&search=${searchInput}`
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
        title: eachBook.title,
        readStatus: eachBook.read_status,
        rating: eachBook.rating,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
      }))
      this.setState({
        booksList: updatedList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  /* Success View Container */

  renderSuccessViewContainer = () => {
    const {booksList, searchInput} = this.state
    const isListEmpty = booksList.length === 0

    return isListEmpty ? (
      <div className="empty-view-container">
        <img
          src="https://i.ibb.co/dWGMn1J/empty-view-image.png"
          alt="no books"
          className="not-found-image"
        />
        <p className="empty-view-text">
          Your search for {searchInput} did not find any matches.
        </p>
      </div>
    ) : (
      <ul className="books-list-container">
        {booksList.map(eachBook => (
          <BookItem bookDetails={eachBook} key={eachBook.id} />
        ))}
      </ul>
    )
  }

  onClickTryAgainButton = () => {
    this.getBooksList()
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

  onChangeActiveShelfPath = value => {
    this.setState({activeShelfPath: value}, this.getBooksList)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value}, this.getBooksList)
  }

  onClickSearchButton = () => {
    this.getBooksList()
  }

  onEnterKeyDown = () => {
    this.getBooksList()
  }

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
    const {activeShelfPath, searchInput, booksList, apiStatus} = this.state

    const PathText = bookshelvesList.find(
      eachShelf => eachShelf.value === activeShelfPath,
    )

    return (
      <div className="bookshelves-page-container">
        <Header bookshelves />
        <div className="bookshelves-page-details-container">
          <div className="search-container-mobile-view">
            <input
              type="search"
              placeholder="Search"
              className="input-element"
              value={searchInput}
              onChange={this.onChangeSearchInput}
              onKeyDown={this.onEnterKeyDown}
            />
            <button
              type="button"
              testid="searchButton"
              className="search-button"
              onClick={this.onClickSearchButton}
            >
              <BsSearch size={16} color="gray" />
            </button>
          </div>

          <div className="bookshelves-heading-and-path-list-container-mobile-view">
            <h1 className="bookshelves-heading-mobile-view">Bookshelves</h1>
            <ul className="bookshelves-path-list-container-mobile-view">
              {bookshelvesList.map(eachPath => (
                <BookShelvesPathItem
                  pathDetails={eachPath}
                  key={eachPath.id}
                  onChangeActiveShelfPath={this.onChangeActiveShelfPath}
                  isActive={activeShelfPath === eachPath.value}
                />
              ))}
            </ul>
          </div>

          <ul className="bookshelves-path-list-container-desktop-view">
            <h1 className="bookshelves-heading-desktop-view">Bookshelves</h1>
            {bookshelvesList.map(eachPath => (
              <BookShelvesPathItem
                pathDetails={eachPath}
                key={eachPath.id}
                onChangeActiveShelfPath={this.onChangeActiveShelfPath}
                isActive={activeShelfPath === eachPath.value}
              />
            ))}
          </ul>

          <div className="books-list-and-search-container">
            {apiStatus === 'SUCCESS' && (
              <h1 className="bookshelf-text-mobile-view">
                {PathText.label} Books
              </h1>
            )}

            <div className="bookshelf-path-text-and-search-container">
              <h1 className="bookshelf-text">{PathText.label} Books</h1>

              <div className="search-container">
                <input
                  type="search"
                  placeholder="Search"
                  className="input-element"
                  value={searchInput}
                  onChange={this.onChangeSearchInput}
                  onKeyDown={this.onEnterKeyDown}
                />
                <button
                  type="button"
                  testid="searchButton"
                  className="search-button"
                  onClick={this.onClickSearchButton}
                >
                  <BsSearch size={16} color="gray" />
                </button>
              </div>
            </div>

            {this.renderAllPossibleViews()}

            {booksList.length > 0 && (
              <div className="social-media-networks-container">
                <Footer />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default BookShelves
