declare namespace NodeJS {
	export interface ProcessEnv {
		SERVER_PORT: string;
		NODE_ENV: string;
		DB_HOST: string;
		DB_USERNAME: string;
		DB_PASSWORD: string;
		DB_DATABASE: string;
		DB_PORT: string;
		JWT_SECRET: string;
		JWT_EXPIRATION: string;
	}
}
