"use client";

import React from "react";
import FolderTitle from "@/components/Navigation/FolderTitle";
import SignInGoogle from "@/components/Navigation/SignInGoogle";
import FolderCard from "@/components/Cards/FolderCard";
import { NotesProvider } from "@/context/NotesContext";
import { useOverlay } from "@/context/OverlayContext";
import NewFolderButton from "@/components/Drawer/EditFolder/NewFolderButton";
import { useFolders } from "@/context/FolderContext";
import { useAuthContext } from "@/context/AuthContext";

export default function Folders() {
  const { overlay } = useOverlay();
  const { isAuthenticated } = useAuthContext();

  const { folders } = useFolders();

  if (!isAuthenticated) {
    return <SignInGoogle />;
  }
  // If there's a session, render the folder titles
  return (
    <>
      {overlay}
      <NewFolderButton />
      <div className="flex flex-col items-center overflow-hidden">
        <div className="p-5 w-full max-w-3xl flex flex-col gap-8">
          <FolderTitle
            headerText={"Folders"}
            crumbNameAndLinkArray={undefined}
            showUserIcon={true}
          />
          <NotesProvider>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-y-6 gap-x-10 mb-20 md:mb-0">
              {folders.map((folder) => {
                return (
                  <FolderCard
                    key={folder.folder_id}
                    folderId={folder.folder_id}
                    folderName={folder.folder_name}
                  />
                );
              })}
            </div>
          </NotesProvider>
        </div>
      </div>
    </>
  );
}
