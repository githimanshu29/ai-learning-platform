// import { drizzle } from 'drizzle-orm/neon-http';
// export const db = drizzle(process.env.DATABASE_URL);

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const pg = neon(process.env.DATABASE_URL);//neon() initializes a connection to your database using a connection string.The pg variable now contains a client object that you can use to make queries using the Neon HTTP interface.




 const db = drizzle({ client: pg });//client: pg passes the Neon HTTP client we just created to Drizzle ORM so it knows how to connect and send queries.It’s your toolkit to access and manipulate your database, with methods like:db.select(), db.insert(), db.update(), and db.delete().




 export default db;


