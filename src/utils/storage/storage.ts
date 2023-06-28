export const setItemInLocalStorage = <T>(key: string, value: T) => {
  if (window.localStorage) {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

export const getItemFromLocalStorage = (key: string) => {
  if (window.localStorage) {
    return localStorage.getItem(key)
  }
}

export const removeItemFromLocalStorage = (key: string) => {
  if (window.localStorage) {
    localStorage.removeItem(key)
  }
}