import mysql, { FieldPacket, RowDataPacket } from "mysql2/promise";

const newDig = {
  host: process.env.DB_ND_DATA_HOST,
  port: Number(process.env.DB_ND_DATA_PORT),
  user: process.env.DB_ND_DATA_LOGIN,
  password: process.env.DB_ND_DATA_PASS,
};


const MySQLConNewD = async () => {
  //**  create the connection NEW Digital */
  return mysql.createConnection(newDig).then((connect) => {
    return connect;
  });
}


export const MySQLqueryToDatabase = async (query: string, ) => {
  const connect: mysql.Connection = await MySQLConNewD();

  return connect.query<RowDataPacket[]>(`USE ${process.env.DB_ND_DB_NAME}`).then(([rows, fields]: [rows: RowDataPacket[], fields: FieldPacket[]]) => {
    return connect.query<RowDataPacket[]>(query).then(([rows, fields]: [rows: RowDataPacket[], fields: FieldPacket[]]) => {
      connect.end();
      const plain = JSON.stringify({ rows, fields });
      return (plain);
    }).finally(() => {
      connect.end();
    });
  });
};
