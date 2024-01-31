"use client";
import { toastControl } from "lib/toastControl";
import { createContext, useContext, useEffect, useState } from "react";

const errorRender = (error) => {
  let resError = "Алдаа гарлаа дахин оролдоно уу";

  if (error.message) {
    resError = error.message;
  }

  if (error.response !== undefined && error.response.status !== undefined) {
    resError = error.response.status;
  }
  if (
    error.response !== undefined &&
    error.response.data !== undefined &&
    error.response.data.error !== undefined
  ) {
    resError = error.response.data.error.message;
  }
  return resError;
};

const NotificationContext = createContext({});

export const NotificationProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);
  const [contentLoad, setContentLoad] = useState(false);

  const clearAlert = () => {
    setError(null);
    setAlert(null);
    setContentLoad(false);
  };

  useEffect(() => {
    if (error) {
      toastControl("error", errorRender(error));
      clearAlert();
    }
  }, [error]);

  useEffect(() => {
    if (alert) {
      toastControl("success", alert);
      clearAlert();
    }
  }, [alert]);

  return (
    <NotificationContext.Provider
      value={{
        setError,
        error,
        setAlert,
        alert,
        clearAlert,
        contentLoad,
        setContentLoad,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => useContext(NotificationContext);
