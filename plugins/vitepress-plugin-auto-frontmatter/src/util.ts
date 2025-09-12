export const formatDate = (date: Date | string | number, format = "yyyy-MM-dd hh:mm:ss") => {
  if (!date) return ""; // 如果日期为空，返回空字符串
  const d = new Date(date);

  // 提取日期和时间的各个部分
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0"); // 月份从 0 开始，需要 +1
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");

  // 替换格式化字符串中的占位符
  return format
    .replace("yyyy", year.toString())
    .replace("MM", month)
    .replace("dd", day)
    .replace("hh", hours)
    .replace("mm", minutes)
    .replace("ss", seconds);
};
