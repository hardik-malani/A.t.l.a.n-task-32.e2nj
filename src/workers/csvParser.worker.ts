import Papa from 'papaparse';
import { CSVData } from '../hooks/useCSVData';

// Respond to messages from the main thread
self.onmessage = (event: MessageEvent<{ csvUrl: string }>) => {
  const { csvUrl } = event.data;

  if (!csvUrl) {
    self.postMessage({ error: 'No CSV URL provided' });
    return;
  }

  Papa.parse(csvUrl, {
    download: true,
    header: true,
    skipEmptyLines: true,
    worker: false,
    complete: (result) => {
      self.postMessage({ data: result.data as CSVData[] });
    },
    error: (err) => {
      self.postMessage({ error: err.message });
    },
  });
};

export {};