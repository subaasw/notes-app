"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuthContext } from "./AuthContext";
import {
  addFolder,
  getFolders,
  removeFolder,
  updateFolder,
} from "@/utils/actions/folders";

const FolderContext = createContext();

export const useFolders = () => useContext(FolderContext);

export const FolderProvider = ({ children }) => {
  const [folders, setFolders] = useState([]);
  const { isAuthenticated, userData } = useAuthContext();
  const [foldersFetched, setFoldersFetched] = useState(false);

  const fetchFolders = async () => {
    if (isAuthenticated && !foldersFetched) {
      try {
        const response = await getFolders();

        if (!response.ok) {
          console.warn("Warn: Network response was not ok");
        }
        const data = await response.json();

        // Sort folders by folder_id
        if (data) {
          data.sort((a, b) => a.folder_id - b.folder_id);
          setFolders(data);
        }
        setFoldersFetched(true);
      } catch (error) {
        console.error("Failed to fetch folders:", error);
      }
    }
  };

  const addAFolderAndRefreshOnscreenFolders = async (folderName) => {
    try {
      const response = await addFolder({
        folder_name: folderName,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Update folders with the new set of folders
      setFolders(data.folders);
    } catch (error) {
      console.error("Error adding a folder:", error);
    }
  };

  const editAFolderAndRefreshOnscreenFolders = async (folderId, folderName) => {
    try {
      const objectWithData = {
        folder_id: folderId,
        folder_name: folderName,
      };

      const response = await updateFolder(objectWithData);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Update folders with the edited folder data
      setFolders((prevFolders) =>
        prevFolders.map((folder) =>
          folder.folder_id === folderId
            ? { ...folder, folder_name: data?.folder?.folder_name }
            : folder
        )
      );
    } catch (error) {
      console.error("Error updating a folder:", error);
    }
  };

  const deleteAFolder = async (folderId) => {
    try {
      await removeFolder(folderId);
      // Filter out the deleted folder from the current state
      const updatedFolders = folders.filter(
        (folder) => folder.folder_id !== folderId
      );
      setFolders(updatedFolders);
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };

  // Use useEffect to fetch folders when the component mounts
  useEffect(() => {
    fetchFolders();
  }, []);

  return (
    <FolderContext.Provider
      value={{
        folders,
        setFolders,
        addAFolderAndRefreshOnscreenFolders,
        editAFolderAndRefreshOnscreenFolders,
        deleteAFolder,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
};
