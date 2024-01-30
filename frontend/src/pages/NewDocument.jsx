import React, { useEffect, useState } from "react";
import TextEditorContent from "../components/TextEditorContent";
import DocumentHeader from "../partials/DocumentHeader";
import {
  getDocumentAPI,
  validDocumentAssignAPI,
} from "../Api/DocumentAPI/DocumentAPI";
import { useParams } from "react-router-dom";

export default function NewDocument() {
  const { document_id } = useParams();
  const user_id = localStorage.getItem("user_id");
  const [data, setData] = useState("");
  const [isEditAccess, setIsEditAccess] = useState(true);
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

  const validDocumentAssignFunc = (document_id, user_id) => {
    try {
      validDocumentAssignAPI(document_id, user_id).then((res) => {
        if (res.status === 200) {
          setIsEditAccess(res?.data?.data);
          console.log(res);
        } else {
          console.log("error");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const recall = () => {
    getDocumentFunc(documentid);
  };

  useEffect(() => {
    if (document_id) {
      getDocumentFunc(document_id);
      setDocumentid(document_id);
    }
  }, [document_id]);

  useEffect(() => {
    if (document_id && user_id) {
      validDocumentAssignFunc(document_id, user_id);
    }
  }, [document_id, user_id]);

  console.log(isEditAccess);

  return (
    <>
      <DocumentHeader />
      <TextEditorContent
        assignedData={data}
        recall={recall}
        isEditAccess={isEditAccess}
      />
    </>
  );
}
