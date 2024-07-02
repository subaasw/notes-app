import React from "react";

import {
  FolderNoteBottom,
  FolderNoteCornerBottomLeft,
  FolderNoteCornerBottomRight,
  FolderNoteCornerTopLeft,
  FolderNoteFoldSmall,
  FolderNoteLeft,
  FolderNoteRight,
  FolderNoteTop,
} from "@/components/Icons/Notes";

const FolderNoteBackground = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "25px auto 25px",
        gridTemplateRows: "25px auto 25px",
        alignItems: "stretch",
        justifyItems: "stretch",
        width: "100%", // or any specific width
        height: "100%", // or any specific height
      }}
      className="absolute left-0 top-0 bottom-0 right-0 z-[-1] no-drag bg-Brand-White rounded-2xl rounded-tr-[2.5rem]"
    >
      {/* Corners */}
      <FolderNoteCornerTopLeft />
      <FolderNoteFoldSmall />
      <FolderNoteCornerBottomLeft />
      <FolderNoteCornerBottomRight />

      {/* Edges */}
      <FolderNoteTop />
      <FolderNoteBottom />
      <FolderNoteLeft />
      <FolderNoteRight />

      {/* Center */}
      <div
        style={{
          gridArea: "2 / 2 / 3 / 3",
          backgroundColor: "rgb(var(--Brand-White))",
        }}
      />
    </div>
  );
};

export default FolderNoteBackground;
