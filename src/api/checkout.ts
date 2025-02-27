import { exec } from "child_process";
import { promisify } from "util";
import { NextApiRequest, NextApiResponse } from "next";

const execAsync = promisify(exec);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { commitHash } = req.query;
  if (!commitHash)
    return res.status(400).json({ error: "Commit hash is required" });

  try {
    // Stash any changes before switching commits
    await execAsync("git stash");
    await execAsync(`git checkout ${commitHash}`);
    await execAsync("npm install");
    await execAsync("npm run dev -- --port 4000");

    res.json({ url: "http://localhost:4000" });
  } catch (error) {
    await execAsync("git checkout main");
    await execAsync("git stash pop");
    res.status(500).json({ error: "Failed to switch commit" });
  }
}
