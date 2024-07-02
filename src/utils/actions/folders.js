import serverCall, { deleteRequest, postRequest } from "./serverCall";
import { API_FOLDERS } from "@/constant/constant";

const getFolders = async () => {
  return await serverCall(API_FOLDERS.baseUrl);
};

const addFolder = async (data) => {
  return await postRequest(API_FOLDERS.add, data);
};

const updateFolder = async (data) => {
  return await postRequest(API_FOLDERS.update, data);
};

const removeFolder = async (folderId) => {
  return deleteRequest(API_FOLDERS.remove(folderId));
};

export { getFolders, addFolder, updateFolder, removeFolder };
