import React from "react";
import { shallow } from "enzyme";
import MainButton from "./mainButton";

describe("MainButton", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MainButton />);
    expect(wrapper).toMatchSnapshot();
  });
});
