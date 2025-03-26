import React, { useMemo } from 'react';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import styles from './TableDisplay.module.css';
import { useCSVData } from '../../hooks/useCSVData';

const ROW_HEIGHT = 35;
const TABLE_HEIGHT = 600;

const TableDisplay: React.FC = () => {
  
  const { data, loading, error } = useCSVData('/orders.csv');

  const columns = useMemo(() => {
    if (data.length > 0) {
      return Object.keys(data[0]);
    }
    return [];
  }, [data]);

  if (loading) {
    return <div>Loading CSV data...</div>;
  }

  if (error) {
    return <div>Error loading CSV data: {error}</div>;
  }

  if (data.length === 0) {
    return <div>No data available</div>;
  }

  const Row = ({ index, style }: ListChildComponentProps) => {
    const rowData = data[index];

    return (
      <div className={styles.row} style={style}>
        {columns.map((colKey) => (
          <div className={styles.cell} key={colKey}>
            {rowData[colKey]}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        {columns.map((colKey) => (
          <div className={styles.headerCell} key={colKey}>
            {colKey}
          </div>
        ))}
      </div>
      <List
        height={TABLE_HEIGHT}
        itemCount={data.length}
        itemSize={ROW_HEIGHT}
        width="100%"
      >
        {Row}
      </List>
    </div>
  );
};

export default TableDisplay;
