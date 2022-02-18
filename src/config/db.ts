const mongoose = require("mongoose");
const mongoUrl = process.env["MONGO_URL"] || "mongodb://localhost:27017/taskDb";

mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("mongodb connected"))
  .catch((err: any) => console.log(err));

export default mongoose;
