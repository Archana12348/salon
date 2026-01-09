import { useEffect, useRef } from "react";
import $ from "jquery";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "summernote/dist/summernote-bs4.css";
import "summernote/dist/summernote-bs4.js";

window.$ = window.jQuery = $;

const RichTextEditor = ({ value = "", onChange }) => {
  const editorRef = useRef(null);
  const isReady = useRef(false);

  // INIT once
  useEffect(() => {
    const $editor = $(editorRef.current);

    if (!isReady.current) {
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
          onChange: function (contents) {
            onChange?.(contents);
          },
        },
      });

      isReady.current = true;
    }
  }, []);

  // SET VALUE when API data arrives
  useEffect(() => {
    if (!isReady.current) return;

    const $editor = $(editorRef.current);

    // Delay ensures Summernote DOM is fully ready
    setTimeout(() => {
      if ($editor.summernote("code") !== value) {
        $editor.summernote("code", value || "");
      }
    }, 0);
  }, [value]);

  return <textarea ref={editorRef} />;
};

export default RichTextEditor;
