const env = import.meta.env;

const conf = {
  apiEndpoint: env.VITE_APPWRITE_API_ENDPOINT,
  project_id: env.VITE_APPWRITE_PROJECT_ID,
  storage_id: env.VITE_APPWRITE_STORAGE_ID,
}

export default conf;