// collaborative-doc-editor/src/components/TextEditor.js
import React, { useState, useEffect } from "react";
import Quill from "react-quill";
import "react-quill/dist/quill.snow.css";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Replace with your server URL

const TextEditorContent = () => {
  const [text, setText] = useState("");

  useEffect(() => {
    // Listen for text updates from the server
    socket.on("text-update", (data) => {
      setText(data);
    });

    return () => {
      socket.off("text-update");
    };
  }, []);

  const handleTextChange = (content, _, source) => {
    if (source === "user") {
      // Send text updates to the server
      socket.emit("text-update", content);
    }
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

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];
  const module = {
    toolbar: toolbarOptions,
  };

  return <Quill modules={module} value={text} onChange={handleTextChange} />;
};

export default TextEditorContent;
