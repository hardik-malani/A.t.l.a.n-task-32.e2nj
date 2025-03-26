import React from 'react';
import styles from './TableDisplay.module.css';
import { useCSVData } from '../../hooks/useCSVData';

const TableDisplay: React.FC = () => {

  const { data, loading, error } = useCSVData('/orders.csv');

  if (loading) {
    return <div>Loading CSV data...</div>;
  }

  if (error) {
    return <div>Error loading CSV data: {error}</div>;
  }

  if (data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(row).map((value, colIndex) => (
                <td key={colIndex}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableDisplay;
