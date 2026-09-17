import axios from "axios";
import type { ProfileResponse } from "@/types/profile";

const API_BASE_URL = "https://uatndaapi.dfccil.com/api";

export const getProfile = async (): Promise<ProfileResponse> => {
  const token = localStorage.getItem("token");

  const response = await axios.get<ProfileResponse>(
    `${API_BASE_URL}/User/GetProfile`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};