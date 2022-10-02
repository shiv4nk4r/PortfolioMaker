import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import HeaderComponent from "../components/HeaderComponent";
import React, { useState, useEffect } from "react";
import { fetchHeaderItems } from "../supabaseProvider/SupabaseClient";

export default function Home() {
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
    </React.Fragment>
  );
}
