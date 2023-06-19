import { Pool } from "pg";

let conn: any;

if (!conn) {
        conn = new Pool({
        user: 'username',
        password: 'password',
        host: '127.0.0.1',
        port: 5432,
        database: 'DB2',
    });
}

export default conn;