/**
 * 'H:M' 형태의 시간을 'HH:MM' 형태로 변경
 * @param time 'H:M' 형태의 시간
 */
export const rawTimeToReqTimeFormat = (time: string) => {
  const [hour, minute] = time.split(':');
  const formattedHour = hour.padStart(2, '0');
  const formattedMinute = minute.padStart(2, '0');

  return `${formattedHour}:${formattedMinute}`;
};

/**
 * 응답받은 'HH:MM:00' 형태의 시간을 '오전:H:MM' 형태로 변경
 * @param resTime 응답받은 설정된 알림 시간
 */
export const resTimeToTimeIndicatorFormat = (resTime: string) => {
  const [hour, minute] = resTime.split(':');
  const intHour = parseInt(hour);
  const period = intHour < 12 ? '오전' : '오후';
  const formattedHour = intHour % 12 || 12;
  const formattedMinute = minute.padStart(2, '0');

  return `${period} ${formattedHour}시 ${formattedMinute}분`;
};
