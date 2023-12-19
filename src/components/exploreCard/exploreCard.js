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
        <MainCarousel
          images={[
            "../../assests/house-style-random/house-style-random_5.jpg",
            "../../assests/house-style-random/house-style-random_2.jpg",
            // Add more image URLs as needed
          ]}
        />
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-baseline">
            <p className="badge badge-pill badge-dark">{interiorStyle}</p>
            <p className="card-text">{`${rating}`}</p>
          </div>
          <p className="card-title">{title}</p>
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
