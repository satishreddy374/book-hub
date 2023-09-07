import './index.css'

const BookShelvesPathItem = props => {
  const {pathDetails, onChangeActiveShelfPath, isActive} = props
  const {label, value} = pathDetails

  const onClickShelfButton = () => {
    onChangeActiveShelfPath(value)
  }

  const activeShelf = isActive ? 'active-shelf' : 'normal-shelf'

  return (
    <li className="path-item">
      <button
        type="button"
        className={`path-text ${activeShelf}`}
        onClick={onClickShelfButton}
      >
        {label}
      </button>
    </li>
  )
}

export default BookShelvesPathItem
