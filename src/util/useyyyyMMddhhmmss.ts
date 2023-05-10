export function useyyyyMMddhhmmss() {
  const date = new Date();
  const year = date.getFullYear().toString();

  let month: number = date.getMonth() + 1;
  month = month < 10 ? Number("0" + month.toString()) : month;

  let day: number = date.getDate();
  day = day < 10 ? Number("0" + day.toString()) : day;

  let hour: number = date.getHours();
  hour = hour < 10 ? Number("0" + hour.toString()) : hour;

  let minutes: number = date.getMinutes();
  minutes = minutes < 10 ? Number("0" + minutes.toString()) : minutes;

  let seconds: number = date.getSeconds();
  seconds = seconds < 10 ? Number("0" + seconds.toString()) : seconds;

  return (
    year +
    month.toString() +
    day.toString() +
    hour.toString() +
    minutes.toString() +
    seconds.toString()
  );
}
