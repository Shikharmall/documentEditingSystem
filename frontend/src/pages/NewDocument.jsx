import React, { useState } from "react";
import TextEditorContent from "../components/TextEditorContent";
import DocumentHeader from "../partials/DocumentHeader";

export default function NewDocument() {
  return (
    <>
      <DocumentHeader />
      <TextEditorContent />
    </>
  );
}
