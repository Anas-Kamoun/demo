import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StateContext = createContext({
  user: null,
  token: null,
  notification: null,
  setUser: () => {},
  setToken: () => {},
  setNotification: () => {}
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [notification, setNotification] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('ACCESS_TOKEN').then((value) => {
      setToken(value);
    });
  }, []);

  const updateToken = (newToken) => {
    setToken(newToken);

    if (newToken) {
      AsyncStorage.setItem('ACCESS_TOKEN', newToken);
    } else {
      AsyncStorage.removeItem('ACCESS_TOKEN');
    }
  };

  const clearNotification = () => {
    setNotification("");
  };

  const setNotificationWithTimeout = (message) => {
    setNotification(message);
    setTimeout(clearNotification, 5000);
  };

  return (
    <StateContext.Provider
      value={{
        user,
        token,
        setUser,
        updateToken,
        notification,
        setNotification: setNotificationWithTimeout
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
