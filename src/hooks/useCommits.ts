import { useState, useEffect } from "react";
import type { Commit } from "@/types/commit";

export default function useCommits(disabled = false) {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchCommits() {
      if (disabled) return;

      setLoading(true);
      setError(false);

      try {
        const response = await fetch("/api/commits");
        const data: Commit[] = await response.json();
        setCommits(data);
      } catch (error) {
        console.error(
          "Couldn't fetch commits. You likely forgot to setup the API endpoints. Original error:\n",
          String(error),
        );
      }

      setLoading(true);
    }

    fetchCommits();
  }, [disabled]);

  return { commits, loading, error };
}
