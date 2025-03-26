import { useState, useEffect } from 'react';
export interface CSVData {
  [key: string]: string | number | null | undefined;
}

export const useCSVData = (csvUrl: string | null) => {
  const [data, setData] = useState<CSVData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!csvUrl) {
      setData([]);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    setData([]);

    const worker = new Worker(new URL('../workers/csvParser.worker.ts', import.meta.url), {
      type: 'module',
    });

    worker.onmessage = (event: MessageEvent<{ data?: CSVData[], error?: string }>) => {
      if (event.data.error) {
        setError(event.data.error);
        setData([]);
      } else if (event.data.data) {
        setData(event.data.data);
        setError(null);
      }
      setLoading(false); 
    };

    worker.onerror = (err) => {
      console.error('Error in CSV Worker:', err);
      setError(`Worker error: ${err.message}`);
      setData([]);
      setLoading(false);
      worker.terminate();
    };

    worker.postMessage({ csvUrl });

    return () => {
      worker.terminate();
    };
  }, [csvUrl]);
  return { data, loading, error };
};