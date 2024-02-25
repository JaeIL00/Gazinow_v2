/// <reference types="vite/client" />

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

  interface ImportMetaEnv {
    // 백엔드 URL
    readonly VITE_BACKEND_URL: string;
  }
}
