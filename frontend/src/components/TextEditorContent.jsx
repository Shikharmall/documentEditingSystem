import React, { useState, useEffect, useMemo } from "react";
import Quill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { editDocumentAPI } from "../Api/DocumentAPI/DocumentAPI";
import ShareLink from "./ShareLink";

import { io } from "socket.io-client";
import { API_URL_BASE } from "../utils/apiURL";
import { useParams } from "react-router-dom";

const TextEditorContent = ({ assignedData, recall, isEditAccess }) => {
  const socket = useMemo(() => io(`${API_URL_BASE}`), []);
  //io("http://localhost:5174");
  const user_id = localStorage.getItem("user_id");
  const { document_id } = useParams();
  const [userId, setUserId] = useState("");
  const [formData, setFormData] = useState({
    content: "",
    document_id: "",
  });
  const [loader, setLoader] = useState(false);

  const [linkText, setlinkText] = useState("");

  const [isShareLinkOpen, setIsShareLinkOpen] = useState(false);

  const openShareLink = () => {
    setIsShareLinkOpen(true);
  };

  const closeShareLink = () => {
    setIsShareLinkOpen(false);
  };

  var toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    //[{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];

  const module = {
    toolbar: toolbarOptions,
  };

  const handleTextChange = (content, delta, source, editor) => {
    // Handle text changes here
    //setText(content);
    socket.emit("text-update", content);
    setFormData({ ...formData, content: content });
  };

  const saveData = (e) => {
    setLoader(true);
    e.preventDefault();
    editDocumentAPI(formData).then((res) => {
      if (res.status === 201) {
        setLoader(false);
        recall();
      } else {
        setLoader(false);
        toast(res?.response?.data?.message);
      }
    });
  };

  useEffect(() => {
    if (user_id) {
      setUserId(user_id);
    }
  }, [user_id]);

  useEffect(() => {
    if (document_id) {
      setFormData({ ...formData, document_id: document_id });
      setlinkText(window.location.href);
    }
  }, [document_id]);

  useEffect(() => {
    if (assignedData) {
      setFormData({ ...formData, content: assignedData });
      //setlinkText(window.location.href);
    }
  }, [assignedData]);

  useEffect(() => {
    socket.on("connect", () => {
      //console.log("User connected:", socket.id);
    });
    socket.on("text-update", (data) => {
      //console.log(data);
      setFormData({ ...formData, content: data });
    });
    return () => {
      socket.off("text-update");
    };
  }, []);

  //console.log(formData);

  return (
    <>
      <ToastContainer></ToastContainer>
      {
        isEditAccess
        ?
        <Quill
          modules={module}
          value={formData.content}
          onChange={handleTextChange}
          //readOnly={isEditAccess}
        />
        :
        <Quill
          modules={module}
          value={formData.content}
          onChange={handleTextChange}
          readOnly={true}
        />

      }
      <div className="flex items-end justify-end p-6">
        {isEditAccess ? (
          <>
            {loader ? (
              <button
                type="submit"
                className="text-white bg-teal-500 hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex justify-center items-center m-1"
                //onClick={saveData}
              >
                Saving....
              </button>
            ) : (
              <button
                type="submit"
                className="text-white bg-teal-500 hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex justify-center items-center m-1"
                onClick={saveData}
              >
                Save
              </button>
            )}
          </>
        ) : null}

        <button
          type="submit"
          className="text-white bg-teal-500 hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex justify-center items-center m-1"
          onClick={openShareLink}
        >
          <svg
            className="w-4 h-4 mr-2"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9.31802 0.974873C9.94222 0.350672 10.7888 0 11.6716 0C13.5098 0 15 1.49019 15 3.32843C15 4.21118 14.6493 5.05778 14.0251 5.68198L10.8536 8.85355L10.1464 8.14645L13.318 4.97487C13.7547 4.53821 14 3.94596 14 3.32843C14 2.04247 12.9575 1 11.6716 1C11.054 1 10.4618 1.24532 10.0251 1.68198L6.85355 4.85355L6.14645 4.14645L9.31802 0.974873ZM10.8536 4.85355L4.85355 10.8536L4.14645 10.1464L10.1464 4.14645L10.8536 4.85355ZM4.85355 6.85355L1.68198 10.0251C1.24532 10.4618 1 11.054 1 11.6716C1 12.9575 2.04247 14 3.32843 14C3.94596 14 4.53821 13.7547 4.97487 13.318L8.14645 10.1464L8.85355 10.8536L5.68198 14.0251C5.05778 14.6493 4.21118 15 3.32843 15C1.49019 15 0 13.5098 0 11.6716C0 10.7888 0.350673 9.94222 0.974874 9.31802L4.14645 6.14645L4.85355 6.85355Z"
              fill="#ffffff"
            />
          </svg>
          Create Link
        </button>
      </div>
      {isShareLinkOpen && (
        <ShareLink closeShareLink={closeShareLink} linkText={linkText} />
      )}
    </>
  );
};

export default TextEditorContent;
