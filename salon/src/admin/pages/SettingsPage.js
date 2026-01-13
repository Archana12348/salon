import React, { useEffect, useState } from "react";

const API_URL =
  "https://jumeirah.premierwebtechservices.com/backend/api/admin/settings";

export default function SettingsPage() {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch settings from backend
  const fetchSettings = async () => {
    try {
      const res = await fetch(API_URL);
      const json = await res.json();

      const data = json.data.map((s) => {
        let val = s.val;

        // 🔹 For file type, prepend full URL to show image
        if (s.type === "file" && s.val) {
          val = `${s.val}`;
        }

        return {
          ...s,
          val,
          file: null, // local file preview
        };
      });

      setSettings(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // Handle value changes
  const handleChange = (id, value, isFile = false) => {
    setSettings((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        if (isFile) return { ...s, file: value }; // preview file
        return { ...s, val: value };
      })
    );
  };

  // Save settings to backend
  const saveSettings = async () => {
    const formData = new FormData();

    settings.forEach((s) => {
      if (s.file) {
        formData.append(s.key, s.file);
      } else {
        formData.append(s.key, s.val);
      }
    });

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      const json = await response.json();
      alert(json.message);
      fetchSettings(); // refresh after save
    } catch (err) {
      console.error(err);
      alert("Failed to save settings");
    }
  };

  if (loading) return <p className="text-gray-500 text-lg">Loading...</p>;

  return (
    <div className="p-10 bg-gray-100 min-h-screen font-sans">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800">
        General Settings
      </h2>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        {settings.map((s) => (
          <div key={s.id} className="flex flex-col mb-6">
            <label className="mb-2 text-gray-600 font-semibold capitalize">
              {s.key.replace(/_/g, " ")}
            </label>

            {/* STRING / TEXT */}
            {(s.type === "string" || s.type === "text") && (
              <input
                type="text"
                value={s.val}
                onChange={(e) => handleChange(s.id, e.target.value)}
                className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            )}

            {/* INT */}
            {s.type === "int" && (
              <input
                type="number"
                value={s.val}
                onChange={(e) => handleChange(s.id, e.target.value)}
                className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            )}

            {/* BOOLEAN */}
            {s.type === "boolean" && (
              <label className="inline-flex relative items-center cursor-pointer mt-2">
                <input
                  type="checkbox"
                  checked={Number(s.val) === 1}
                  onChange={(e) => handleChange(s.id, e.target.checked ? 1 : 0)}
                  className="sr-only"
                />
                <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-500 transition-all"></div>
                <span className="ml-3 text-gray-700"> </span>
              </label>
            )}

            {/* FILE INPUTS */}
            {(s.key === "logo" ||
              s.key === "favicon" ||
              s.key === "store_image") && (
              <div className="flex items-center gap-4 mt-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    handleChange(s.id, file, true);
                  }}
                  className="file:border file:border-gray-300 file:p-2 file:rounded-lg file:bg-white file:cursor-pointer"
                />
                {/* Preview */}
                {s.file ? (
                  <img
                    src={URL.createObjectURL(s.file)}
                    alt="preview"
                    className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                  />
                ) : s.val ? (
                  <img
                    src={s.val}
                    alt="existing"
                    className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                  />
                ) : null}
              </div>
            )}

            {/* Fallback text input for any other type */}
            {!["string", "text", "int", "boolean"].includes(s.type) &&
              !["logo", "favicon", "store_image"].includes(s.key) && (
                <input
                  type="text"
                  value={s.val}
                  onChange={(e) => handleChange(s.id, e.target.value)}
                  className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition mt-2"
                />
              )}
          </div>
        ))}
      </div>

      <button
        onClick={saveSettings}
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition"
      >
        Save Settings
      </button>
    </div>
  );
}
