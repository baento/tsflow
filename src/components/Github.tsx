import Link from "@docusaurus/Link";
import clsx from "clsx";
import React, { useEffect, useState, useCallback } from "react";
import { GithubIcon } from "../icons/GithubIcon";
import { SpinnerIcon } from "../icons/SpinnerIcon";

export default function Github() {
  const [loading, setLoading] = useState(true);
  const [starCount, setStarCount] = useState(0);

  const getGithubStars = useCallback(async () => {
    try {
      setLoading(true);

      const response = await fetch("https://api.github.com/repos/baento/tsflow");
      const json = await response.json();

      setStarCount(json.stargazers_count);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getGithubStars();
  }, [getGithubStars]);

  return (
    <Link to={"https://github.com/baento/tsflow"} className={"navbar__item navbar__link flex items-center gap-2"}>
      {loading ? <SpinnerIcon className={clsx("w-5 h-5")} /> : `${starCount}`}
      <GithubIcon />
    </Link>
  );
}
