// Import importaant files
import app from "./app.js";
import mongoConnection from "./config/db.js";

// Server Port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  mongoConnection();
  console.log(`Server is running in port ${port}`.bgMagenta.black);
});
