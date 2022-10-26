export function convertTo12Format(time) {
  if (!time) return "";

  let [hour, minute] = time.split(":");
  hour = Number(hour);
  minute = Number(minute);

  return `${hour > 12 ? hour - 12 : hour}:${String(minute).padStart(2, "0")} ${
    hour > 12 ? "PM" : "AM"
  }`;
}
