export default function useDateTimeFormat(date) {
  console.log(date);
  if (date === undefined) {
    return;
  }
  if (date === "") {
    return;
  }
  //선택한 날짜를 yyymmdd로 변환
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
