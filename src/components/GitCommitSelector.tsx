import React, { useState, useEffect } from "react";
import type { Commit } from "../types";

const GitCommitSelector: React.FC = () => {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/commits")
      .then((res) => res.json())
      .then((data: Commit[]) => setCommits(data))
      .catch(console.error);
  }, []);

  const handleCommitSelect = async (hash: string) => {
    setLoading(true);
    const response = await fetch(`/api/checkout?commitHash=${hash}`);
    const data: { url?: string } = await response.json();

    if (data.url) {
      window.open(data.url, "_blank");
    }

    setLoading(false);
  };

  return (
    <div className="fixed bottom-5 right-5 bg-white p-3 shadow-lg rounded-lg">
      <button
        className="bg-gray-800 text-white px-4 py-2 rounded"
        onClick={() => setLoading((prev) => !prev)}
      >
        {loading ? "Close" : "View Commits"}
      </button>

      {loading && (
        <ul className="mt-2 max-h-60 overflow-y-auto bg-white border rounded-lg shadow-md">
          {commits.map(({ hash, message }) => (
            <li
              key={hash}
              className="cursor-pointer hover:bg-gray-200 p-2"
              onClick={() => handleCommitSelect(hash)}
            >
              <strong>{hash}</strong>: {message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GitCommitSelector;
