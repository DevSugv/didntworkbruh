import fs from "fs";
import path from "path";

const filePath = path.resolve("./code.json");

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
      res.setHeader("Content-Type", "text/plain");
      res.status(200).send(data.lua);
    } else if (req.method === "POST") {
      const parsed = req.body;

      if (parsed && typeof parsed.lua === "string") {
        fs.writeFileSync(filePath, JSON.stringify({ lua: parsed.lua }, null, 2));
        res.status(200).send("Updated successfully");
      } else {
        res.status(400).send("Invalid JSON (expected { lua: \"code\" })");
      }
    } else {
      res.status(405).send("Method not allowed");
    }
  } catch (err) {
    console.error("Handler error:", err);
    res.status(500).send("Internal server error");
  }
}
