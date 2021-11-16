import { convertStrTimeToNum } from "./../utils";

test("time string received from Form field properly converts to number", () => {
  expect(convertStrTimeToNum("60:30")).toBe(60.5);
});
