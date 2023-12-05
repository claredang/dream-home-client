import React from "react";

function Card({ size, src }) {
  return (
    <div
      style={{
        ...styles.card,
        ...styles[size],
      }}
    >
      <img
        src={src}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
}

const styles = {
  card: {
    margin: "10px 10px",
    padding: 0,
    borderRadius: "16px",
  },
  small: {
    gridRowEnd: "span 26", // dimension will be : 26 x 10 row (in Pinterest) -> default: 250 x 260 -> minus margin etc
  },
  //   medium: {
  //     gridRowEnd: "span 33",
  //   },
  medium: {
    gridRowEnd: "span 35",
  },
  //   large: {
  //     gridRowEnd: "span 45",
  //   },
  large: {
    gridRowEnd: "span 60",
  },
};

export default Card;
