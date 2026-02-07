import { useEffect, useMemo, useState } from "react";
import mammoth from "mammoth";
import { Loader2 } from "lucide-react";

interface DocumentPreviewProps {
  file: File;
}

const DocumentPreview = ({ file }: DocumentPreviewProps) => {
  const isPdf = file.type === "application/pdf";
  const [docxHtml, setDocxHtml] = useState<string | null>(null);
  const [loading, setLoading] = useState(!isPdf);

  const blobUrl = useMemo(() => URL.createObjectURL(file), [file]);

  useEffect(() => {
    return () => URL.revokeObjectURL(blobUrl);
  }, [blobUrl]);

  useEffect(() => {
    if (isPdf) return;

    let cancelled = false;
    setLoading(true);

    file.arrayBuffer().then((buffer) => {
      mammoth.convertToHtml({ arrayBuffer: buffer }).then((result) => {
        if (!cancelled) {
          setDocxHtml(result.value);
          setLoading(false);
        }
      });
    });

    return () => {
      cancelled = true;
    };
  }, [file, isPdf]);

  if (isPdf) {
    return (
      <iframe
        src={blobUrl}
        className="w-full h-full min-h-[600px] rounded-lg border"
        title="CV Preview"
      />
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[600px] rounded-lg border bg-muted/30">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div
      className="w-full h-full min-h-[600px] overflow-auto rounded-lg border bg-white p-8 prose prose-sm max-w-none"
      dangerouslySetInnerHTML={{ __html: docxHtml || "" }}
    />
  );
};

export default DocumentPreview;
