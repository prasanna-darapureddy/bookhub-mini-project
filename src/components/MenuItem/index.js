import './index.css'

const MenuItem = props => {
  const {eachBookShelfDetails, updateMenuValue, isActiveMenu} = props
  const {id, label, value} = eachBookShelfDetails

  const onClickMenu = () => {
    updateMenuValue(id)
  }

  const activeMenuClass = isActiveMenu
    ? 'shelf-menu-btn active-menu'
    : 'shelf-menu-btn'

  return (
    <>
      <li className="menu">
        <button
          type="button"
          className={activeMenuClass}
          onClick={onClickMenu}
          value={value}
        >
          {label}
        </button>
      </li>
    </>
  )
}
export default MenuItem
