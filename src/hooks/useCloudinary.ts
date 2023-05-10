import { useEffect, useState } from "react";
import { useyyyyMMddhhmmss } from "util/useyyyyMMddhhmmss";
import axios from "axios";

interface Props {
  uid: string;
}
const useCloudinary = ({ uid }: Props) => {
  const [uploaded, setUploaded] = useState<string | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const allowedExtensions = ["png", "jpg", "jpeg"];
  const cloudName = process.env.REACT_APP_CLOUD_NAME;
  const apiKey = process.env.REACT_APP_CLOUD_API_KEY as string;
  const apiSecret = process.env.REACT_APP_CLOUD_API_SECRET;

  const uploadImage = async (file: File | undefined) => {
    setError(null);
    if (file === undefined) {
      return setError("파일을 업로드해주세요");
    }
    const fileExtension = file.name.split(".").pop()?.toLowerCase();

    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
      return setError("이미지 파일만 업로드 가능합니다.");
    }

    const data = new FormData();
    data.append("api_key", apiKey);
    data.append("file", file);
    data.append("upload_preset", "wlqpvsbd");
    data.append("folder", uid);

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/{cloudName}/image/upload`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const { url } = res.data;
    setUploaded(url);
    setLoading(false);
  };

  const clearUploaded = () => {
    setUploaded(null);
  };

  return {
    uploaded,
    uploadImage,
    error,
    loading,
    clearUploaded,
  };
};

export default useCloudinary;
