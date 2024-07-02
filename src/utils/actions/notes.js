import serverCall, { deleteRequest, postRequest } from "./serverCall";
import { API_NOTES } from "@/constant/constant";

const getNotes = async (folderId) => {
  return await serverCall(API_NOTES.baseUrl(folderId));
};

const addNote = async (data) => {
  return await postRequest(API_NOTES.add, data);
};

const updateNote = async (data) => {
  return await postRequest(API_NOTES.update, data);
};

const removeNote = async (noteId) => {
  return deleteRequest(API_NOTES.remove(noteId));
};

export { getNotes, addNote, updateNote, removeNote };
