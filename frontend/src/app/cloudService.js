import { Account, Storage, Client, ID } from "appwrite";
import conf from "../conf/conf.js";

class Cloud {
  storage;
  client = new Client();
  constructor() {
    this.client
      .setEndpoint(conf.apiEndpoint)
      .setProject(conf.project_id);

    this.storage = new Storage(this.client);
  }

  async uploadFile(file) {
    try {
      const fileId = await this.storage.createFile(
        conf.storage_id,
        ID.unique,
        file
      )
      return fileId;
    } catch (error) {
      console.log("upload file error: ", error.message);
    }
  }

  async getFilePreview(fileId) {
    try {
      const preview = await this.storage.getFilePreview(
        conf.storage_id,
        fileId
      )
      return preview ? preview.href : false;
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.storage.deleteFile(
        conf.storage_id,
        fileId
      )
    } catch (error) {
      console.log("delete file error: ", error.message);
    }
  }
}

const cloudService = new Cloud();
export default cloudService;