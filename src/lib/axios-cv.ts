import { CV_API_URL } from "@/config";
import axios from "axios";

const cvApi = axios.create({
  baseURL: CV_API_URL,
});

export default cvApi;
