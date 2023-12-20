import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import MainCarousel from "../../components/mainCarousel/mainCarousel";

const ExploreCard = ({
  title,
  interiorStyle,
  price,
  location,
  rating,
  imageUrl,
}) => {
  // You can use state hooks here if needed
  console.log("image url:", imageUrl);

  return (
    <div className="col-md-3">
      <div className="card mb-3 border-0">
        {/* <MainCarousel
          images={[
            "house-style-random/house-style-random_6.jpg",
            "house-style-random/house-style-random_1.jpg",
          ]}
        /> */}
        <MainCarousel images={imageUrl} />
        <div className="card-body p-0">
          <div className="d-flex justify-content-between align-items-baseline">
            <p className="badge badge-pill badge-dark">{interiorStyle}</p>
            <p className="card-text">{`${rating}`}</p>
          </div>
          <p className="card-title" style={{ lineHeight: "1.2" }}>
            {title}
          </p>
          <p className="card-text" style={{ lineHeight: "0.4" }}>
            {price}
          </p>
          <p className="card-text" style={{ lineHeight: "0.4" }}>
            {location}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExploreCard;
