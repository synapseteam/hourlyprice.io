export function convertStrTimeToNum(timeString) {
  const normalizedTime = timeString.split(":");

  const [hours, minutes] = normalizedTime;

  if (!minutes) return Number(hours);

  const minutesConvertedTrunced = parseFloat(String(minutes / 60).slice(0, 5));

  return minutesConvertedTrunced + Number(hours);
}

export function handleTimeChange(e) {
  const { value } = e.target;
  const updatedValue = value.replace(/([^0-9^:]|^0)/, "");

  const minutesLimited = updatedValue.replace(/:[6-9]/gim, ":5");
  const [hours, minutes] = minutesLimited.split(":");

  if (minutes?.length >= 2) {
    e.target.value = `${hours}:${minutes.slice(0, 2)}`;
    return;
  }

  e.target.value = minutesLimited;
}

export function handlePriceChange(e) {
  const { value } = e.target;

  const updatedValue = value.replace(",", ".").replace(/[^0-9^.]/, "");

  const [intVal, decimalVal] = updatedValue.split(".");

  if (decimalVal?.length >= 2) {
    e.target.value = `${intVal}.${decimalVal.slice(0, 2)}`;
    return;
  }
  e.target.value = updatedValue;
}
