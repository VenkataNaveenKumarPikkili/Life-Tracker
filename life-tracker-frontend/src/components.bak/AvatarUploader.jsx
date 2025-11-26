// AvatarUploader.jsx
import React, { useRef, useState, useEffect } from "react";

/**
 * Avatar uploader stores base64 string in localStorage under "lt_profile_image".
 * Returns preview URL and allows selecting a new file.
 */

export default function AvatarUploader({ onChange }) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("lt_profile_image");
    if (saved) setPreview(saved);
  }, []);

  function openPicker() {
    inputRef.current && inputRef.current.click();
  }

  function handleFile(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const data = ev.target.result;
      try {
        // store to localStorage (beware storage size if very large image)
        localStorage.setItem("lt_profile_image", data);
        setPreview(data);
        onChange && onChange(data);
      } catch (err) {
        console.error("Saving image failed:", err);
        alert("Could not save image (storage full?). Try a smaller image.");
      }
    };
    // resize images? we skip for brevity. User can upload moderate sized image.
    reader.readAsDataURL(file);
  }

  function remove() {
    localStorage.removeItem("lt_profile_image");
    setPreview(null);
    onChange && onChange(null);
  }

  return (
    <div className="avatar-uploader">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        style={{ display: "none" }}
      />
      <div className="avatar-preview-wrap">
        {preview ? (
          <img src={preview} alt="profile" className="avatar-preview" />
        ) : (
          <div className="avatar-initials">U</div>
        )}
      </div>

      <div className="avatar-actions">
        <button className="btn small" type="button" onClick={openPicker}>
          Change
        </button>
        <button className="btn small ghost" type="button" onClick={remove}>
          Remove
        </button>
      </div>
    </div>
  );
}
