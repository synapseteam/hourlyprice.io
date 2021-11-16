import {
  convertStrTimeToNum,
  handleTimeChange,
  handlePriceChange,
} from "./../utils";

test("time string received from Form field properly converts to number", () => {
  expect(convertStrTimeToNum("60:30")).toBe(60.5);
});

test("data from event extracted correctly and returned in a proper Time format (HH:MM)", () => {
  const mockEvent = {
    target: {
      value: "123, 0",
      name: "time",
    },
  };

  expect(handleTimeChange(mockEvent)).toBe("123:0");
});

test("data from event extracted correctly and returned in a proper Price format (HH:MM)", () => {
  const mockEvent = {
    target: {
      value: "17, 0",
      name: "price",
    },
  };

  expect(handlePriceChange(mockEvent)).toBe("17.0");
});
