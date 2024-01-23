import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import NewDocument from "./pages/NewDocument";
import TextEditor from "./pages/TextEditor";
import NoPage from "./pages/NoPage";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <Routes>
      <Route exact path="/" element={<NewDocument />} />
      <Route exact path="/document/:document_id" element={<TextEditor />} />
      <Route exact path="/alldocuments/:document_id" element={<TextEditor />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
}

export default App;
