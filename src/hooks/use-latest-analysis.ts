import { getIndex } from "@/lib/storage";

/**
 * Returns the ID of the most recent analysis from localStorage, or null if none exists.
 */
export function getLatestAnalysisId(): string | null {
  const index = getIndex();
  return index.length > 0 ? index[0].id : null;
}
