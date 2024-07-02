const API_BASE = "/api/v1";

const FOLDER_BASE_URL = API_BASE + "/folders/";

const NOTE_BASE_URL = API_BASE + "/notes/";

const API_FOLDERS = {
  baseUrl: FOLDER_BASE_URL,

  add: FOLDER_BASE_URL + "/add",

  update: FOLDER_BASE_URL + "/edit",

  remove: (folderId) => FOLDER_BASE_URL + "/remove/" + folderId,
};

const API_NOTES = {
  baseUrl: (folderId) => NOTE_BASE_URL + folderId,

  add: NOTE_BASE_URL + "/add",

  update: NOTE_BASE_URL + "/edit",

  remove: (noteId) => NOTE_BASE_URL + "/remove/" + noteId,
};

export { API_BASE, FOLDER_BASE_URL, NOTE_BASE_URL, API_FOLDERS, API_NOTES };
