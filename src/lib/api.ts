import type { AnalysisResult, ApiResponse } from "@/types/analysis";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export async function analyzeCV(file: File): Promise<AnalysisResult> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/api/analyze`, {
    method: "POST",
    body: formData,
  });

  const json: ApiResponse<AnalysisResult> = await response.json();

  if (!json.success || !json.data) {
    throw new Error(json.error?.message || "Analysis failed");
  }

  return json.data;
}
