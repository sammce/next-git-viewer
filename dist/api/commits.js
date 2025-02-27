import { exec } from "child_process";
import { promisify } from "util";
const execAsync = promisify(exec);
export default async function handler(req, res) {
    try {
        const { stdout } = await execAsync("git log --pretty=format:'%h %s' -n 10");
        const commits = stdout.split("\n").map((line) => {
            const [hash, ...messageParts] = line.split(" ");
            return { hash, message: messageParts.join(" ") };
        });
        res.json(commits);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch commits" });
    }
}
