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

// API for getting all document details

export const getAllDocumentDetailsAPI = async () => {
  try {
    let result = await axios(`${API_URL_BASE}/getAllDocument`, {
      method: "GET",
      withCredentials: true,
    });
    return result;
  } catch (error) {
    return error;
  }
};

// API for checking document assign to given is valid or not

export const validDocumentAssignAPI = async (document_id, user_id) => {
  try {
    let result = await axios(
      `${API_URL_BASE}/validDocumentAssign?document_id=${document_id}&user_id=${user_id}`,
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
