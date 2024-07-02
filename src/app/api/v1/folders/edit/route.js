import serverResponse from "@/utils/actions/nextServerResponse";
import { getServerSession } from "@/utils/supabase/server";
import { TodoFolders } from "@/utils/supabase/db/dbQuery";

export const dynamic = "force-dynamic";

export async function POST(request) {
  const folderQuery = new TodoFolders();

  // Get the session
  const {
    data: { session },
  } = await getServerSession();
  const userId = session.user.id;

  // Check if the user is authenticated
  if (!session.access_token) {
    return serverResponse(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const data = await request.json();
    const folderId = data.folder_id;
    const folderName = data.folder_name;

    const { data: folderOwnerQuery } = await folderQuery.select({
      params: "user_id",
      where: {
        name: "folder_id",
        value: folderId,
      },
    });

    if (
      folderOwnerQuery.length === 0 ||
      folderOwnerQuery?.[0]?.user_id !== userId
    ) {
      return serverResponse(
        {
          error: "Unauthorized user attempted to edit folder",
        },
        {
          status: 403,
        }
      );
    }

    // Perform the update operation
    const { data: updatedFolder } = await folderQuery.edit({
      folder_id: folderId,
      data: {
        folder_name: folderName,
      },
    });

    return serverResponse({
      message: "Folder successfully updated",
      folder: updatedFolder[0],
    });
  } catch (error) {
    return serverResponse(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
