import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DocumentPreview from "@/components/results/DocumentPreview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { AnalysisResult, SectionStatus } from "@/types/analysis";
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Briefcase,
  XCircle,
  Lightbulb,
  Search,
  Target,
} from "lucide-react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";

interface ResultsState {
  file: File;
  analysisResult: AnalysisResult;
}

const statusConfig: Record<
  SectionStatus,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: typeof CheckCircle2 }
> = {
  excellent: { label: "Excellent", variant: "default", icon: CheckCircle2 },
  good: { label: "Good", variant: "secondary", icon: CheckCircle2 },
  needs_improvement: { label: "Needs Improvement", variant: "outline", icon: AlertTriangle },
  missing: { label: "Missing", variant: "destructive", icon: XCircle },
};

function scoreColor(score: number) {
  if (score >= 80) return "text-green-600 dark:text-green-400";
  if (score >= 60) return "text-yellow-600 dark:text-yellow-400";
  return "text-red-600 dark:text-red-400";
}

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ResultsState | null;

  if (!state?.file || !state?.analysisResult) {
    return <Navigate to="/" replace />;
  }

  const { file, analysisResult } = state;
  const { scores, summary, prediction, sections, recommendations, keywords } = analysisResult;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-[calc(4rem+57px)]">
        {/* Top bar */}
        <div className="fixed top-16 left-0 right-0 z-40 border-b bg-card/80 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Upload Another CV
            </Button>
            <h1 className="text-lg font-semibold text-foreground">
              Analysis Results
            </h1>
            <div className="w-[170px]" /> {/* spacer for centering */}
          </div>
        </div>

        {/* Split layout */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left panel — Document preview */}
            <div className="lg:sticky lg:top-8 lg:self-start">
              <h2 className="text-sm font-medium text-muted-foreground mb-3">
                Document Preview
              </h2>
              <DocumentPreview file={file} />
            </div>

            {/* Right panel — Analysis */}
            <div className="space-y-6">
              {/* Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {summary}
                  </p>
                </CardContent>
              </Card>

              {/* Prediction */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    Predicted Role
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">
                        {prediction.jobTitle}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {prediction.yearsExperience < 1 ? "<1 year" : `${prediction.yearsExperience}+ ${prediction.yearsExperience === 1 ? "year" : "years"}`} experience
                      </p>
                    </div>
                    <p className="text-lg font-bold text-gradient">
                      {new Intl.NumberFormat("en-GB", { style: "currency", currency: prediction.salaryRange.currency, maximumFractionDigits: 0 }).format(prediction.salaryRange.min)}
                      {" – "}
                      {new Intl.NumberFormat("en-GB", { style: "currency", currency: prediction.salaryRange.currency, maximumFractionDigits: 0 }).format(prediction.salaryRange.max)}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Scores */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Scores
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-3 gap-6">
                    {[
                      { label: "Overall", value: scores.overall },
                      { label: "ATS Ready", value: scores.atsReady },
                      { label: "Impact", value: scores.impact },
                    ].map((s) => (
                      <div key={s.label} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{s.label}</span>
                          <span className={cn("text-sm font-bold", scoreColor(s.value))}>
                            {s.value}%
                          </span>
                        </div>
                        <Progress value={s.value} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Section-by-section feedback */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Section Feedback</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {sections.filter((s) => s.status !== "missing").map((section) => {
                    const config = statusConfig[section.status];
                    const Icon = config.icon;
                    return (
                      <div
                        key={section.section}
                        className="rounded-lg border p-4 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4" />
                            <span className="font-medium">
                              {section.section}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={cn("text-sm font-bold", scoreColor(section.score))}>
                              {section.score}%
                            </span>
                            <Badge variant={config.variant}>
                              {config.label}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {section.feedback}
                        </p>
                        {section.suggestions.length > 0 && (
                          <ul className="space-y-1">
                            {section.suggestions.map((s, i) => (
                              <li
                                key={i}
                                className="text-sm text-muted-foreground flex items-start gap-2"
                              >
                                <span className="text-primary mt-0.5">-</span>
                                {s}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {recommendations.map((rec, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-muted-foreground"
                      >
                        <span className="font-medium text-foreground min-w-[20px]">
                          {i + 1}.
                        </span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Keywords */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    Keywords
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {keywords.found.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Found</p>
                      <div className="flex flex-wrap gap-2">
                        {keywords.found.map((kw) => (
                          <Badge key={kw} variant="secondary">
                            {kw}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {keywords.missing.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Missing</p>
                      <div className="flex flex-wrap gap-2">
                        {keywords.missing.map((kw) => (
                          <Badge key={kw} variant="outline">
                            {kw}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Upload another */}
              <Button
                variant="hero"
                size="lg"
                className="w-full"
                onClick={() => navigate("/")}
              >
                Upload Another CV
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Results;
