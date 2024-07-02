import { getServerSession } from "@/utils/supabase/server";
import serverResponse from "@/utils/actions/nextServerResponse";
import insertDemoData from "@/utils/insertDemoData";
import { TodoFolders } from "@/utils/supabase/db/dbQuery";

export const dynamic = "force-dynamic";

const fetchFolders = async (userId) => {
  const folderQuery = new TodoFolders();

  const { data: dbFolders } = await folderQuery.select({
    where: {
      name: "user_id",
      value: userId,
    },
  });

  return dbFolders;
};

export async function GET(request) {
  // Get the session
  const {
    data: { session },
  } = await getServerSession();

  // Check if the user is authenticated
  if (!session?.access_token) {
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
    const userId = session.user.id;
    let folders = await fetchFolders(userId);

    if (Array.isArray(folders) && !folders.length) {
      await insertDemoData();
      folders = await fetchFolders(userId);
    }

    return serverResponse(folders);
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
