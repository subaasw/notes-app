import { getServerSession } from "@/utils/supabase/server";
import { TodoFolders } from "@/utils/supabase/db/dbQuery";
import serverResponse from "@/utils/actions/nextServerResponse";

export async function GET(request, { params }) {
  const folderId = params.folder_id;
  const folderQuery = new TodoFolders();
  
  // Get the session
  const {
    data: { session },
  } = await getServerSession();

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
    // Fetch folders
    const { data: dbFolders } = await folderQuery.select({
      where: {
        name: "folder_id",
        value: folderId,
      },
    });

    if (!dbFolders) {
      return serverResponse(
        {
          error: "No data found.",
        },
        {
          status: 404,
        }
      );
    }
    return serverResponse([...dbFolders]);
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
