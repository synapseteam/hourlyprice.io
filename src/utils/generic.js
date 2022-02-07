const MINUTES_IN_HOUR = 60;
const DECIMAL_SIGNS_FOR_RATES = 4;
const DECIMAL_SIGNS_FOR_PRICE = 2;
const SIGNS_FOR_MINUTES_FORMAT = 2;

export function convertStrTimeToNum(timeString) {
  const normalizedTime = timeString.split(":");

  const [hours, minutes] = normalizedTime;

  if (!minutes) return Number(hours);

  const minutesConvertedTrunced =
    Math.floor((minutes / MINUTES_IN_HOUR) * 1000) / 1000; //1000 used as multyplier and divider to convert decimal number to the integer and getting a proper Math.floor result.

  return Number(hours) + Number(minutesConvertedTrunced);
}

export function handleTimeChange(e) {
  const { value } = e.target;

  const updatedValue = value.replace(",", ":").replace(/[^0-9^:]/gim, "");

  const minutesLimited = updatedValue.replace(/:[6-9]/gim, ":5");
  const [hours, minutes] = minutesLimited.split(":");

  if (minutes?.length >= SIGNS_FOR_MINUTES_FORMAT) {
    e.target.value = `${hours}:${minutes.slice(0, SIGNS_FOR_MINUTES_FORMAT)}`;
    return null;
  }

  e.target.value = minutesLimited;

  return minutesLimited;
}

export function handlePriceChange(e) {
  const { value, name } = e.target;

  const updatedValue = value.replace(",", ".").replace(/[^0-9^.]/, "");

  const [intVal, decimalVal] = updatedValue.split(".");

  if (name === "price" && decimalVal?.length >= DECIMAL_SIGNS_FOR_PRICE) {
    e.target.value = `${intVal}.${decimalVal.slice(
      0,
      DECIMAL_SIGNS_FOR_PRICE
    )}`;
    return null;
  }

  if (name !== "price" && decimalVal?.length >= DECIMAL_SIGNS_FOR_RATES) {
    e.target.value = `${intVal}.${decimalVal.slice(
      0,
      DECIMAL_SIGNS_FOR_RATES
    )}`;
    return null;
  }

  e.target.value = updatedValue;

  return updatedValue;
}
