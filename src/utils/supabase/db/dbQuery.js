import { createClient, getServerSession } from "@/utils/supabase/server";

const TABLE_FOLDERS = "folders";
const TABLE_NOTES = "notes";

export class TodoFolders {
  supabase = createClient();
  user = {};

  constructor() {
    this.query = this.supabase.from(TABLE_FOLDERS);

    this.setUser();
  }

  getUser() {
    return this.user;
  }

  async setUser() {
    const { data } = await getServerSession();
    this.user = data.session.user;
  }

  async select({ params = "", where = { name: "", value: "" }, userId = "" }) {
    if (where.name) {
      return await this.query.select(params).eq(where.name, where.value);
    }

    if (userId) {
      return await this.query.select(params).eq("user_id", userId);
    }

    return await this.query.select(params);
  }

  async insert(folder_name, userId = "") {
    const user_id = userId ? userId : this.user.id;

    return await this.query
      .insert({
        folder_name,
        user_id,
      })
      .select()
      .maybeSingle();
  }

  async remove(folder_id) {
    return await this.query.delete().eq("folder_id", folder_id);
  }

  async edit({ data = {}, folder_id }) {
    return await this.query.update(data).eq("folder_id", folder_id).select();
  }
}

export class TodoNotes {
  supabase = createClient();
  constructor() {
    this.query = this.supabase.from(TABLE_NOTES);
  }

  async fetch(selectParams = "*", where = { name: "", value: "" }) {
    const params = selectParams;

    if (where?.name) {
      return await this.query.select(params).eq(where.name, where.value);
    }

    return await this.query.select(params);
  }

  async insert(notes) {
    /**
     * @params array of
     * or single objects
     *
     * - note_title
     * - note_content
     * - folder_id
     */

    if (Array.isArray(notes)) {
      return await this.query.insert(notes).select();
    }

    return await this.query.insert(notes).select().maybeSingle();
  }

  async removeByFolderId(folderId) {
    return await this.query.delete().eq("folder_id", folderId).select();
  }

  async remove(noteId) {
    return await this.query.delete().eq("id", noteId).select();
  }

  async edit({ data = {}, folder_id }) {
    return await this.query.update(data).eq("folder_id", folder_id).select();
  }
}
