import React, { useState } from "react";
import MainCarousel from "../../components/mainCarousel/mainCarousel";
import "./exploreCard.css";
import { convertToHyphen, styleToColor } from "../../shared/utils";
import Emoji from "../../shared/emoji";

const ExploreCard = ({
  title,
  interiorStyle,
  price,
  location,
  rating,
  imageUrl,
}) => {
  const badgeColorClass = styleToColor(interiorStyle);

  return (
    <div className="col-md-3">
      <div className="card mb-3 border-0">
        <MainCarousel images={imageUrl} />
        <div className="card-body p-0">
          {" "}
          <div className="d-flex justify-content-between align-items-baseline">
            <p className={`badge badge-pill ${badgeColorClass} my-2`}>
              {interiorStyle}
            </p>
            <p className="card-rating mb-0">
              {" "}
              <span>
                {" "}
                <Emoji symbol="" label="sparkles" />
              </span>
              {`${rating}`}
            </p>
          </div>
          <p
            className="card-title"
            style={{ lineHeight: "1.2", marginBottom: "0.5rem" }}
          >
            {title}
          </p>
          <p
            className="card-text"
            style={{ lineHeight: "1", marginBottom: "0.2rem" }}
          >
            {price}
          </p>
          <p
            className="card-text"
            style={{ lineHeight: "1", marginBottom: "0" }}
          >
            {location}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExploreCard;
