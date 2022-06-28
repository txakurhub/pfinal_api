const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { PRODUCTION, PORT } = process.env;

conn.sync({ force: true }).then(() => {
  server.listen(PRODUCTION ? 3001 : PORT, () => {
    console.log("Servidor corriendo en el puerto 3001");
  });
});
