let storedLuaCode = "print('wsp')";

export default function handler(req, res) {
  if (req.method === "GET") {
    res.setHeader("Content-Type", "text/plain");
    res.status(200).send(storedLuaCode);
  } 
  else if (req.method === "POST") {
    const parsed = req.body;
    if (parsed && typeof parsed.lua === "string") {
      storedLuaCode = parsed.lua;
      res.status(200).send("Updated successfully");
    } else {
      res.status(400).send("Invalid JSON (expected { lua: \"code\" })");
    }
  } else {
    res.status(405).send("Method not allowed");
  }
}
