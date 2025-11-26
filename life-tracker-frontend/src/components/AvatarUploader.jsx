import React, { useRef } from "react";

export default function AvatarUploader({ onChange }) {
  const inp = useRef();

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const b64 = reader.result;
      localStorage.setItem("lt_profile_image", b64);
      onChange && onChange(b64);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="avatar-uploader">
      <div className="avatar-preview" />
      <input ref={inp} type="file" accept="image/*" onChange={handleFile} style={{display:"none"}} />
      <button className="btn" onClick={() => inp.current.click()}>Upload Photo</button>
    </div>
  );
}
