import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

import Header from '../Header'
import TopRatedBookItem from '../TopRatedBookItem'
import Footer from '../Footer'

const apiConstantsStatus = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {ratedBooksList: [], apiStatus: apiConstantsStatus.initial}

  componentDidMount() {
    this.getRatedBooksData()
  }

  getRatedBooksData = async () => {
    this.setState({apiStatus: apiConstantsStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
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
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
      }))

      this.setState({
        ratedBooksList: updatedData,
        apiStatus: apiConstantsStatus.success,
      })
    } else {
      this.setState({apiStatus: apiConstantsStatus.failure})
    }
  }

  renderLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  onClickTryAgainButton = () => {
    this.getRatedBooksData()
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

  renderRatedBooksCarouselView = () => {
    const {ratedBooksList} = this.state

    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    }

    return (
      <>
        <ul className="carousel-container">
          <Slider {...settings}>
            {ratedBooksList.map(eachBook => (
              <TopRatedBookItem eachBookDetails={eachBook} key={eachBook.id} />
            ))}
          </Slider>
        </ul>
      </>
    )
  }

  renderHomePageView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstantsStatus.success:
        return this.renderRatedBooksCarouselView()
      case apiConstantsStatus.inProgress:
        return this.renderLoaderView()
      case apiConstantsStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  onClickFindBook = () => {
    const {history} = this.props
    history.push('/shelf')
  }

  render() {
    return (
      <>
        <div className="home-bg-container">
          <Header isHomeActive={`${true}`} />
          <div className="home-content-container">
            <h1 className="home-heading">Find Your Next Favorite Books?</h1>
            <p className="home-description">
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </p>
            <button
              type="button"
              className="mobile-find-books-button"
              onClick={this.onClickFindBook}
            >
              Find Books
            </button>
            <div className="book-carousel-container">
              <div className="carousel-header-container">
                <h1 className="carousel-heading">Top Rated Books</h1>
                <button
                  type="button"
                  className="find-books-button"
                  onClick={this.onClickFindBook}
                >
                  Find Books
                </button>
              </div>
              <div className="carousels">{this.renderHomePageView()}</div>
            </div>
          </div>
          <div className="footer-container">
            <Footer />
          </div>
        </div>
      </>
    )
  }
}
export default Home
