export function convertStrTimeToNum(timeString) {
  const normalizedTime = timeString.split(":");

  const [hours, minutes] = normalizedTime;

  if (!minutes) return Number(hours);

  const minutesConvertedTrunced = parseFloat(String(minutes / 60).slice(0, 5));

  return minutesConvertedTrunced + Number(hours);
}

export function handleTimeChange(e) {
  const { value } = e.target;

  const updatedValue = value.replace(",", ":").replace(/[^0-9^:]/gim, "");

  const minutesLimited = updatedValue.replace(/:[6-9]/gim, ":5");
  const [hours, minutes] = minutesLimited.split(":");

  if (minutes?.length >= 2) {
    e.target.value = `${hours}:${minutes.slice(0, 2)}`;
    return;
  }

  e.target.value = minutesLimited;
}

export function handlePriceChange(e) {
  const { value, name } = e.target;

  const updatedValue = value.replace(",", ".").replace(/[^0-9^.]/, "");

  const [intVal, decimalVal] = updatedValue.split(".");

  if (name === "price" && decimalVal?.length >= 2) {
    e.target.value = `${intVal}.${decimalVal.slice(0, 2)}`;
    return;
  }

  if (name !== "price" && decimalVal?.length >= 4) {
    e.target.value = `${intVal}.${decimalVal.slice(0, 4)}`;
    return;
  }

  e.target.value = updatedValue;
}
