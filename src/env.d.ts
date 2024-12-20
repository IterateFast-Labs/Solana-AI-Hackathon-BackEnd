declare namespace NodeJS {
  interface ProcessEnv {
    // General Settings
    ENV: string;

    // Database Settings
    DATABASE_URL: string;

    // Cache Layer Settings
    REDIS_HOST: string;
    REDIS_PORT: string;

    // JWT Settings
    JWT_SECRET: string;
    JWT_EXPIRE_TIME: number;

    // S3 Settings
    CDN_HOST: string;
    S3_BUCKET_NAME: string;
    S3_ACCESS_KEY_ID: string;
    S3_SECRET_ACCESS_KEY: string;

    // RSA Settings
    ENCODED_PUBLIC_KEY: string;
    RAW_PUBLIC_KEY: string;
    RAW_PRIVATE_KEY: string;
  }
}
