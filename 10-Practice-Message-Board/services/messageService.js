import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../data/messages.json");

export function getMessages() {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
}

export function addMessage(message) {
    const messages = getMessages();
    messages.push(message);
    fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));
}
