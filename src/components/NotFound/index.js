import './index.css'

const NotFound = props => {
  const {history} = props

  const onClickGoBackToHomeButton = () => {
    history.push('/')
  }

  return (
    <div className="page-not-found-container">
      <img
        src="https://i.ibb.co/8jc2v8h/not-found-image.png"
        alt="not found"
        className="page-not-found-image"
      />
      <h1 className="page-not-found-heading">Page Not Found</h1>
      <p className="page-not-found-text">
        we are sorry, the page you requested could not be found,
        <br />
        Please go back to the homepage
      </p>
      <button
        type="button"
        className="page-not-found-button"
        onClick={onClickGoBackToHomeButton}
      >
        Go Back to Home
      </button>
    </div>
  )
}

export default NotFound
