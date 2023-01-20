import { Connection, createConnection } from 'typeorm';

export const dbCreateConnection = async (): Promise<Connection | null> => {
	try {
		const conn = await createConnection();
		console.log(
			`Database connection success. Connection name: '${conn.name}' Database: '${conn.options.database}'`,
		);
	} catch (err) {
		console.log(err.message);
	}
	return null;
};
