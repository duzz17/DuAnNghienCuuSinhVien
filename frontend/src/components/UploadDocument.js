import { useState } from "react";

const ACCEPTED_TYPES = ["pdf", "docx"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

function getMimeType(extension) {
  if (extension === "pdf") return "application/pdf";
  if (extension === "docx")
    return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  return "application/octet-stream";
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        resolve(result);
      } else {
        reject(new Error("Không đọc được file."));
      }
    };

    reader.onerror = () => reject(new Error("Lỗi đọc file."));
    reader.readAsDataURL(file);
  });
}

function UploadDocument({ category, title, onUpload }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFilesChange = async (event) => {
    setError("");
    setSuccess("");
    const files = Array.from(event.target.files || []);

    if (!files.length) return;

    const invalidFiles = files.filter((file) => {
      const extension = file.name.split(".").pop().toLowerCase();
      return !ACCEPTED_TYPES.includes(extension) || file.size > MAX_FILE_SIZE;
    });

    if (invalidFiles.length) {
      setError(
        "Chỉ cho phép file .pdf và .docx, mỗi file không quá 10MB. Vui lòng chọn lại.",
      );
      return;
    }

    try {
      const uploaded = await Promise.all(
        files.map(async (file) => {
          const extension = file.name.split(".").pop().toLowerCase();
          const dataUrl = await readFileAsDataUrl(file);
          const mimeType = getMimeType(extension);
          const base64Index = dataUrl.indexOf(",") + 1;
          const base64 = dataUrl.slice(base64Index);
          const url = `data:${mimeType};base64,${base64}`;

          return {
            name: file.name,
            type: extension === "pdf" ? "pdf" : "word",
            url,
            createdAt: new Date().toISOString(),
            category,
          };
        }),
      );

      onUpload(uploaded);
      setSuccess(`Đã tải lên ${uploaded.length} tài liệu.`);
      event.target.value = null;
    } catch (err) {
      setError("Không thể tải file. Vui lòng thử lại.");
    }
  };

  return (
    <div className="upload-panel">
      <h2 className="upload-title">{title || "Đăng tài liệu mới"}</h2>
      <input
        type="file"
        accept=".pdf,.docx"
        multiple
        className="upload-input"
        onChange={handleFilesChange}
      />
      <p className="upload-help">
        Chỉ hỗ trợ PDF và DOCX. File sẽ xuất hiện trong danh sách tài liệu của
        mục hiện tại.
      </p>
      {error && <p className="upload-error">{error}</p>}
      {success && <p className="upload-success">{success}</p>}
    </div>
  );
}

export default UploadDocument;
