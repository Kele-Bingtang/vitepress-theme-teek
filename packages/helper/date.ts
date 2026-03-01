/**
 * 获取当前时间，返回格式为 yyyy-MM-dd HH:mm:ss
 */
export const getNowDate = (format = "yyyy-MM-dd hh:mm:ss", utc = true) => {
  return formatDate(new Date(), format, utc);
};

/**
 * 时间转换函数（支持时区调整）
 * @param date 日期对象或日期字符串
 * @param format 日期格式，如 'yyyy-MM-dd hh:mm:ss'、'yyyy-MM-dd'
 * @param utc 是否使用 UTC 时间，默认为 true
 */
export const formatDate = (date: Date | string | number, format = "yyyy-MM-dd hh:mm:ss", utc = true) => {
  if (!date) return ""; // 如果日期为空，返回空字符串
  const dateObj = new Date(date);

  // 提取日期和时间的各个部分
  const year = utc ? dateObj.getUTCFullYear() : dateObj.getFullYear();
  const month = String((utc ? dateObj.getUTCMonth() : dateObj.getMonth()) + 1).padStart(2, "0"); // 月份从 0 开始，需要 +1
  const day = String(utc ? dateObj.getUTCDate() : dateObj.getDate()).padStart(2, "0");
  const hours = String(utc ? dateObj.getUTCHours() : dateObj.getHours()).padStart(2, "0");
  const minutes = String(utc ? dateObj.getUTCMinutes() : dateObj.getMinutes()).padStart(2, "0");
  const seconds = String(utc ? dateObj.getUTCSeconds() : dateObj.getSeconds()).padStart(2, "0");

  // 替换格式化字符串中的占位符
  return format
    .replace("yyyy", year.toString())
    .replace("MM", month)
    .replace("dd", day)
    .replace("hh", hours)
    .replace("mm", minutes)
    .replace("ss", seconds);
};

/**
 * 计算相差时间差，返回多少年（月/天/小时/分钟/秒）前
 */
export const formatDiffDate = (startDate: Date | string | number, endDate?: Date | string | number) => {
  const start = +new Date(startDate);
  const end = endDate ? +new Date(endDate) : +new Date();
  const diff = Math.abs(end - start);
  const oneSeconds = 1000;
  const oneMinute = oneSeconds * 60;
  const oneHour = oneMinute * 60;
  const oneDay = oneHour * 24;
  const oneWeek = oneDay * 7;
  const oneMonth = oneDay * 30;
  const oneYear = oneMonth * 12;

  if (diff < 1) return "刚刚";
  if (diff < oneMinute) return `${Math.floor(diff / oneSeconds)} 秒前`;
  if (diff < oneHour) return `${Math.floor(diff / oneMinute)} 分前`;
  if (diff < oneDay) return `${Math.floor(diff / oneHour)} 时前`;
  if (diff < oneWeek) return `${Math.floor(diff / oneDay)} 天前`;
  if (diff < oneMonth) return `${Math.floor(diff / oneWeek)} 周前`;
  if (diff < oneYear) return `${Math.floor(diff / oneMonth)} 月前`;

  return `${Math.floor(diff / oneYear)} 年前`;
};

/**
 * 获取两个日期相差多少天
 */
export const formatDiffDateToDay = (startDate: Date | string | number, endDate?: Date | string | number) => {
  const start = +new Date(startDate);
  const end = endDate ? +new Date(endDate) : +new Date();

  return Math.floor(Math.abs(start - end) / (1000 * 60 * 60 * 24));
};
