import { useState } from 'react';

export const useLocalStorage = (key, initialValue) => {
  // set up useState
  const [storedValue, setStoredValue] = useState(() => {
    //if value is  already in storage, use it
    if (JSON.parse(window.localStorage.getItem(key))) {
      return JSON.parse(window.localStorage.getItem(key));
    } else { //if value is not already in storage, set it to storage
      window.localStorage.setItem(key, JSON.stringify(initialValue));
      return initialValue
    }//end if
  });

  //create setter function
  const setValue = (value) => {
    //set value
    setStoredValue(value);
    //add to localStorage
    window.localStorage.setItem(key, JSON.stringify(value));
  }//end setValue

  //return array
  return [storedValue, setValue];

}//end useLocalStorage