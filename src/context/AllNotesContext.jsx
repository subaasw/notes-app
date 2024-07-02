import { addNote, getNotes, updateNote } from "@/utils/actions/notes";
import React, { createContext, useState, useContext } from "react";

const AllNotesContext = createContext();

// Provider component
export const AllNotesProvider = ({ children }) => {
  const [allNotesData, setallNotesData] = useState({});

  // Function to fetch and sort notes
  const fetchAllNotes = async (folderId, noteOrder) => {
    // if (!allNotesData[folderId]) {
    try {
      const response = await getNotes(folderId);
      let body = await response.json();
      let data = body?.notes || [];

      // Sorting based on noteOrder
      switch (noteOrder) {
        case "newest":
          data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          break;
        case "oldest":
          data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
          break;
        default:
          break;
      }

      setallNotesData((prevData) => ({ ...prevData, [folderId]: data }));
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const addANoteAndRefreshOnscreenNotes = async (
    folderId,
    noteTitle,
    noteContent,
    noteOrder
  ) => {
    try {
      const objectWithData = {
        folder_id: folderId,
        note_content: noteContent,
        note_title: noteTitle,
      };

      const response = await addNote(objectWithData);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // No need to parse the response here as we'll fetch all notes again
      await fetchAllNotes(folderId, noteOrder); // Using fetchAllNotes to refresh the notes
    } catch (error) {
      console.error("Error adding a note:", error);
    }
  };

  const editANoteAndRefreshOnscreenNotes = async (
    folderId,
    noteId,
    noteTitle,
    noteContent,
    noteOrder
  ) => {
    try {
      const objectWithData = {
        note_id: noteId,
        note_content: noteContent,
        note_title: noteTitle,
      };

      const response = await updateNote(objectWithData);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // No need to parse the response here as we'll fetch all notes again
      await fetchAllNotes(folderId, noteOrder); // Using fetchAllNotes to refresh the notes
    } catch (error) {
      console.error("Error updating a note:", error);
    }
  };

  // The value that will be supplied to any descendants of this provider
  const contextValue = {
    allNotesData,
    fetchAllNotes,
    setallNotesData,
    addANoteAndRefreshOnscreenNotes,
    editANoteAndRefreshOnscreenNotes,
  };

  return (
    <AllNotesContext.Provider value={contextValue}>
      {children}
    </AllNotesContext.Provider>
  );
};

// Custom hook to use the NotesContext
export const useAllNotes = () => {
  const context = useContext(AllNotesContext);
  if (!context) {
    throw new Error("useAllNotes must be used within a AllNotesProvider");
  }
  return context;
};
