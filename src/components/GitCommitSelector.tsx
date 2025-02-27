"use client";

import { useState } from "react";
import { clsx } from "clsx";

import styles from "./styles.module.css";
import useCommits from "../hooks/useCommits";

export interface GitCommitSelectorProps {
  /** If `true`, the component will not fetch commits and will not be rendered.
   * @default true
   */
  disabled?: boolean;
}

const GitCommitSelector: React.FC<GitCommitSelectorProps> = ({
  disabled = false,
}) => {
  const { commits, loading, error } = useCommits(disabled);
  const [expanded, setExpanded] = useState(false);

  if (disabled) return null;

  const wrapperClasses = clsx(styles.wrapper, {
    [styles.withError]: error,
  });

  return (
    <div className={wrapperClasses}>
      <p className={styles.error}>{error}</p>
      <button className={styles.button}>
        {loading ? "Close" : "View Commits"}
      </button>
    </div>
  );
};

export default GitCommitSelector;
