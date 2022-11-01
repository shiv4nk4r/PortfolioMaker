import React from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Terminal from "../Themes/Terminal/terminal";

function Portfolio() {
  const router = useRouter();
  const { userName } = router.query;

  useEffect(() => {
    console.log(router.query);
  }, []);

  return (
    <div>
      {userName === "shiv4nk4r" ? (
        <Terminal userName={userName} />
      ) : (
        <>Not Found</>
      )}
    </div>
  );
}

export default Portfolio;
