"use client";

import React, { useEffect, useState } from "react";
import { getFolders } from "@/utils/actions/folders";
import { useOverlay } from "@/context/OverlayContext";
import { useAllNotes } from "@/context/AllNotesContext";
import { addNote, removeNote } from "@/utils/actions/notes";

import Drawer from "./Drawer";
import SmoothButton from "../SmoothButton/SmoothButton";
import NoteOptionsContents from "./NoteOptionsContents";
import SmoothButtonBlack from "../SmoothButton/SmoothButtonBlack";
import ChooseFolderOption from "./ChooseFolderOption";

export default function MoveNoteContents({
  noteId,
  folderId,
  noteTitle,
  noteContent,
  lastSaved,
}) {
  const { setOverlay, setIsOn } = useOverlay();
  const [chosenFolder, setChosenFolder] = useState(null);

  const [folders, setFolders] = useState([]);
  const [foldersFetched, setFoldersFetched] = useState(false);
  const { allNotesData, setallNotesData } = useAllNotes();

  // Function to fetch notes
  const addANote = async (folderId, noteContent, noteTitle) => {
    const objectWithData = {
      folder_id: folderId,
      note_content: noteContent,
      note_title: noteTitle,
    };

    await addNote(objectWithData);
  };

  // Function to fetch notes
  const deleteANote = async (noteId) => {
    try {
      await removeNote(noteId);
      const firstKey = Object.keys(allNotesData)[0];
      const arrayNotes = allNotesData[firstKey];

      const newNotesObj = {
        [firstKey]: arrayNotes.filter((curNote) => noteId !== curNote.id),
      };

      setallNotesData(newNotesObj);
      setIsOn(false);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    async function fetchFolders() {
      try {
        const response = await getFolders();
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const folderData = await response.json();
        setFolders(folderData);
        setFoldersFetched(true);
      } catch (error) {
        console.error("Failed to fetch folders:", error.message);
      }
    }

    fetchFolders();
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <span className="text-32 font-header font-400">Move this note:</span>
        <div className="flex flex-col gap-3">
          {folders.map((folder) => {
            return (
              folderId !== folder.folder_id && (
                <ChooseFolderOption
                  key={folder.folder_id}
                  text={folder.folder_name}
                  folderId={folder.folder_id}
                  chosenFolder={chosenFolder}
                  setChosenFolder={setChosenFolder}
                />
              )
            );
          })}
        </div>
      </div>
      <div className="flex gap-2.5">
        <SmoothButton
          text="Cancel"
          functionToRun={() => {
            setOverlay(
              <Drawer>
                <NoteOptionsContents
                  noteId={noteId}
                  folderId={folderId}
                  noteTitle={noteTitle}
                  noteContent={noteContent}
                  lastSaved={lastSaved}
                />
              </Drawer>
            );
          }}
        />
        {chosenFolder ? (
          <SmoothButtonBlack
            text="Move"
            functionToRun={() => {
              addANote(chosenFolder, noteContent, noteTitle);
              deleteANote(noteId);
            }}
          />
        ) : (
          <div className="opacity-25 w-full">
            <SmoothButtonBlack text="Move" disabled={true} />
          </div>
        )}
      </div>
    </div>
  );
}
