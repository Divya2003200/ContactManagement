import axios from "axios";

const API_URL = "http://localhost:8080/api/contacts";

export const getAllContacts = () => axios.get(API_URL);
export const getContact = (id) => axios.get(`${API_URL}/${id}`);
export const createContact = (data) => axios.post(API_URL, data);
export const updateContact = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteContact = (id) => axios.delete(`${API_URL}/${id}`);
