import { useState } from "react";
import axios from "axios";

const useFetch = () => {
  const [loading, setLoading] = useState(false);

  const fetchData = async (
    url: string,
    method: string,
    body: any,
    headers?: {}
  ) => {
    try {
      setLoading(true);
      let response: any;
      if (method === "GET") {
        response = await axios.get(url, { headers });
      } else if (method === "POST") {
        response = await axios.post(url, body, { headers });
      } else if (method === "PUT") {
        response = await axios.put(url, body, { headers });
      } else if (method === "DELETE") {
        response = await axios.delete(url, { headers });
      }
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loading, fetchData };
};

export default useFetch;
