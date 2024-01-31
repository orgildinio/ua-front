import axios from "axios-base";
import base from "./base";

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

export const convertFromdata = (formData) => {
  const sendData = new FormData();
  Object.keys(formData).map((index) => {
    if (
      formData[index] &&
      formData[index].constructor === Array &&
      formData[index].length > 0
    ) {
      for (let i = 0; i < formData[index].length; i++) {
        sendData.append([index], formData[index][i]);
      }
    } else sendData.append(index, formData[index]);
  });

  return sendData;
};

export const productRate = async (data) => {
  try {
    const result = await axios.post(`/productrates`, data);
    return { result };
  } catch (error) {
    return error;
  }
};

export const postRate = async (data) => {
  try {
    const result = await axios.post(`/rates`, data);
    return { result };
  } catch (error) {
    return { error: errorRender(error) };
  }
};
