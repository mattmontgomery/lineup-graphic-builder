import { useEffect, useState } from "react";

function getStorageValue<T = unknown>(key: string, defaultValue: T) {
  // getting stored value
  const saved =
    typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
  const initial = saved ? JSON.parse(saved) : null;
  return initial || defaultValue;
}

function setStorageValue(key: string, value: string) {
  // getting stored value

  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}

export default function useLocalStorage<T = unknown>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] {
  const [value, setValue] = useState(() => {
    return getStorageValue<T>(key, defaultValue);
  });
  useEffect(() => {
    setStorageValue(key, value);
  }, [key, value]);
  return [value, setValue];
}
