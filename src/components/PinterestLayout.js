import React from "react";
import Card from "./Card.js";

function PinterestLayout({ isLoop = false, images }) {
  return (
    <div style={styles.pin_container}>
      {isLoop ? (
        images.map((element, index) => (
          <React.Fragment key={index}>
            <Card
              // key={index}
              size="small"
              src={require(`../../src/assests/quiz-image/${element}/${element}_${
                index + 1
              }.jpg`)}
            />
            <Card
              // key={index}
              size="small"
              src={require(`../../src/assests/quiz-image/${element}/${element}_${
                index + 2
              }.jpg`)}
            />
            <Card
              size="medium"
              src={require(`../../src/assests/quiz-image/${element}/${element}_${
                index + 3
              }.jpg`)}
            />
            <Card
              // key={index}
              size="small" // You can adjust the size as needed
              src={require(`../../src/assests/quiz-image/${element}/${element}_${
                index + 4
              }.jpg`)}
            />
            <Card
              // key={index}
              size="small"
              src={require(`../../src/assests/quiz-image/${element}/${element}_${
                index + 5
              }.jpg`)}
            />
            <Card
              // key={index}
              size="medium"
              src={require(`../../src/assests/quiz-image/${element}/${element}_${
                index + 6
              }.jpg`)}
            />
          </React.Fragment>
        ))
      ) : (
        <React.Fragment>
          <Card
            size="small"
            src={require(`../../src/assests/house-style-random/quiz-cover_1.jpg`)}
          />
          <Card
            size="medium"
            src={require(`../../src/assests/house-style-random/quiz-cover_2.jpg`)}
          />
          <Card
            size="small"
            src={require(`../../src/assests/house-style-random/quiz-cover_3.jpg`)}
          />
          <Card
            size="medium"
            src={require(`../../src/assests/house-style-random/quiz-cover_4.jpg`)}
          />
          <Card
            size="medium"
            src={require(`../../src/assests/house-style-random/quiz-cover_5.jpg`)}
          />
          <Card
            size="small"
            src={require(`../../src/assests/house-style-random/quiz-cover_6.jpg`)}
          />
        </React.Fragment>
      )}
    </div>
  );
}

const styles = {
  pin_container: {
    margin: 0,
    padding: 0,
    // width: "80vw",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 200px)",
    gridAutoRows: "10px",
    // position: "absolute",
    // left: "50%",
    // transform: "translateX(-50%)",
    justifyContent: "center",
    // backgroundColor: "black",
  },
};

export default PinterestLayout;
