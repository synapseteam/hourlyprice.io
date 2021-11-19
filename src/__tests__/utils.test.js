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

test("return Null from function handleTimeChange in case user type more then 2 decimal symbols", () => {
  const mockEvent = {
    target: {
      value: "11,001",
      name: "time",
    },
  };

  expect(handleTimeChange(mockEvent)).toBe(null);
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

test("return Null from function handlePriceChange in case user type more then 2 decimal symbols for Price field", () => {
  const mockEvent = {
    target: {
      value: "17,130",
      name: "price",
    },
  };

  expect(handlePriceChange(mockEvent)).toBe(null);
});

test("return Null from function handlePriceChange in case user type more then 4 decimal symbols for Rate field", () => {
  const mockEvent = {
    target: {
      value: "17,13033",
      name: "usd",
    },
  };

  expect(handlePriceChange(mockEvent)).toBe(null);
});
