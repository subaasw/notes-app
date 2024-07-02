import { useState, useContext } from "react";
import { useOverlay } from "@/context/OverlayContext";
import SmoothButton from "../../SmoothButton/SmoothButton";
import TextInput from "../../TextInput";
import Drawer from "../Drawer";
import NoteOptionsContents from "../NoteOptionsContents";
import SmoothButtonBlack from "../../SmoothButton/SmoothButtonBlack";
import { useAllNotes } from "@/context/AllNotesContext";
import { NoteOrderContext } from "@/components/Templates/FolderPageMobile";

export default function EditNoteContents({
  noteId,
  folderId,
  noteTitle = "",
  noteContent = "",
  lastSaved,
  variant = "new-note",
}) {
  const { setIsOn, setOverlay } = useOverlay();
  const { noteOrder } = useContext(NoteOrderContext);
  const { addANoteAndRefreshOnscreenNotes, editANoteAndRefreshOnscreenNotes } =
    useAllNotes();

  const [title, setTitle] = useState(noteTitle);
  const [content, setContent] = useState(noteContent);

  const saveFunctionVariant = {
    "new-note": () => {
      addANoteAndRefreshOnscreenNotes(folderId, title, content, noteOrder);
      setIsOn(false);
    },
    "edit-note": () => {
      editANoteAndRefreshOnscreenNotes(
        folderId,
        noteId,
        title,
        content,
        noteOrder
      );
      setIsOn(false);
    },
    "direct-edit-note": () => {
      editANoteAndRefreshOnscreenNotes(
        folderId,
        noteId,
        title,
        content,
        noteOrder
      );
      setIsOn(false);
    },
  };

  const actionButtonTextVariant = {
    "new-note": "Create",
    "direct-edit-note": "Save",
    "edit-note": "Save",
  };

  const cancelFunctionVariant = {
    "new-note": () => {
      setIsOn(false);
    },
    "direct-edit-note": () => {
      setIsOn(false);
    },
    "edit-note": () => {
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
    },
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 ">
        <div className="w-full h-[60vh] md:h-[35vh] flex">
          <div className="flex flex-col gap-3 w-full">
            <div className="font-header text-32 leading-none">
              <TextInput
                text={title}
                setText={setTitle}
                placeholder={"Write your title"}
                wideTracking={true}
              />
            </div>
            <TextInput
              text={content}
              setText={setContent}
              placeholder={"Write your note"}
              overflowHidden={false}
              minimumHeight={"20rem"}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-2.5">
        <SmoothButton
          text="Cancel"
          functionToRun={cancelFunctionVariant[variant]}
        />

        {title.length > 0 && content.length > 0 ? (
          <SmoothButtonBlack
            text={actionButtonTextVariant[variant]}
            functionToRun={saveFunctionVariant[variant]}
          />
        ) : (
          <div className="opacity-25 w-full">
            <SmoothButtonBlack
              text={actionButtonTextVariant[variant]}
              disabled={true}
            />
          </div>
        )}
      </div>
    </div>
  );
}
