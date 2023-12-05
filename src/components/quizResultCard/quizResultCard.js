import React from "react";
import { capitalizeFirstLetter } from "../../shared/utils";
import text from "../../shared/content";
import Emoji from "../../shared/emoji";

export default function QuizResultCard({ cardInfo }) {
  function openUrlInNewTab(url) {
    var win = window.open(url, "_blank");
    win.focus();
  }

  return (
    <div className="certificate-card">
      <div className="certificate-detail-div">
        <h5 className="card-title">
          <span>
            {capitalizeFirstLetter(cardInfo.title)}{" "}
            <Emoji symbol="✨" label="sparkles" />
          </span>
        </h5>
        <p className="card-subtitle">{cardInfo.description}</p>
      </div>
      <div>
        {/* <button onClick={openUrlInNewTab(url)}>Explore more</button> */}
        <button>{text.quiz.exploreMore}</button>
      </div>
    </div>
  );
}
