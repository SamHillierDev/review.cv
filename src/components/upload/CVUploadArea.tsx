import { Button } from "@/components/ui/button";
import { analyseCV } from "@/lib/api";
import { getEntry, getIndex, saveAnalysis, type AnalysisEntry } from "@/lib/storage";
import { cn, dataURLtoFile } from "@/lib/utils";
import type { AnalysisResult } from "@/types/analysis";
import { ArrowRight, CheckCircle2, FileText, Upload, X } from "lucide-react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const MAX_FILE_SIZE = 1024 * 1024; // 1 MB

const CVUploadArea = () => {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalysing, setIsAnalysing] = useState(false);

  const [saved] = useState(() => {
    try {
      const index = getIndex();
      if (index.length === 0) return null;
      const latest = index[0];
      const entry = getEntry(latest.id);
      if (!entry) return null;
      return {
        id: latest.id,
        analysisResult: entry.analysisResult,
        fileName: entry.fileName,
        fileSize: entry.fileSize,
        file: entry.fileData ? dataURLtoFile(entry.fileData, entry.fileName) : null,
      };
    } catch {
      return null;
    }
  });

  const [file, setFile] = useState<File | null>(saved?.file ?? null);
  const [fileName, setFileName] = useState(saved?.fileName ?? '');
  const [fileSize, setFileSize] = useState(saved?.fileSize ?? 0);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(saved?.analysisResult ?? null);
  const [savedId, setSavedId] = useState<string | null>(saved?.id ?? null);

  const hasResult = !!analysisResult || !!file;

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === "application/pdf" || droppedFile.name.endsWith(".docx"))) {
      handleFileSelect(droppedFile);
    }
  }, []);

  const handleFileSelect = async (selectedFile: File) => {
    if (selectedFile.size > MAX_FILE_SIZE) {
      toast.error("File too large", {
        description: "Please upload a file smaller than 1 MB.",
      });
      return;
    }
    setFile(selectedFile);
    setFileName(selectedFile.name);
    setFileSize(selectedFile.size);
    setIsAnalysing(true);
    setAnalysisResult(null);
    setSavedId(null);
    try {
      const result = await analyseCV(selectedFile);
      setAnalysisResult(result);
      const id = crypto.randomUUID();
      setSavedId(id);
      const reader = new FileReader();
      reader.onloadend = () => {
        try {
          const entry: AnalysisEntry = {
            analysisResult: result,
            fileName: selectedFile.name,
            fileSize: selectedFile.size,
            fileData: reader.result as string | null,
          };
          saveAnalysis(id, entry);
        } catch {
          // localStorage may be full — silently ignore
        }
      };
      reader.readAsDataURL(selectedFile);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Analysis failed";
      toast.error("Analysis failed", { description: message });
      setFile(null);
    } finally {
      setIsAnalysing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const resetUpload = () => {
    setFile(null);
    setFileName('');
    setFileSize(0);
    setIsAnalysing(false);
    setAnalysisResult(null);
    setSavedId(null);
  };

  return (
    <div className="relative group">
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-70" />

      <div
        className={cn(
          "relative bg-card rounded-2xl border-2 border-dashed transition-all duration-300 overflow-hidden",
          isDragging && "border-primary bg-primary/5 scale-[1.02]",
          !isDragging && !hasResult && "border-border hover:border-primary/50 group-hover:border-primary/50 group-hover:bg-primary/[0.02] cursor-pointer",
          hasResult && "border-primary/30"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !hasResult && document.getElementById("cv-upload")?.click()}
      >
        {!hasResult ? (
          /* Upload State */
          <div className="p-8 md:p-12">
            <input
              type="file"
              id="cv-upload"
              accept=".pdf,.docx"
              onChange={handleInputChange}
              className="hidden"
            />
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                <Upload className={cn(
                  "w-8 h-8 transition-colors",
                  isDragging ? "text-primary" : "text-muted-foreground"
                )} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Upload your CV here
              </h3>
              <p className="text-muted-foreground mb-4">
                Drag and drop your CV here or click to browse files
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="w-4 h-4" />
                <span>Supports PDF, DOCX • Max 1 MB</span>
              </div>
            </div>
          </div>
        ) : (
          /* File Selected State */
          <div className="p-8 md:p-12">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{fileName}</p>
                <p className="text-sm text-muted-foreground">
                  {(fileSize / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              {!isAnalysing && (
                <button
                  onClick={resetUpload}
                  className="p-1 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              )}
            </div>

            {/* Analysis Progress */}
            {isAnalysing && (
              <div className="mt-6 flex flex-col items-center gap-4">
                <div className="relative w-20 h-24">
                  {/* Document */}
                  <svg
                    viewBox="0 0 40 48"
                    fill="none"
                    className="w-full h-full text-muted-foreground/40"
                  >
                    <rect x="2" y="2" width="36" height="44" rx="3" stroke="currentColor" strokeWidth="2" />
                    <line x1="10" y1="12" x2="30" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="10" y1="18" x2="26" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="10" y1="24" x2="30" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="10" y1="30" x2="22" y2="30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="10" y1="36" x2="28" y2="36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  {/* Magnifying glass */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="absolute w-14 h-14 text-primary animate-scan-document"
                  >
                    <circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="2" fill="hsl(var(--background))" fillOpacity="0.8" />
                    <line x1="14.5" y1="14.5" x2="20" y2="20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-foreground">
                  Analysing your CV...
                </span>
              </div>
            )}

            {/* Analysis Complete */}
            {analysisResult && (
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-2 text-accent">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-medium">Analysis Complete!</span>
                </div>

                {/* Quick Score Preview */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Overall Score", value: `${analysisResult.scores.overall}%` },
                    { label: "ATS Ready", value: `${analysisResult.scores.atsReady}%` },
                    { label: "Impact Score", value: `${analysisResult.scores.impact}%` },
                  ].map((stat, index) => (
                    <div key={index} className="bg-muted rounded-lg p-3 text-center">
                      <p className="text-lg font-bold text-gradient">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <Button
                  variant="hero"
                  className="w-full"
                  size="lg"
                  onClick={() =>
                    navigate(`/results/${savedId}`, {
                      state: { file, analysisResult },
                    })
                  }
                >
                  View Full Analysis
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {!hasResult && (
        <Button
          variant="hero"
          size="lg"
          className="relative mt-4 w-full"
          onClick={() => document.getElementById("cv-upload")?.click()}
        >
          Get Your Free CV Review
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      )}
    </div>
  );
};

export default CVUploadArea;
