import React, { useState, useEffect } from "react";
import Quill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addDocumentAPI } from "../Api/DocumentAPI/DocumentAPI";
import ShareLink from "./ShareLink";
//import io from "socket.io-client";
//const socket = io("http://localhost:5000"); // Replace with your server URL

const TextEditorContent = () => {
  const user_id = localStorage.getItem("user_id");
  const [userId, setUserId] = useState("");
  const [formData, setFormData] = useState({
    text: "",
    user_id: "",
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

  /* useEffect(() => {
    // Listen for text updates from the server
    socket.on("text-update", (data) => {
      setText(data);
    });

    return () => {
      socket.off("text-update");
    };
  }, []);*/

  /*const handleTextChange = (content, _, source) => {
    if (source === "user") {
      // Send text updates to the server
      socket.emit("text-update", content);
    }
  };*/

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
    setFormData({ ...formData, content: content });
  };

  const submitHandler = (e) => {
    setLoader(true);
    e.preventDefault();
    addDocumentAPI(formData).then((res) => {
      if (res.status === 201) {
        setLoader(false);
        setFormData({ ...formData, content: "" });
      } else {
        setLoader(false);
        toast(res?.response?.data?.message);
      }
    });
  };

  useEffect(() => {
    if (user_id) {
      setFormData({ ...formData, user_id: user_id });
      setUserId(user_id);
      setlinkText(window.location.href);
    }
  }, [user_id]);

  console.log(formData);

  return (
    <>
      <ToastContainer></ToastContainer>
      <Quill
        modules={module}
        value={formData.content}
        onChange={handleTextChange}
        //readOnly={true}
      />
      <div className="flex items-end justify-end p-6">
        <button
          type="submit"
          className="text-white bg-teal-500 hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={openShareLink}
        >
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
