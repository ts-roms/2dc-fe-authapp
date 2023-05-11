/// <reference types="vite/client" />
interface ImportMetaEnv {
  VITE_BACKEND_URL: string;
  // Add more variables as needed
}

declare module 'vite/env' {
  export const importMetaEnv: ImportMetaEnv;
}