import type { AnalysisResult } from "@/types/analysis";

// --- Types ---

export interface AnalysisIndexEntry {
  id: string;
  fileName: string;
  overallScore: number;
  createdAt: number; // Date.now()
}

export interface AnalysisEntry {
  analysisResult: AnalysisResult;
  fileName: string;
  fileSize: number;
  fileData: string | null; // base64 data URL
}

// --- Keys ---

const INDEX_KEY = "reviewcv-index";
const ENTRY_PREFIX = "reviewcv-entry-";
const LEGACY_KEY = "reviewcv-analysis";

// --- Migration ---

export function migrateLegacyStorage(): void {
  try {
    const raw = localStorage.getItem(LEGACY_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    const id = crypto.randomUUID();
    const entry: AnalysisEntry = {
      analysisResult: data.analysisResult,
      fileName: data.fileName,
      fileSize: data.fileSize,
      fileData: data.fileData ?? null,
    };
    const indexEntry: AnalysisIndexEntry = {
      id,
      fileName: data.fileName,
      overallScore: data.analysisResult?.scores?.overall ?? 0,
      createdAt: Date.now(),
    };
    localStorage.setItem(ENTRY_PREFIX + id, JSON.stringify(entry));
    const index = getIndex();
    index.unshift(indexEntry);
    localStorage.setItem(INDEX_KEY, JSON.stringify(index));
    localStorage.removeItem(LEGACY_KEY);
  } catch {
    // silently ignore corrupt legacy data
  }
}

// --- CRUD ---

export function getIndex(): AnalysisIndexEntry[] {
  try {
    const raw = localStorage.getItem(INDEX_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function getEntry(id: string): AnalysisEntry | null {
  try {
    const raw = localStorage.getItem(ENTRY_PREFIX + id);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveAnalysis(
  id: string,
  entry: AnalysisEntry,
): void {
  localStorage.setItem(ENTRY_PREFIX + id, JSON.stringify(entry));
  const index = getIndex();
  const indexEntry: AnalysisIndexEntry = {
    id,
    fileName: entry.fileName,
    overallScore: entry.analysisResult?.scores?.overall ?? 0,
    createdAt: Date.now(),
  };
  index.unshift(indexEntry);
  localStorage.setItem(INDEX_KEY, JSON.stringify(index));
}

export function deleteAnalysis(id: string): void {
  localStorage.removeItem(ENTRY_PREFIX + id);
  const index = getIndex().filter((e) => e.id !== id);
  localStorage.setItem(INDEX_KEY, JSON.stringify(index));
}
