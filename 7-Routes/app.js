import express from 'express';

const app = express();
const PORT = 8080;

/**
 * GET /odin/messages will have this log
 * { username: "odin" }
 * GET /theodinproject79687378/messages would instead log
 * { username: "theodinproject79687378" }
 */
app.get("/:username/messages", (req, res) => {
  console.log(req.params);
  res.end();
});

/**
 * GET /odin/messages/79687378 will have this log
 * { username: "odin", messageId: "79687378" }
 */
app.get("/:username/messages/:messageId", (req, res) => {
  console.log(req.params);
  res.end();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});