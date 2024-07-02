import { useEffect, useRef, useState } from "react";
import NoteCard from "@/components/Cards/NoteCard/NoteCard";
import SmoothButton from "../SmoothButton/SmoothButton";
import { useOverlay } from "@/context/OverlayContext";
import Drawer from "./Drawer";
import NoteOptionsContents from "./NoteOptionsContents";
import ShareOption from "./ShareOption";
import { motion } from "framer-motion";
import SaveIcon from "../Icons/SaveIcon";
import CopyIcon from "../Icons/CopyIcon";
import MailIcon from "../Icons/MailIcon";
import WhatsAppIcon from "../Icons/WhatsAppIcon";
import XcomIcon from "../Icons/XcomIcon";
import FacebookIcon from "../Icons/FacebookIcon";

export default function ShareNoteContents({
  noteId,
  folderId,
  noteTitle,
  noteContent,
  lastSaved,
}) {
  const { setOverlay } = useOverlay();

  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [constraints, setConstraints] = useState(0);

  useEffect(() => {
    const containerWidth = containerRef.current.offsetWidth;
    const contentWidth = contentRef.current.offsetWidth;

    // Calculate the maximum drag distance
    const maxDrag = contentWidth - containerWidth;
    setConstraints(-maxDrag);
  }, []);

  // Function to save note as a .txt file
  const saveAsTxt = () => {
    const element = document.createElement("a");
    const file = new Blob([noteTitle + "\n\n" + noteContent], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = `${noteTitle}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Function to copy note content to clipboard
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(noteTitle + "\n\n" + noteContent)
      .then(() => console.info("Text copied to clipboard"))
      .catch((err) => console.error("Could not copy text: ", err));
  };

  // Function to open email client with note content
  const openEmail = () => {
    const subject = encodeURIComponent(noteTitle);
    const body = encodeURIComponent(noteContent);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  // Function to share on Twitter
  const shareOnTwitter = () => {
    const tweet = encodeURIComponent(
      `Check out my note: ${noteTitle} - ${noteContent}`
    );
    window.open(`https://twitter.com/intent/tweet?text=${tweet}`);
  };

  // Function to share on Facebook
  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        document.location.href
      )}`
    );
  };

  // Function to share on WhatsApp
  const shareOnWhatsApp = () => {
    const message = `Check out my note: ${noteTitle} - ${noteContent}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl);
  };

  // Share options with corresponding functions
  const shareOptions = [
    {
      text: "Save",
      IconComponent: SaveIcon, // Component for Save Icon
      functionToRun: saveAsTxt,
    },
    {
      text: "Copy",
      IconComponent: CopyIcon, // Component for Copy Icon
      functionToRun: copyToClipboard,
    },
    {
      text: "Email",
      IconComponent: MailIcon, // Component for Email Icon
      functionToRun: openEmail,
    },
    {
      text: "WhatsApp",
      IconComponent: WhatsAppIcon, // Component for WhatsApp Icon
      functionToRun: shareOnWhatsApp,
    },
    {
      text: "X.com",
      IconComponent: XcomIcon, // Component for X.com (Twitter) Icon
      functionToRun: shareOnTwitter,
    },
    {
      text: "Facebook",
      IconComponent: FacebookIcon, // Component for Facebook Icon
      functionToRun: shareOnFacebook,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="relative z-[1]">
        <NoteCard
          noteId={noteId}
          folderId={folderId}
          noteTitle={noteTitle}
          noteContent={noteContent}
          lastSaved={lastSaved}
          variant="share-view"
        />
      </div>
      <div className="flex flex-col gap-3 ">
        <span className="text-32 font-header font-400">Share this note:</span>
        <motion.div
          drag="x"
          dragConstraints={{ left: constraints, right: 0 }}
          className="w-full flex"
          ref={containerRef}
        >
          <div className="inline-flex gap-4 flex-shrink-0" ref={contentRef}>
            {shareOptions.map((option, index) => (
              <ShareOption
                key={index}
                text={option.text}
                IconComponent={option.IconComponent} // Pass the component
                functionToRun={option.functionToRun}
              />
            ))}
          </div>
        </motion.div>
      </div>
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
    </div>
  );
}
