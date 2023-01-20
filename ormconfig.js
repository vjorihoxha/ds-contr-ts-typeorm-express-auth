module.exports = {
	type: 'mysql',
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	synchronize: false,
	logging: false,
	entities: ['src/orm/entities/*.ts'],
	migrations: ['src/orm/migrations/*.ts'],
	cli: {
		entitiesDir: 'src/orm/entities',
		migrationsDir: 'src/orm/migrations',
		subscribersDir: 'src/orm/subscriber',
	},
};
