import AuthenticationWrapper from "../components/Auth/AuthenticationWrapper";
import HeaderComponent from "../components/HeaderComponent";
import React, { useState, useEffect } from "react";
import { fetchHeaderItems } from "../supabaseProvider/SupabaseClient";
import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  flexMiddle: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function authenticate() {
  const { classes } = useStyles();
  // State to store the header items
  const [headerLinks, setHeaderLinks] = useState([
    { label: "Stage", link: "/stage" },
  ]);

  /**
   * Function to fetch the header items from supabase
   */
  const fetchNavBar = async () => {
    let data = await fetchHeaderItems();
    setHeaderLinks(data);
  };

  useEffect(() => {
    fetchNavBar();
  }, []);

  return (
    <React.Fragment>
      <HeaderComponent links={headerLinks} />
      <div className={classes.flexMiddle}>
        <AuthenticationWrapper />
      </div>
    </React.Fragment>
  );
}

export default authenticate;
