import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Header from "../../components/header/Header.js";
import Footer from "../../components/footer/Footer.js";
import TopButton from "../../components/topButton/TopButton.js";
import Button from "../../components/button/Button.js";
import QuizResultCard from "../../components/quizResultCard/quizResultCard.js";

import "./QuizTest.css";
import questionsData from "./QuizTestQuestion";
import quizStyleType from "./QuizStyleType.js";
import axios from "axios";
// import "dotenv/config";
import { replaceDashesWithUnderscores, shuffleArray } from "../../shared/utils";
import text from "../../shared/content.js";
import PinterestLayout from "../../components/PinterestLayout.js";

class QuizTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: 0,
      selectedAnswer: "",
      answers: {},
      result: {},
      quizCompleted: false,
      navigateExplore: false,
    };
  }

  resetQuiz = () => {
    const shuffledQuestions = shuffleArray(questionsData);
    const shuffledOptions = shuffledQuestions.map((question) => ({
      ...question,
      options: shuffleArray(question.options),
    }));

    this.setState(() => ({
      currentQuestion: 0,
      selectedAnswer: "",
      answers: {},
      result: {},
      quizCompleted: false,
      shuffledQuestions: shuffledOptions,
    }));
  };

  handleAnswerSelection = (answer) => {
    this.setState({ selectedAnswer: answer }, () => {
      this.handleNextQuestion();
    });
  };

  handleNextQuestion = () => {
    const { currentQuestion, selectedAnswer, answers } = this.state;
    const currentQuestionData = questionsData[currentQuestion];
    const totalQuestions = Object.keys(questionsData).length;

    const updatedAnswers = {
      ...answers,
      [currentQuestionData.id]: selectedAnswer,
    };

    this.setState(
      {
        selectedAnswer: "",
        answers: updatedAnswers,
        currentQuestion: currentQuestion + 1,
      },
      () => {
        // If it's the last question, send answers to the server
        if (this.state.currentQuestion === totalQuestions) {
          this.quizResult();
          // this.sendAnswersToServer();
        }
      }
    );
  };

  handleBackButton = () => {
    const { currentQuestion } = this.state;
    if (currentQuestion > 0) {
      this.setState({ currentQuestion: currentQuestion - 1 });
    }
  };

  quizResult = () => {
    const { answers } = this.state;
    const elementCounts = {};

    // Count occurrences of each element
    Object.values(answers).forEach((element) => {
      elementCounts[element] = (elementCounts[element] || 0) + 1;
    });

    // Find the elements with the highest count
    const mostFrequentElements = [];
    let highestCount = 0;

    Object.keys(elementCounts).forEach((element) => {
      if (elementCounts[element] > highestCount) {
        mostFrequentElements.length = 0; // Reset the array if a higher count is found
        mostFrequentElements.push(element);
        highestCount = elementCounts[element];
      } else if (elementCounts[element] === highestCount) {
        mostFrequentElements.push(element);
      }
    });

    this.setState({
      result: {
        mostFrequentElements,
      },
      quizCompleted: true,
    });
  };

  sendAnswersToServer = () => {
    const { answers } = this.state;
    // console.log("answer: ", answers);

    // console.log("api: ", process.env.API_BASE_URL);
    // Send the answers to the backend API
    // You can use a library like axios for making HTTP requests
    // Example using fetch:
    // const response = axios.get(`${process.env.API_BASE_URL}/api/data`);
    const response = fetch(`http://localhost:8080/api/test`);
    console.log("RESPONSE: ", response);
    // fetch(`${process.env.API_BASE_URL}/api/quiz`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ answers: this.state.answers }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("API response:", data);
    //     // Handle the API response as needed
    //     this.setState({ result: data });
    //     console.log(this.state.result);
    //   })
    //   .catch((error) => {
    //     console.error("Error sending answers to the server:", error);
    //   });
  };

  handleNavigateToExplore = () => {
    this.setState({ navigateExplore: true });
  };

  render() {
    const theme = this.props.theme;
    const {
      currentQuestion,
      selectedAnswer,
      result,
      quizCompleted,
      navigateExplore,
    } = this.state;
    const totalQuestions = Object.keys(questionsData).length;
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;
    console.log(result);
    let shuffledElements;
    if (
      result.mostFrequentElements &&
      Array.isArray(result.mostFrequentElements) &&
      quizCompleted
    ) {
      // Shuffle the array to get a random order
      shuffledElements = result.mostFrequentElements
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
    }
    // const shuffledElements = result.mostFrequentElements
    //   .sort(() => Math.random() - 0.5)
    //   .slice(0, 3);

    if (navigateExplore) {
      return <Redirect to="/explore" />;
    }

    return (
      <div class="main">
        <Header theme={theme} />
        <div>
          <div className="progress-container">
            {!quizCompleted ? (
              <>
                <div className="quiz-test-main">
                  <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                      class="bg-orange-100 h-2.5 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  {currentQuestion < totalQuestions && (
                    <>
                      <p>{questionsData[currentQuestion].question}</p>

                      <div className="quiz-layout">
                        {questionsData[currentQuestion].options.map(
                          (option, index) => (
                            <div
                              key={index}
                              onClick={() =>
                                this.handleAnswerSelection(option.type)
                              }
                              className={
                                selectedAnswer === option.text ? "selected" : ""
                              }
                            >
                              <label>
                                <div className="quiz-item">
                                  <img
                                    src={require(`../../assests/quiz-image/${option.type}/${option.image}`)}
                                    width={50}
                                    height={50}
                                    alt={`Option ${index + 1}`}
                                  />
                                  <span>{option.text}</span>
                                </div>
                              </label>
                            </div>
                          )
                        )}
                      </div>
                      <button onClick={this.handleBackButton}>Back</button>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className="quiz-result-main">
                {Object.keys(result).length > 0 && (
                  <div>
                    <h3>Quiz Results:</h3>
                    <div className="quiz-results-container">
                      <div
                        className="column"
                        style={{ backgroundColor: "white" }}
                      >
                        <ul>
                          {result.mostFrequentElements &&
                            result.mostFrequentElements.map(
                              (element, index) => (
                                <div
                                  className="column"
                                  style={{ backgroundColor: "white" }}
                                >
                                  {/* <li key={index}>{element}</li> */}
                                  <ul>
                                    <QuizResultCard
                                      cardInfo={{
                                        title: element,
                                        description:
                                          quizStyleType[
                                            replaceDashesWithUnderscores(
                                              element
                                            )
                                          ],
                                      }}
                                    />
                                  </ul>
                                </div>
                              )
                            )}
                        </ul>
                        <Button onClick={() => this.resetQuiz()}>
                          {text.quiz.do_quiz_again}
                        </Button>
                        <Button onClick={() => this.handleNavigateToExplore()}>
                          {text.quiz.explore_your_style}
                        </Button>
                      </div>
                      <div className="column">
                        <PinterestLayout
                          images={shuffledElements}
                          isLoop={true}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <Footer theme={this.props.theme} onToggle={this.props.onToggle} />
        <TopButton theme={this.props.theme} />
      </div>
    );
  }
}

export default QuizTest;
