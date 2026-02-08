import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import DocumentPreview from "@/components/results/DocumentPreview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { analyseCV } from "@/lib/api";
import { deleteAnalysis, getEntry, getIndex, saveAnalysis, type AnalysisEntry, type AnalysisIndexEntry } from "@/lib/storage";
import { cn, dataURLtoFile } from "@/lib/utils";
import type { AnalysisResult, SectionStatus } from "@/types/analysis";
import {
  AlertTriangle,
  ArrowLeft,
  Briefcase,
  CheckCircle2,
  FileText,
  Info,
  Lightbulb,
  Plus,
  Search,
  Settings,
  Trash2,
  Upload,
  XCircle
} from "lucide-react";
import { useRef, useMemo, useState } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "sonner";

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
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const routerState = location.state as { file?: File; analysisResult?: AnalysisResult } | null;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [entries, setEntries] = useState<AnalysisIndexEntry[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNewUpload = async (selectedFile: File) => {
    if (selectedFile.size > 1024 * 1024) {
      toast.error("File too large", { description: "Please upload a file smaller than 1 MB." });
      return;
    }
    setIsSidebarOpen(false);
    toast.info("Analysing your CV...");
    try {
      const result = await analyseCV(selectedFile);
      const newId = crypto.randomUUID();
      const reader = new FileReader();
      reader.onloadend = () => {
        try {
          const entry: AnalysisEntry = {
            analysisResult: result,
            fileName: selectedFile.name,
            fileSize: selectedFile.size,
            fileData: reader.result as string | null,
          };
          saveAnalysis(newId, entry);
        } catch {
          // localStorage may be full
        }
        navigate(`/results/${newId}`, { state: { file: selectedFile, analysisResult: result } });
      };
      reader.readAsDataURL(selectedFile);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Analysis failed";
      toast.error("Analysis failed", { description: message });
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (open) setEntries(getIndex());
    setIsSidebarOpen(open);
  };

  const handleDelete = (entryId: string) => {
    deleteAnalysis(entryId);
    const updated = getIndex();
    setEntries(updated);
    if (entryId === id) {
      setIsSidebarOpen(false);
      if (updated.length > 0) {
        navigate(`/results/${updated[0].id}`, { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  };

  const storedData = useMemo(() => {
    if (routerState?.analysisResult) return null;
    if (!id) return null;
    const entry = getEntry(id);
    if (!entry) return null;
    const file = entry.fileData ? dataURLtoFile(entry.fileData, entry.fileName) : null;
    return { analysisResult: entry.analysisResult, file };
  }, [id, routerState]);

  const analysisResult: AnalysisResult | undefined = routerState?.analysisResult ?? storedData?.analysisResult;
  const file: File | null = routerState?.file ?? storedData?.file ?? null;

  if (!analysisResult) {
    return <Navigate to="/" replace />;
  }

  const { scores, summary, prediction, sections, recommendations, keywords } = analysisResult;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-[calc(4rem+57px)]">
        {/* Top bar */}
        <div className="fixed top-16 left-0 right-0 z-40 border-b bg-card/80 backdrop-blur-md">
          <div className="container mx-auto px-4 py-3 relative flex items-center justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleOpenChange(true)}
              className="gap-1.5 absolute left-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Upload Another CV</span>
              <span className="sm:hidden">Upload</span>
            </Button>
            <h1 className="text-sm sm:text-lg font-semibold text-foreground">
              Analysis Results
            </h1>
          </div>
        </div>

        {/* Split layout */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left panel — Document preview */}
            <div className="lg:sticky lg:top-[calc(4rem+57px+2rem)] lg:self-start">
              {file ? (
                <DocumentPreview file={file} />
              ) : (
                <div className="flex flex-col items-center justify-center h-full min-h-[600px] rounded-lg border bg-muted/30 text-muted-foreground">
                  <FileText className="w-12 h-12 mb-3" />
                  <p className="text-sm font-medium">Document preview unavailable</p>
                  <p className="text-xs mt-1">Upload your CV again to see the preview</p>
                </div>
              )}
            </div>

            {/* Right panel — Analysis */}
            <div className="space-y-6">
              {/* AI disclaimer */}
              <div className="flex items-start gap-2 rounded-lg border border-border/50 bg-muted/40 px-4 py-3 text-xs text-muted-foreground">
                <Info className="w-4 h-4 mt-0.5 shrink-0" />
                <p>This analysis is AI-generated and may not be fully accurate. Use it as guidance, not as a definitive assessment.</p>
              </div>

              {/* Overview: Summary, Prediction, Scores */}
              <Card>
                <CardContent className="pt-6 space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {summary}
                  </p>

                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <Briefcase className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-semibold text-foreground">
                          {prediction.jobTitle}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {prediction.yearsExperience < 1 ? "<1 year" : `${prediction.yearsExperience}+ ${prediction.yearsExperience === 1 ? "year" : "years"}`} experience
                        </p>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-gradient">
                      {new Intl.NumberFormat("en-GB", { style: "currency", currency: prediction.salaryRange.currency, maximumFractionDigits: 0 }).format(prediction.salaryRange.min)}
                      {" – "}
                      {new Intl.NumberFormat("en-GB", { style: "currency", currency: prediction.salaryRange.currency, maximumFractionDigits: 0 }).format(prediction.salaryRange.max)}
                    </p>
                  </div>

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
                  <CardTitle className="text-lg">Feedback</CardTitle>
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
                          <ul className="space-y-2">
                            {section.suggestions.map((s, i) => {
                              const exampleIndex = s.indexOf("Example: ");
                              const suggestion = exampleIndex !== -1 ? s.slice(0, exampleIndex).trimEnd() : s;
                              const example = exampleIndex !== -1 ? s.slice(exampleIndex + "Example: ".length) : null;
                              return (
                                <li
                                  key={i}
                                  className="text-sm text-muted-foreground"
                                >
                                  <div className="flex items-start gap-2">
                                    <span className="text-primary mt-0.5">-</span>
                                    <div>
                                      <span>{suggestion}</span>
                                      {example && (
                                        <p className="mt-1 text-xs italic text-muted-foreground/70 border-l-2 border-primary/30 pl-2">
                                          Example: {example}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </li>
                              );
                            })}
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
                    <div className="flex flex-wrap gap-2">
                      {keywords.found.map((kw) => (
                        <Badge key={kw} variant="secondary">
                          {kw}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Upload another */}
              <Button
                variant="hero"
                size="lg"
                className="w-full"
                asChild
              >
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Book a Consultation
                </a>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* History Sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={handleOpenChange}>
        <SheetContent side="left" className="flex flex-col p-0">
          <SheetHeader className="p-6 pb-4 border-b">
            <SheetTitle>Analysis History</SheetTitle>
          </SheetHeader>

          <div className="p-4">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleNewUpload(f);
                e.target.value = "";
              }}
            />
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-4 h-4" />
              Upload Another CV
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-4">
            {entries.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No analyses yet. Upload a CV to get started.
              </p>
            ) : (
              <div className="space-y-2">
                {entries.map((entry) => (
                  <div
                    key={entry.id}
                    className={cn(
                      "group flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors",
                      entry.id === id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/30 hover:bg-muted/50"
                    )}
                    onClick={() => {
                      setIsSidebarOpen(false);
                      navigate(`/results/${entry.id}`);
                    }}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {entry.fileName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(entry.createdAt), "d MMM yyyy, HH:mm")}
                      </p>
                    </div>
                    <span className={cn(
                      "text-sm font-bold shrink-0",
                      entry.overallScore >= 80
                        ? "text-green-600 dark:text-green-400"
                        : entry.overallScore >= 60
                          ? "text-yellow-600 dark:text-yellow-400"
                          : "text-red-600 dark:text-red-400"
                    )}>
                      {entry.overallScore}%
                    </span>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="p-1 rounded opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                          aria-label={`Options for ${entry.fileName}`}
                        >
                          <Settings className="w-4 h-4" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent side="right" align="start" className="w-auto p-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(entry.id);
                          }}
                          className="flex items-center gap-2 rounded px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </PopoverContent>
                    </Popover>
                  </div>
                ))}
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Results;
