import React, { Component } from "react";
import Header from "../../components/header/Header.js";
import Footer from "../../components/footer/Footer.js";
import TopButton from "../../components/topButton/TopButton.js";
import "./QuizTest.css";
import questionsData from "./QuizTestQuestion";
import quizStyleType from "./QuizStyleType.js";
import axios from "axios";
// import "dotenv/config";
import replaceDashesWithUnderscores from "../../shared/utils.js";

class QuizTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: 0,
      selectedAnswer: "",
      answers: {},
      result: {},
      quizCompleted: false,
    };
  }

  resetQuiz = () => {
    this.setState({
      currentQuestion: 0,
      selectedAnswer: "",
      answers: {},
      result: {},
      quizCompleted: false, // Reset the quiz completion flag
    });
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

    console.log("updated answer: ", updatedAnswers);

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
    console.log("inside here");
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
    });
  };

  sendAnswersToServer = () => {
    const { answers } = this.state;
    console.log("answer: ", answers);

    console.log("api: ", process.env.API_BASE_URL);
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

  render() {
    const theme = this.props.theme;
    const {
      currentQuestion,
      selectedAnswer,
      result,
      quizCompleted,
    } = this.state;
    const totalQuestions = Object.keys(questionsData).length;
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;
    console.log(
      "current question, total question: ",
      currentQuestion,
      totalQuestions
    );

    return (
      <div>
        <Header theme={theme} />
        <div className="quiz-test-main">
          <h1>Quiz Test</h1>

          {/* Container for progress bar and quiz layout */}
          <div className="progress-container">
            {/* Display progress bar */}
            <progress value={progress} max={100} />

            {currentQuestion < totalQuestions && !quizCompleted ? (
              // {true ? (
              <>
                <p>{questionsData[currentQuestion].question}</p>
                <div className="quiz-layout">
                  {questionsData[currentQuestion].options.map(
                    (option, index) => (
                      <div
                        key={index}
                        onClick={() => this.handleAnswerSelection(option.type)}
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
            ) : (
              <div>
                <h2>Quiz Completed!</h2>
                {Object.keys(result).length > 0 && (
                  <div>
                    <h3>Quiz Results:</h3>
                    <ul>
                      {result.mostFrequentElements &&
                        result.mostFrequentElements.map((element, index) => (
                          <div>
                            <div key={index}>{element}</div>
                            <p>
                              {
                                quizStyleType[
                                  replaceDashesWithUnderscores(element)
                                ]
                              }
                            </p>
                            <img
                              src={require(`../../assests/quiz-image/${element}/${element}_1.jpg`)}
                              // width="80%"
                              // height="80%"
                              alt={`Option ${index + 1}`}
                            />
                          </div>
                        ))}
                    </ul>
                  </div>
                )}
                <button onClick={() => this.resetQuiz()}>Do Quiz Again</button>
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
