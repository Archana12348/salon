import { useEffect } from "react";

const TawkToChat = () => {
  useEffect(() => {
    if (window.Tawk_API) return;

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://embed.tawk.to/6974991f9602761980a88007/1jfnnc9a2"; // 👈 yahan apna URL
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    document.body.appendChild(script);
  }, []);

  return null;
};

export default TawkToChat;
