import connectDb from "./db/index.js";
import app from "./app.js";
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";

dotenv.config({ path: fileURLToPath(new URL("./.env", import.meta.url)) });

connectDb()
  .then(() => {
    const port = process.env.PORT || 400;
    app.listen(port, () => {
      console.log(`Server is running at port ${port}`);
    });
  })
  .catch((err) => {
    console.log("MONGODB connection Error: ", err);
  });
