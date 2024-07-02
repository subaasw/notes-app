import React, { useEffect, useState } from "react";
import Breadcrumbs from "./Breadcrumbs";
import UserProfile from "../Drawer/UserProfile";
import { ThemeButton } from "../ThemeButton";
import NewFolderDesktopButton from "../Drawer/EditFolder/NewFolderDesktopButton";
import { getUserSession } from "@/utils/userAuth";

export default function FolderTitle({
  crumbNameAndLinkArray,
  headerText,
  showUserIcon = false,
}) {
  const [sessionInfo, setSessionInfo] = useState({
    firstname: "",
    name: "",
    email: "",
    image: "",
  });

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await getUserSession();

      const user = session.user;

      if (session.access_token) {
        const fullName = user.user_metadata.full_name || "";
        const firstName = fullName.split(" ")[0];
        setSessionInfo({
          firstname: firstName,
          name: fullName,
          email: user.email || "",
          image: user.user_metadata.avatar_url || "",
        });
      } else {
        console.warn("No session found");
      }
    };
    fetchSession();
  }, []);

  return (
    <div className="flex flex-col gap-3 no-drag-mobile w-full ">
      {crumbNameAndLinkArray ? (
        <Breadcrumbs crumbNameAndLinkArray={crumbNameAndLinkArray} />
      ) : (
        <div className="text-16 opacity-0" style={{ userSelect: "none" }}>
          empty
        </div>
      )}
      <div className="flex justify-between items-end">
        <h1 className="font-header text-44 tracking-wide font-400 leading-none">
          {headerText}
        </h1>
        {showUserIcon && (
          <div className="flex gap-1.5 items-center">
            <UserProfile
              firstname={sessionInfo.firstname}
              name={sessionInfo.name}
              image={sessionInfo.image}
              email={sessionInfo.email}
            />
            <ThemeButton />

            <NewFolderDesktopButton />
          </div>
        )}
      </div>
    </div>
  );
}
