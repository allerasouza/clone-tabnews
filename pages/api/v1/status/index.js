import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const databaseVersion = (await database.query("SHOW server_version;")).rows[0]
    .server_version;
  const databaseMaxConnections = parseInt(
    (await database.query("SHOW max_connections;")).rows[0].max_connections
  );

  // SQL INJECTION Example
  // const databaseOpenedConnections = (
  //   await database.query(
  //     `SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname= '${request.query.databaseName}';`
  //   )
  // ).rows[0].count;

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnections = (
    await database.query({
      text: "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname= $1;",
      values: [databaseName],
    })
  ).rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersion,
        max_connections: databaseMaxConnections,
        opened_connections: databaseOpenedConnections,
      },
    },
  });
}

export default status;
