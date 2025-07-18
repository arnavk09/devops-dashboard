import axios from "axios";

const API_BASE = "http://localhost:8080/api";

export const fetchPipelineRuns = async () => {
  const { data } = await axios.get(`${API_BASE}/pipelines`);
  return data;
};