import React, { useState, useEffect } from "react";
import NoteCard from "./NoteCard/NoteCard";
import FolderBack from "../Icons/Folders/FolderBack";
import FolderFront from "../Icons/Folders/FolderFront";
import Link from "next/link";
import { useNotes } from "@/context/NotesContext"; // Adjust the import path as needed
import MoreOptionsDotsFolder from "../Icons/Folders/MoreOptionsDotsFolder";

const FolderCard = ({ folderId, folderName }) => {
  const { notesData, fetchNotes } = useNotes();
  const notes = notesData[folderId] || [];
  const filterNotes = Array.isArray(notes) ? notes.filter((_, index)=> index < 3) : notes;
  
  const [rotationAngles, setRotationAngles] = useState({});

  useEffect(() => {
    fetchNotes(folderId);
  }, []);

  useEffect(() => {
    // Initialize rotation angles for notes
    const newRotationAngles = {};
    if (Array.isArray(filterNotes)) {
      filterNotes.forEach((note) => {
        if (!rotationAngles[note.id]) {
          // Replace 'note.id' with a unique identifier for the note
          const minRotation = -7;
          const maxRotation = 7;
          newRotationAngles[note.id] =
            Math.random() * (maxRotation - minRotation) + minRotation;
        }
      });
    }

    setRotationAngles((prevAngles) => ({
      ...prevAngles,
      ...newRotationAngles,
    }));
  }, [notesData]);

  // Function to get the rotation for a note
  const getRotationForNote = (noteId) => {
    return `rotate(${rotationAngles[noteId]}deg)`; // Replace 'note.id' with the note's unique identifier
  };

  return (
    <Link href={"/folders/" + folderId}>
      <div className="brand-button-transition">
        <div className=" flex p-6 flex-col justify-end gap-1 relative h-folder-card ">
          <MoreOptionsDotsFolder
            folderId={folderId}
            folderName={folderName}
          />
          <FolderBack />
          <div className="px-14 flex absolute z-[-2] justify-between left-0 right-0 top-9 no-drag">
            {Array.isArray(filterNotes) &&
              filterNotes?.map((note, index) => (
                <div key={index} className="w-4/5 -mx-12 note-card-class">
                  <div style={{ transform: getRotationForNote(note.id) }}>
                    <NoteCard
                      noteId={note.id}
                      noteTitle={note.note_title}
                      noteContent={note.note_content}
                      lastSaved={note.created_at}
                      variant={"folder-view"}
                      folderId={note.folder_id}
                    />
                  </div>
                </div>
              ))}
          </div>

          <FolderFront />
          <span className="relative z-0 font-header text-32 font-400 leading-none mr-6">
            {folderName}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default FolderCard;
