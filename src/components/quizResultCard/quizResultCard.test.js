import React from "react";
import { shallow } from "enzyme";
import QuizResultCard from "./quizResultCard";

describe("QuizResultCard", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<QuizResultCard />);
    expect(wrapper).toMatchSnapshot();
  });
});
