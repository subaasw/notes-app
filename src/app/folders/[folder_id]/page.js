"use client";

import React, { useState, useEffect } from "react";
import { AllNotesProvider } from "@/context/AllNotesContext";
import { FOLDER_BASE_URL } from "@/constant/constant";
import FolderPageMobile from "@/components/Templates/FolderPageMobile";
import LoadingScreen from "@/components/Navigation/LoadingScreen";

export default function Folder({ params }) {
  const [folderName, setFolderName] = useState([]);
  const [folderFetched, setFolderFetched] = useState(false);

  useEffect(() => {
    async function fetchFolders() {
      try {
        const response = await fetch(FOLDER_BASE_URL + params.folder_id);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const folderData = await response.json();

        setFolderName(folderData?.[0].folder_name);
        setFolderFetched(true);
      } catch (error) {
        console.error("Failed to fetch folders:", error.message);
      }
    }

    fetchFolders();
  }, []);

  if (!folderFetched) {
    return <LoadingScreen />;
  }

  // If there's a session, render the folder titles
  return (
    <AllNotesProvider>
      <FolderPageMobile folderId={params.folder_id} folderName={folderName} />
    </AllNotesProvider>
  );
}
