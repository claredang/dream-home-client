import React, { Component } from "react";
import { Fade } from "react-reveal";
import PhotoAlbum from "react-photo-album";
import { Redirect } from "react-router-dom";
import "./Quiz.css";

import Header from "../../components/header/Header.js";
import Footer from "../../components/footer/Footer.js";
import TopButton from "../../components/topButton/TopButton.js";
import Button from "../../components/button/Button.js";
import { quizPage } from "../../portfolio.js";
import QuizImageUpload from "../../containers/QuizImageUpload/QuizImageUpload.js";
import PinterestLayout from "../../components/PinterestLayout.js";
import slides from "./data.ts";
import text from "../../shared/content.js";

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
      return <Redirect to="/quiz-test" />;
    }

    if (showImageUpload) {
      // return <QuizImageUpload theme={this.props.theme} />;
      return <Redirect to="/quiz-upload" />;
    }

    return (
      <div className="contact-main">
        <Header theme={theme} />
        <div className="reading-container">
          <div className="reading-header">
            <Fade bottom duration={1000} distance="40px">
              <div className="contact-heading-div">
                <div className="contact-heading-img-div">
                  {/* <PhotoAlbum
                    layout="rows"
                    photos={slides}
                    targetRowHeight={150}
                    spacing={1}
                    onClick={({ index: current }) =>
                      this.setState({ index: current })
                    }
                  /> */}
                  <PinterestLayout />
                </div>
                <div className="contact-heading-text-div">
                  <h1
                    className="contact-heading-text"
                    style={{
                      color: theme.text,
                      paddingBottom: "14px",
                      paddingTop: "20px",
                    }}
                  >
                    {quizData["title"]}
                  </h1>
                  <p
                    className="contact-header-detail-text subTitle"
                    style={{
                      color: theme.secondaryText,
                      paddingBottom: "14px",
                    }}
                  >
                    {quizData["description"]}
                  </p>
                  <Button
                    onClick={this.handleQuizButtonClick}
                    className="button"
                  >
                    {text.quiz.do_quiz_test}
                  </Button>
                  <Button onClick={this.handleUploadImageClick}>
                    {text.quiz.upload_image}
                  </Button>
                </div>
              </div>
            </Fade>
          </div>
        </div>
        <img
          src={require(image)}
          alt="Explore Card"
          className="w-100 h-100 object-fit-cover border rounded"
        />
        <Footer theme={this.props.theme} onToggle={this.props.onToggle} />
        <TopButton theme={this.props.theme} />
      </div>
    );
  }
}

export default Quiz;
