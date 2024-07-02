import { useState } from "react";
import { useOverlay } from "@/context/OverlayContext";
import SmoothButton from "../../SmoothButton/SmoothButton";
import TextInput from "../../TextInput";
import Drawer from "../Drawer";
import SmoothButtonBlack from "../../SmoothButton/SmoothButtonBlack";
import FolderOptionsContents from "../FolderOptionsContents";
import { useFolders } from "@/context/FolderContext";
import FolderIcon from "../../Icons/FolderIcon";

export default function EditFolderTitle({
  folderId,
  folderName = "",
  variant = "new-folder",
}) {
  const { setIsOn, setOverlay } = useOverlay();
  const {
    addAFolderAndRefreshOnscreenFolders,
    editAFolderAndRefreshOnscreenFolders,
  } = useFolders();
  //text states

  const [name, setName] = useState(folderName);

  const saveFunctionVariant = {
    "new-folder": () => {
      addAFolderAndRefreshOnscreenFolders(name);
      setIsOn(false);
    },
    "edit-folder": () => {
      editAFolderAndRefreshOnscreenFolders(folderId, name);
      setIsOn(false);
    },
  };

  const actionButtonTextVariant = {
    "new-folder": "Create",
    "edit-folder": "Update",
  };

  const cancelFunctionVariant = {
    "new-folder": () => {
      setIsOn(false);
    },
    "edit-folder": () => {
      setOverlay(
        <Drawer>
          <FolderOptionsContents
            folderId={folderId}
            folderName={folderName}
          />
        </Drawer>
      );
    },
  };

  return (
    <div className="flex flex-col gap-8 mt-6">
      <div className="flex flex-col items-center gap-5">
        <FolderIcon />
        <div className="font-header text-32 leading-none">
          <TextInput
            text={name}
            setText={setName}
            placeholder={"Write folder name"}
            fullWidth={false}
            wideTracking={true}
            textCenter={true}
            autoFocus={true}
          />
        </div>
      </div>

      <div className="flex gap-2.5">
        <SmoothButton
          text="Cancel"
          functionToRun={cancelFunctionVariant[variant]}
        />

        {name.length > 0 ? (
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
