import React, { useEffect, useState } from "react";

const API_URL =
  "https://jumeirah.premierwebtechservices.com/backend/api/admin/settings";

export default function SettingsPage() {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await fetch(API_URL);
      const json = await res.json();

      const data = json.data.map((s) => ({
        ...s,
        file: null,
      }));

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

  const handleChange = (id, value, isFile = false) => {
    setSettings((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;

        if (isFile) {
          return {
            ...s,
            file: value, // preview will auto work
          };
        }

        return { ...s, val: value };
      })
    );
  };

  const saveSettings = async () => {
    const formData = new FormData();

    settings.forEach((s) => {
      if (s.file) {
        formData.append(s.key, s.file);
      } else {
        formData.append(s.key, s.val);
      }
    });

    // 🔥 PRINT FORMDATA
    console.log("🟦 FINAL FORMDATA VALUES:");
    console.log("🟦 FINAL FORMDATA:");
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`${key} : FILE`, value.name, value.type, value.size);
      } else {
        console.log(`${key} :`, value);
      }
    }

    debugger;
    const response = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });

    const json = await response.json();
    console.log("json", json);
    alert(json.message);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>System Settings</h2>

      <div style={styles.card}>
        {settings.map((s) => (
          <div key={s.id} style={styles.item}>
            <label style={styles.label}>{s.key.replace(/_/g, " ")}</label>

            {/* STRING */}
            {(s.type === "string" || s.type === "text") && (
              <input
                type="text"
                value={s.val}
                onChange={(e) => handleChange(s.id, e.target.value)}
                style={styles.input}
              />
            )}

            {/* INT */}
            {s.type === "int" && (
              <input
                type="number"
                value={s.val}
                onChange={(e) => handleChange(s.id, e.target.value)}
                style={styles.input}
              />
            )}

            {/* BOOLEAN */}
            {s.type === "boolean" && (
              <label style={styles.switch}>
                <input
                  type="checkbox"
                  checked={Number(s.val) === 1}
                  onChange={(e) => handleChange(s.id, e.target.checked ? 1 : 0)}
                />
                <span className="slider"></span>
              </label>
            )}

            {/* FILE */}
            {s.type === "file" && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;

                    handleChange(s.id, file, true);
                  }}
                  style={styles.fileInput}
                />

                {/* NEW IMAGE PREVIEW (LOCAL FILE) */}
                {s.file && (
                  <img
                    src={URL.createObjectURL(s.file)}
                    alt="preview"
                    style={styles.imagePreview}
                  />
                )}

                {/* EXISTING IMAGE FROM DATABASE */}
                {!s.file && s.val && (
                  <img
                    src={`${s.val}`}
                    alt="existing"
                    style={styles.imagePreview}
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <button style={styles.saveBtn} onClick={saveSettings}>
        Save Settings
      </button>
    </div>
  );
}

/* ---------- Modern UI Styles ---------- */
const styles = {
  wrapper: {
    padding: "40px",
    background: "#f5f7fa",
    minHeight: "100vh",
    fontFamily: "sans-serif",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "800",
    marginBottom: "25px",
    color: "#2d3748",
  },
  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "14px",
    boxShadow: "0 5px 25px rgba(0,0,0,0.05)",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
  },
  label: {
    marginBottom: "6px",
    fontSize: "14px",
    fontWeight: "600",
    textTransform: "capitalize",
    color: "#4a5568",
  },
  input: {
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #cbd5e0",
    fontSize: "15px",
    outline: "none",
    transition: "0.2s",
  },
  fileInput: {
    marginTop: "5px",
  },
  imagePreview: {
    marginLeft: "15px",
    width: "70px",
    height: "70px",
    objectFit: "cover",
    borderRadius: "8px",
    border: "2px solid #e2e8f0",
  },
  switch: {
    display: "inline-block",
    position: "relative",
    width: "50px",
    height: "24px",
  },
  saveBtn: {
    marginTop: "25px",
    padding: "12px 25px",
    background: "#4C6EF5",
    border: "none",
    color: "#fff",
    borderRadius: "10px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "600",
    boxShadow: "0 4px 12px rgba(76,110,245,0.3)",
    transition: "0.2s",
  },
};
