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

  const uploadImage = async (imageUrls: string[]) => {
    setError(null);

    const uploadUrls = [];

    for (let i = 0; i < imageUrls.length; i++) {
      const data = new FormData();
      data.append("api_key", apiKey);
      data.append("upload_preset", "wlqpvsbd");
      data.append("folder", uid);
      data.append("file", imageUrls[i]);

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

  return {
    uploaded,
    uploadImage,
    loading,
  };
};

export default useCloudinary;
