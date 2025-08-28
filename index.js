require("dotenv").config();
const express = require("express");
const app = express();
const { PORT, MONGO_URL } = require("./config");
const { default: mongoose } = require("mongoose");
const { authRouter } = require("./routes/auth");
const port = PORT || 3000;

app.use(express.json());
app.use("/auth", authRouter);

async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  } catch (e) {
    console.log("Could not connect to DB");
    process.exit(1);
  }
}
main();
