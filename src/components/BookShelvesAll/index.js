import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import MenuItem from '../MenuItem'
import BookShelfItem from '../BookShelfItem'
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

const apiConstantsStatus = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class BookShelvesAll extends Component {
  state = {
    apiStatus: apiConstantsStatus.initial,
    bookShelfName: bookshelvesList[0].value,
    bookShelfLabel: bookshelvesList[0].label,
    searchText: '',
    booksList: [],
  }

  componentDidMount() {
    this.getBooksData()
  }

  /* api calling */
  getBooksData = async () => {
    const {bookShelfName, searchText} = this.state

    const jwtToken = Cookies.get('jwt_token')
    this.setState({apiStatus: apiConstantsStatus.inprogress})

    const url = `https://apis.ccbp.in/book-hub/books?shelf=${bookShelfName}&search=${searchText}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const fetchedData = await response.json()

      const updatedData = fetchedData.books.map(eachBook => ({
        id: eachBook.id,
        title: eachBook.title,
        readStatus: eachBook.read_status,
        rating: eachBook.rating,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
      }))
      this.setState({
        booksList: updatedData,
        apiStatus: apiConstantsStatus.success,
      })
    } else {
      this.setState({apiStatus: apiConstantsStatus.failure})
    }
  }

  /* Loading View */
  renderLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  /* Api Call Failure View */

  onClickTryAgainButton = () => {
    this.getBooksData()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dbyzrfi0m/image/upload/v1685016941/Group_7522_v58x3m.png"
        alt="failure view"
        className="failure-img"
      />
      <p className="failure-text">Something went wrong, Please try again.</p>
      <button
        type="button"
        className="failure-retry-button"
        onClick={this.onClickTryAgainButton}
      >
        Try Again
      </button>
    </div>
  )

  /* search input update */
  onChangeSearchInput = event => {
    this.setState({searchText: event.target.value})
  }

  /* on click search icon get related data */
  onClickSearchButton = () => {
    this.setState(this.getBooksData)
  }

  /* success view of books and no search result view */
  renderBooksListView = () => {
    const {booksList, searchText} = this.state
    const noMatches = booksList.length !== 0

    return noMatches ? (
      <>
        <ul className="books-items-container">
          {booksList.map(eachBook => (
            <BookShelfItem eachBookShelfDetails={eachBook} key={eachBook.id} />
          ))}
        </ul>
      </>
    ) : (
      <>
        <div className="no-results-match">
          <img
            src="https://res.cloudinary.com/dbyzrfi0m/image/upload/v1686303005/Asset_1_1_rpx862.png"
            alt="no books"
            className="no-result-img"
          />
          <p className="no-result-description">
            Your search for {searchText} did not find any matches.
          </p>
        </div>
      </>
    )
  }

  /* switch views as per api call */
  renderBookShelfContent = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstantsStatus.inprogress:
        return this.renderLoaderView()
      case apiConstantsStatus.success:
        return this.renderBooksListView()
      case apiConstantsStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  /* on click book menu update book shelf menu and get book data */
  updateMenuValue = id => {
    const bookShelfItem = bookshelvesList.filter(
      eachBookShelf => eachBookShelf.id === id,
    )

    this.setState(
      {
        bookShelfName: bookShelfItem[0].value,
        bookShelfLabel: bookShelfItem[0].label,
      },
      this.getBooksData,
    )
  }

  /* render header, bookshelf container and menu content container */
  render() {
    const {bookShelfName, bookShelfLabel, searchText} = this.state
    return (
      <>
        <div className="bookshelves-bg-container">
          <Header isShelfActive={`${true}`} />

          <div className="bookshelves-content-container">
            {/* Mobile search */}
            <div className="mobile-search-container">
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                value={searchText}
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                className="search-button"
                testid="searchButton"
                onClick={this.onClickSearchButton}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>

            {/*  bookshelves menus container  */}
            <div className="bookshelves-menus-container">
              <h1 className="bookshelves-menus-heading">Bookshelves</h1>
              <ul className="bookshelves-menus">
                {bookshelvesList.map(eachBookShelf => (
                  <MenuItem
                    eachBookShelfDetails={eachBookShelf}
                    key={eachBookShelf.id}
                    updateMenuValue={this.updateMenuValue}
                    isActiveMenu={eachBookShelf.value === bookShelfName}
                  />
                ))}
              </ul>
            </div>

            {/*  bookshelves content container  */}
            <div className="menus-footer-content-container">
              <div className="menus-content-container">
                {/*  bookshelves content header and search container  */}
                <div className="menu-content-headers-container">
                  <h1 className="menu-books-heading">{bookShelfLabel} Books</h1>
                  <div className="search-container">
                    <input
                      type="search"
                      placeholder="Search"
                      className="search-input"
                      value={searchText}
                      onChange={this.onChangeSearchInput}
                    />
                    <button
                      type="button"
                      className="search-button"
                      testid="searchButton"
                      onClick={this.onClickSearchButton}
                    >
                      <BsSearch className="search-icon" />
                    </button>
                  </div>
                </div>

                {/*  bookshelves results */}
                {this.renderBookShelfContent()}
              </div>

              {/*  footer container  */}
              <div className="footer-container">
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default BookShelvesAll
