export type SectionStatus = "excellent" | "good" | "needs_improvement" | "missing";

export interface SectionFeedback {
  section: string;
  score: number;
  status: SectionStatus;
  feedback: string;
  suggestions: string[];
}

export interface Prediction {
  jobTitle: string;
  yearsExperience: number;
  salaryRange: {
    min: number;
    max: number;
    currency: string;
  };
}

export interface AnalysisResult {
  scores: {
    overall: number;
    atsReady: number;
    impact: number;
  };
  summary: string;
  prediction: Prediction;
  sections: SectionFeedback[];
  recommendations: string[];
  keywords: {
    found: string[];
    missing: string[];
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}
