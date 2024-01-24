import React, { useEffect, useState } from "react";
import TextEditorContent from "../components/TextEditorContent";
import DocumentHeader from "../partials/DocumentHeader";
import { getDocumentAPI, getDocumentAssignAPI } from "../Api/DocumentAPI/DocumentAPI";
import { useParams } from "react-router-dom";

export default function NewDocument() {
  const { document_id } = useParams();
  const [data, setData] = useState("");
  const [documentid, setDocumentid] = useState("");

  const getDocumentFunc = (document_id) => {
    try {
      getDocumentAPI(document_id).then((res) => {
        if (res.status === 200) {
          setData(res?.data?.data?.content);
        } else {
          console.log("error");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const recall = () =>{
    getDocumentFunc(documentid);
  }

  useEffect(() => {
    if (document_id) {
      getDocumentFunc(document_id);
      setDocumentid(document_id);
    }
  }, [document_id]);
  return (
    <>
      <DocumentHeader />
      <TextEditorContent assignedData={data} recall={recall}/>
    </>
  );
}
