import { isNumber, isString, isStringNumber } from "./is";

/**
 * 为路径 path 添加站点根路径 base 前缀，等价于 vitepress 的 withBase。Markdown 插件需要用到
 */
export const withBase = (base: string, path: string | undefined) => {
  if (!path) return;
  return /^(?:[a-z]+:|\/\/)/i.test(path) || !path.startsWith("/") ? path : `${base}${path}`.replace(/\/+/g, "/");
};

/**
 * 将字符串的第一个字符大写
 */
export const upperFirst = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * 添加单位，如 value 为 16，则返回 16px
 */
export const addUnit = (value?: string | number, defaultUnit = "px") => {
  if (!value) return "";
  if (isNumber(value) || isStringNumber(value)) return `${value}${defaultUnit}`;
  else if (isString(value)) return value;
  return "";
};

/**
 * 移除单位，如 value 为 16px，则返回 16
 */
export const removeUnit = (value?: string | number, defaultUnit = "px") => {
  if (!value) return;
  if (isNumber(value)) return value;
  if (isString(value)) return Number(value.replace(defaultUnit, ""));
  else return;
};

/**
 * 获取图片的 alt 属性，未提供 alt 时使用图片文件名（不包含扩展名）
 *
 * @param src 图片地址
 * @param alt 自定义 alt，传入空字符串表示装饰性图片
 */
export const getImageAlt = (src?: string, alt?: string) => {
  if (alt !== undefined && alt !== null) return String(alt);
  if (!src || /^(data|blob):/i.test(src)) return "";

  const path = src.split(/[?#]/)[0];
  const fileName = path.split(/[/\\]/).pop() || "";
  const name = fileName.replace(/\.[^.]+$/, "") || fileName;

  try {
    return decodeURIComponent(name);
  } catch {
    return name;
  }
};

/**
 * 获取对象值
 */
export const get = (object: Record<string, any>, path: string, defaultValue?: any) => {
  let obj = { ...object };
  if (!path.includes(".")) return obj[path] || defaultValue;
  else {
    path.split(".").forEach(item => (obj = obj[item] ?? ""));
    return obj || defaultValue;
  }
};

/**
 * 删除 Storage 的数据
 *
 * @param key 键名
 * @param storage 存储类型，如 localStorage, sessionStorage
 * @param vague 是否模糊匹配
 */
export const removeStorageItem = (key: string, storage: Storage, vague = false) => {
  if (!vague) return storage.removeItem(key);

  const keysToRemove: string[] = [];

  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i);
    if (key && key.startsWith(key)) {
      keysToRemove.push(key);
    }
  }

  keysToRemove.forEach(key => storage.removeItem(key));
};
