/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_API_KEY: string;
  VITE_BACKEND_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
