import axios from "axios";
import { API_URL_BASE } from "../../utils/apiURL";

// API for adding document  

export const addDocumentAPI = async (data) => {
  console.log(data);
  try {
    let result = await axios(`${API_URL_BASE}/addDocument`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      data: data,
    });
    return result;
  } catch (error) {
    return error;
  }
};

// API for getting document

export const getDocumentAPI = async (document_id) => {
  try {
    let result = await axios(
      `${API_URL_BASE}/fetchDocument?document_id=${document_id}`,
      {
        method: "GET",
        withCredentials: true,
      }
    );
    return result;
  } catch (error) {
    return error;
  }
};

// API for getting document assigned

export const getDocumentAssignAPI = async (document_id) => {
  try {
    let result = await axios(
      `${API_URL_BASE}/getDocumentAssign?document_id=${document_id}`,
      {
        method: "GET",
        withCredentials: true,
      }
    );
    return result;
  } catch (error) {
    return error;
  }
};

// API for editting document

export const editDocumentAPI = async (data) => {
  try {
    let result = await axios(`${API_URL_BASE}/editDocument`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      data: data,
    });
    return result;
  } catch (error) {
    return error;
  }
};

// API for getting user details
/*
export const getUserDetailsAPI = async (user_id) => {
  try {
    let result = await axios(
      `${API_URL_BASE}/getUserDetails?user_id=${user_id}`,
      {
        method: "GET",
        withCredentials: true,
      }
    );
    return result;
  } catch (error) {
    return error;
  }
};

// API for getting all users details

export const getAllUsersDetailsAPI = async () => {
  try {
    let result = await axios(`${API_URL_BASE}/getAllUserDetails`, {
      method: "GET",
      withCredentials: true,
    });
    return result;
  } catch (error) {
    return error;
  }
};

// API for getting all users details by language

export const getAllUserDetailsByLanguageAPI = async (language) => {
  try {
    let result = await axios(
      `${API_URL_BASE}/getAllUserDetailsByLanguage?language=${language}`,
      {
        method: "GET",
        withCredentials: true,
      }
    );
    return result;
  } catch (error) {
    return error;
  }
};*/
