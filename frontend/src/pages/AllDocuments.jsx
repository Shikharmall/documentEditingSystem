import React, { useEffect, useState } from "react";
import Header from "../partials/Header";
import DocumentsList from "../components/DocumentsList";
import { getAllDocumentDetailsAPI } from "../Api/DocumentAPI/DocumentAPI";

export default function AllDocuments() {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState("");

  const alldocumentFunc = () => {
    setLoader(true);
    try {
      getAllDocumentDetailsAPI().then((res) => {
        if (res.status === 200) {
          setLoader(false);

          setData(res?.data?.data);
        } else {
          console.log("error");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    alldocumentFunc();
  }, []);
  return (
    <>
      <Header />
      <DocumentsList data={data} />
    </>
  );
}
