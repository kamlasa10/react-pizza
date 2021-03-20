export function transformNumToStr(num) {
  return num + ''
}

export function transformObjToArr(obj) {
  return Object.entries(obj)
}

export const checkType = (value) => {
  return typeof value
}