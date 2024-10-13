import axios from "axios";
import { userAgentFromString } from "next/server";

export const getAuth = async () => {
    try {
    
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const token = localStorage.getItem('token'); 
   
        const result = await axios.get(
          `${apiBaseUrl}/logged-in-user`,
          {
              headers: {
                  Authorization: `Bearer ${token}`, // Pass token in Authorization header
              },
          });
        return {
            auth: result?.data,
        };
    } catch (error) {
        console.log(error);
        return {
            auth: []
        };
    }
};
