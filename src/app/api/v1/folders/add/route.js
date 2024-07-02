import serverResponse from "@/utils/actions/nextServerResponse";
import { getServerSession } from "@/utils/supabase/server";
import { TodoFolders } from "@/utils/supabase/db/dbQuery";

export const dynamic = "force-dynamic";

// Helper function to create a delay
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchFolders(userId) {
  const folderQuery = new TodoFolders();
  const { data: result } = await folderQuery.select({
    where: {
      name: "user_id",
      value: userId,
    },
  });

  return result;
}

export async function POST(request) {
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
    const data = await request.json();
    const userId = session.user.id;

    await folderQuery.insert(data.folder_name, userId);

    // Fetch folders with retry logic
    const result = await fetchFolders(userId);

    return serverResponse(
      {
        message: "Folder successfully created",
        folders: result,
      },
      {
        status: 201,
      }
    );
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
