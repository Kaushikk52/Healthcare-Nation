/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_APP_ENV:string;
    readonly VITE_APP_BACKEND_BASE_URL: string;
    readonly VITE_APP_CLOUDINARY_HOSPITALS: string;
    readonly VITE_APP_CLOUDINARY_CLINICS: string;
  
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
