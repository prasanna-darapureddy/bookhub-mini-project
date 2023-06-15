import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'
import BookShelfDetailItem from '../BookShelfDetailItem'

import './index.css'

const apiConstantStatus = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class BookShelfDetails extends Component {
  state = {
    bookShelfDetailedList: {},
    apiStatus: apiConstantStatus.initial,
  }

  componentDidMount() {
    this.getBookShelfDetailsData()
  }

  getBookShelfDetailsData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatus: apiConstantStatus.inprogress})

    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = {
        id: fetchedData.book_details.id,
        authorName: fetchedData.book_details.author_name,
        coverPic: fetchedData.book_details.cover_pic,
        aboutBook: fetchedData.book_details.about_book,
        rating: fetchedData.book_details.rating,
        readStatus: fetchedData.book_details.read_status,
        title: fetchedData.book_details.title,
        aboutAuthor: fetchedData.book_details.about_author,
      }
      this.setState({
        bookShelfDetailedList: updatedData,
        apiStatus: apiConstantStatus.success,
      })
    } else {
      this.setState({apiStatus: apiConstantStatus.failure})
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
    this.getBookShelfDetailsData()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dbyzrfi0m/image/upload/v1685016941/Group_7522_v58x3m.png"
        alt="failure view"
        className="home-failure-img"
      />
      <p className="home-failure-text">
        Something went wrong, Please try again.
      </p>
      <button
        type="button"
        className="failure-retry-button"
        onClick={this.onClickTryAgainButton}
      >
        Try Again
      </button>
    </div>
  )

  renderBookDetailsView = () => {
    const {bookShelfDetailedList} = this.state

    return (
      <>
        <div className="bookshelf-detailed-content-container">
          <BookShelfDetailItem bookShelfDetailedList={bookShelfDetailedList} />
        </div>
      </>
    )
  }

  renderBookShelfDetailedResultView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstantStatus.inprogress:
        return this.renderLoaderView()
      case apiConstantStatus.success:
        return this.renderBookDetailsView()
      case apiConstantStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bookshelf-detailed-bg-container">
        <Header />

        {this.renderBookShelfDetailedResultView()}

        <Footer />
      </div>
    )
  }
}
export default BookShelfDetails
