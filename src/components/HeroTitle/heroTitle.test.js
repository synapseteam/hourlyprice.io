import React from "react";
import renderer from "react-test-renderer";

import HeroTitle from "components/HeroTitle";

if (!global.React) {
  global.React = React;
}

it("Hero title rendered correctly", () => {
  const tree = renderer.create(<HeroTitle />).toJSON();

  expect(tree).toMatchSnapshot();
});
