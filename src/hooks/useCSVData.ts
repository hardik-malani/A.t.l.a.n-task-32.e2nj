import { useState, useEffect } from 'react';
import Papa from 'papaparse';

export interface CSVData {
  [key: string]: string;
}

export const useCSVData = (csvUrl: string) => {
  const [data, setData] = useState<CSVData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    Papa.parse(csvUrl, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        console.log('CSV Parsing complete. Data:', result.data);
        setData(result.data as CSVData[]);
        setLoading(false);
      },
      error: (err) => {
        console.error('CSV Parsing error:', err);
        setError(err.message);
        setLoading(false);
      },
    });
  }, [csvUrl]);

  return { data, loading, error };
};
