import { useState } from "react";

import axios from "axios";

interface Props {
  uid: string;
}
const useCloudinary = ({ uid }: Props) => {
  const [uploaded, setUploaded] = useState<string[] | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const fileExtension = ["png", "jpg", "jpeg"];
  const cloudName = process.env.REACT_APP_CLOUD_NAME;
  const apiKey = process.env.REACT_APP_CLOUD_API_KEY as string;
  const apiSecret = process.env.REACT_APP_CLOUD_API_SECRET;

  const uploadImage = async (files: File[]) => {
    setError(null);
    if (files.length > 5) {
      return setError("5개 이상 업로드는 불가능합니다.");
    }

    for (const file of files) {
      const extension = file.name.split(".").pop()?.toLowerCase();

      if (!fileExtension.includes(`${extension}`)) {
        return setError("이미지 파일만 업로드할 수 있습니다.");
      }
    }

    const uploadUrls = [];

    for (let i = 0; i < files.length; i++) {
      const data = new FormData();
      data.append("api_key", apiKey);
      data.append("upload_preset", "wlqpvsbd");
      data.append("folder", uid);
      data.append("file", files[i]);

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { url } = res.data;
      uploadUrls.push(url);
    }

    setUploaded(uploadUrls);
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
