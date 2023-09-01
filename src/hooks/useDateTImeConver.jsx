export default function useDateTimeConver(date, time) {
  // 원래 날짜 데이터로 변환
  if (date === "" || time === "") {
    return;
  }
  if (date !== undefined) {
    const originalDate = new Date(date + " " + time);
    return originalDate;
  }
}
