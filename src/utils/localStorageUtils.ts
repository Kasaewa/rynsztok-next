// gotowe funkcje do obsługi local storage w przeglądarce

export const saveToLocalStorage = <T>(storageKey: string, data: T): void => {
  if (typeof window !== "undefined") {
    try {
      const dataString = JSON.stringify(data);
      localStorage.setItem(storageKey, dataString);
    } catch (err) {
      console.error("Error while saving to localStorage:", err);
    }
  }
};

export const loadFromLocalStorage = <T>(
  storageKey: string,
  defaultValue: T
): T => {
  if (typeof window === "undefined") {
    return defaultValue;
  }
  const storedItem = localStorage.getItem(storageKey);

  if (!storedItem || storedItem === "undefined" || storedItem === "null") {
    return defaultValue;
  }

  try {
    return JSON.parse(storedItem);
  } catch (err) {
    console.error("Error parsing JSON from localStorage:", err);
    return defaultValue;
  }
};
