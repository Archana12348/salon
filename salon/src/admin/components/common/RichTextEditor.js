import { useEffect, useRef } from "react";
import $ from "jquery";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "summernote/dist/summernote-bs4.css";
import "summernote/dist/summernote-bs4.js";

window.$ = window.jQuery = $;
const RichTextEditor = ({ value = "", onChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    const $editor = $(editorRef.current);

    $editor.summernote({
      height: 200,
      placeholder: "Enter description...",
      toolbar: [
        ["style", ["bold", "italic", "underline"]],
        ["para", ["ul", "ol"]],
        ["insert", ["link"]],
        ["view", ["codeview"]],
      ],
      callbacks: {
        onChange: (contents) => onChange?.(contents),
      },
    });

    $editor.summernote("code", value);

    return () => {
      $editor.summernote("destroy");
    };
  }, []);

  return <textarea ref={editorRef} />;
};

export default RichTextEditor;
