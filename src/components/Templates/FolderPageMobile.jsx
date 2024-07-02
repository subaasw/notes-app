"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import NoteCard from "@/components/Cards/NoteCard/NoteCard";
import FolderTitle from "@/components/Navigation/FolderTitle";
import { useAllNotes } from "@/context/AllNotesContext"; // Adjust the import path as needed
import FilterBarMobile from "../Navigation/FilterBarMobile";
import { useOverlay } from "@/context/OverlayContext";
import NewNoteButton from "../Drawer/PostingContents/NewNoteButton";

export const UserSetNoteFormatContext = React.createContext();
export const AppSetNoteFormatContext = React.createContext();
export const NoteOrderContext = React.createContext();
export const ScrollingEnabledContext = React.createContext();

export default function FolderPageMobile({ folderId, folderName }) {
  const { allNotesData, fetchAllNotes } = useAllNotes(); // Use the custom hook
  const [userSetNoteFormat, setUserSetNoteFormat] = useState("writer");
  const [appSetNoteFormat, setAppSetNoteFormat] = useState("writer");
  const [noteOrder, setNoteOrder] = useState("newest");

  const { isOn, overlay } = useOverlay();

  const [scrollingEnabled, setScrollingEnabled] = useState(true);
  const notes = allNotesData[folderId] || []; // Get the notes for this folder
  const notesContainerDivRef = useRef(null);
  const targetElementRef = useRef(null);

  //define top bounds
  const remToPixels = (rem) =>
    rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
  const paddingForScrollAdjustment = remToPixels(8);

  //function to fetch notes
  useEffect(() => {
    fetchAllNotes(folderId, noteOrder);
  }, [folderId, noteOrder]);

  //scrolling function for note layout change
  useEffect(() => {
    if (notesContainerDivRef.current) {
      const existingNotes = notesContainerDivRef.current.children;
      for (const note of existingNotes) {
        const boundingBox = note.getBoundingClientRect();
        if (boundingBox.top >= paddingForScrollAdjustment) {
          targetElementRef.current = note;

          const initialTop =
            targetElementRef.current.getBoundingClientRect().top;

          setAppSetNoteFormat(userSetNoteFormat);

          // Delay before starting the smooth scroll
          const delayBeforeScroll = 300; // in milliseconds

          setTimeout(() => {
            const finalTop =
              targetElementRef.current.getBoundingClientRect().top;
            const scrollDistance = finalTop - initialTop;

            // Smooth scroll to the new position
            window.scrollTo({
              top: window.scrollY + scrollDistance,
              behavior: "smooth",
            });
          }, delayBeforeScroll);

          // Clean up function
          const cleanup = () => {
            console.log("Scrolling completed");
          };

          return cleanup;
        }
      }
    }
  }, [userSetNoteFormat]);

  //variant styles for wrapper
  const wrapperVariantStyles = {
    writer: "flex flex-col gap-8",
    simple: "flex flex-col gap-4",
    grid: "grid grid-cols-2 gap-4",
  };

  return (
    <ScrollingEnabledContext.Provider
      value={{ scrollingEnabled, setScrollingEnabled }}
    >
      <NoteOrderContext.Provider value={{ noteOrder, setNoteOrder }}>
        <AppSetNoteFormatContext.Provider
          value={{ appSetNoteFormat, setAppSetNoteFormat }}
        >
          <UserSetNoteFormatContext.Provider
            value={{ userSetNoteFormat, setUserSetNoteFormat }}
          >
            {overlay}
            <NewNoteButton folderId={folderId} />
            <div className="relative flex flex-col items-center ">
              <div className="px-5 pt-5 w-full max-w-3xl">
                <FolderTitle
                  crumbNameAndLinkArray={[
                    {
                      link: "/folders",
                      name: "Folders",
                    },
                    {
                      link: "/folders/" + folderId,
                      name: folderName,
                    },
                  ]}
                  headerText={folderName}
                />
              </div>

              <FilterBarMobile folderId={folderId} />

              <div
                className={
                  "max-w-3xl w-full px-5 pb-5 " +
                  wrapperVariantStyles[appSetNoteFormat]
                }
                ref={notesContainerDivRef}
              >
                {notes.map((note, index) => (
                  <NoteCard
                    key={index}
                    noteId={note.id}
                    folderId={note.folder_id}
                    noteTitle={note.note_title}
                    noteContent={note.note_content}
                    lastSaved={note.created_at}
                    variant={appSetNoteFormat}
                  />
                ))}
              </div>
            </div>
          </UserSetNoteFormatContext.Provider>
        </AppSetNoteFormatContext.Provider>
      </NoteOrderContext.Provider>
    </ScrollingEnabledContext.Provider>
  );
}
