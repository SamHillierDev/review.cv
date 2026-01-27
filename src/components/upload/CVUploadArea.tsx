import { useState, useCallback } from "react";
import { Upload, FileText, CheckCircle2, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CVUploadArea = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

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

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const resetUpload = () => {
    setFile(null);
    setIsAnalyzing(false);
    setAnalysisComplete(false);
  };

  return (
    <div className="relative">
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-70" />
      
      <div
        className={cn(
          "relative bg-card rounded-2xl border-2 border-dashed transition-all duration-300 overflow-hidden",
          isDragging && "border-primary bg-primary/5 scale-[1.02]",
          !isDragging && !file && "border-border hover:border-primary/50",
          file && "border-primary/30"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {!file ? (
          /* Upload State */
          <label className="block cursor-pointer p-8 md:p-12">
            <input
              type="file"
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
                Drop your CV here
              </h3>
              <p className="text-muted-foreground mb-4">
                or click to browse files
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="w-4 h-4" />
                <span>Supports PDF, DOCX • Max 10MB</span>
              </div>
            </div>
          </label>
        ) : (
          /* File Selected State */
          <div className="p-8 md:p-12">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              {!isAnalyzing && (
                <button
                  onClick={resetUpload}
                  className="p-1 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              )}
            </div>

            {/* Analysis Progress */}
            {isAnalyzing && (
              <div className="mt-6">
                <div className="flex items-center gap-3 mb-3">
                  <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  <span className="text-sm font-medium text-foreground">
                    Analyzing your CV...
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full gradient-primary rounded-full animate-pulse" style={{ width: "70%" }} />
                </div>
              </div>
            )}

            {/* Analysis Complete */}
            {analysisComplete && (
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-2 text-accent">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-medium">Analysis Complete!</span>
                </div>
                
                {/* Quick Score Preview */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Overall Score", value: "78%" },
                    { label: "ATS Ready", value: "85%" },
                    { label: "Impact Score", value: "72%" },
                  ].map((stat, index) => (
                    <div key={index} className="bg-muted rounded-lg p-3 text-center">
                      <p className="text-lg font-bold text-gradient">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <Button variant="hero" className="w-full" size="lg">
                  View Full Analysis
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CVUploadArea;
