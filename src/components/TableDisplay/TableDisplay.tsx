import React, { useMemo } from 'react';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import styles from './TableDisplay.module.css';
import { useCSVData } from '../../hooks/useCSVData';

const ROW_HEIGHT = 35;
const TABLE_HEIGHT = 560;

interface TableDisplayProps {
  csvUrl: string;
}

const TableDisplay: React.FC<TableDisplayProps> = ({ csvUrl }) => {
  const { data, loading, error } = useCSVData(csvUrl);

  const columns = useMemo(() => {
    if (data.length > 0 && data[0]) {
      return Object.keys(data[0]);
    }
    return [];
  }, [data]);

  if (loading) {
    return <div className={styles.statusMessage}>Loading data from {csvUrl}...</div>;
  }

  if (error) {
    return <div className={`${styles.statusMessage} ${styles.errorMessage}`}>Error: {error}</div>;
  }

  if (data.length === 0) {
     return <div className={styles.statusMessage}>No data available in {csvUrl} or the file is empty.</div>;
  }

  const Row = ({ index, style }: ListChildComponentProps) => {
    const rowData = data[index];
    if (!rowData) return <div style={style}></div>;

    return (
      <div className={styles.row} style={style}>
        {columns.map((colKey) => (
          <div className={styles.cell} key={colKey} title={String(rowData[colKey] ?? '')}>
            {String(rowData[colKey] ?? '')}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        {columns.map((colKey) => (
          <div className={styles.headerCell} key={colKey} title={colKey}>
            {colKey}
          </div>
        ))}
      </div>
      <List height={TABLE_HEIGHT} itemCount={data.length} itemSize={ROW_HEIGHT} width="100%">
        {Row}
      </List>
    </div>
  );
};

export default TableDisplay;