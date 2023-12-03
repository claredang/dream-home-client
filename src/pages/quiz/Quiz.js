import React, { Component } from "react";
import Header from "../../components/header/Header.js";
import Footer from "../../components/footer/Footer.js";
import TopButton from "../../components/topButton/TopButton.js";
import { Fade } from "react-reveal";
import { quizPage } from "../../portfolio.js";
import QuizTest from "../../containers/QuizTest/QuizTest.js";
import QuizImageUpload from "../../containers/QuizImageUpload/QuizImageUpload.js";
import PhotoAlbum from "react-photo-album";
import slides from "./data.ts";
import { Image } from "react-grid-gallery";
import "./Quiz.css";

const quizData = quizPage.quiz;

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showQuizTest: false,
      showImageUpload: false,
      imageIndex: -1,
    };
  }

  handleQuizButtonClick = () => {
    this.setState({ showQuizTest: true });
  };

  handleUploadImageClick = () => {
    this.setState({ showImageUpload: true });
  };

  render() {
    const theme = this.props.theme;
    const { showQuizTest, showImageUpload, imageIndex } = this.state;

    if (showQuizTest) {
      return <QuizTest theme={this.props.theme} />;
    }

    if (showImageUpload) {
      return <QuizImageUpload theme={this.props.theme} />;
    }

    return (
      <div className="contact-main">
        <Header theme={theme} />
        <div className="reading-container">
          {/* First row with image, title, and intro */}
          <div className="reading-header">
            <Fade bottom duration={1000} distance="40px">
              <div className="contact-heading-div">
                <div className="contact-heading-img-div">
                  <PhotoAlbum
                    layout="rows"
                    photos={slides}
                    targetRowHeight={150}
                    spacing={1}
                    onClick={({ index: current }) =>
                      this.setState({ index: current })
                    }
                  />
                </div>
                <div className="contact-heading-text-div">
                  <h1
                    className="contact-heading-text"
                    style={{ color: theme.text }}
                  >
                    {quizData["title"]}
                  </h1>
                  <p
                    className="contact-header-detail-text subTitle"
                    style={{ color: theme.secondaryText }}
                  >
                    {quizData["description"]}
                  </p>
                  <button onClick={this.handleQuizButtonClick}>
                    Do Quiz Test!
                  </button>
                  <button onClick={this.handleUploadImageClick}>
                    Upload Images
                  </button>
                </div>
              </div>
            </Fade>
          </div>
        </div>
        <Footer theme={this.props.theme} onToggle={this.props.onToggle} />
        <TopButton theme={this.props.theme} />
      </div>
    );
  }
}

export default Quiz;
