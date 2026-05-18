"use client";

import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";

const theme: { light: string[]; dark: string[] } = {
  light: ["#e8e6dc", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  dark: ["#3d3d3a", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

function readScheme(): "light" | "dark" {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function GitHubContributionGraph({ username }: { username: string }) {
  const [scheme, setScheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setScheme(readScheme());
    const observer = new MutationObserver(() => setScheme(readScheme()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="my-8 overflow-x-auto">
      <GitHubCalendar
        username={username}
        colorScheme={scheme}
        theme={theme}
        blockSize={11}
        blockMargin={3}
        fontSize={12}
        labels={{
          totalCount: "{{count}} commits in {{year}}",
        }}
      />
    </div>
  );
}
