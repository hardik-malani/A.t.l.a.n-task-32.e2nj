import React, { useMemo, useRef, useEffect, useState } from 'react';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import styles from './TableDisplay.module.css';  // Corrected path
import { useCSVData } from '../../hooks/useCSVData';

const ROW_HEIGHT = 35;
const MIN_COLUMN_WIDTH = 150;

interface TableDisplayProps {
  csvUrl: string;
}

const TableDisplay: React.FC<TableDisplayProps> = ({ csvUrl }) => {
  const { data, loading, error } = useCSVData(csvUrl);
  const listContainerRef = useRef<HTMLDivElement>(null);
  const headerWrapperRef = useRef<HTMLDivElement>(null);
  const headerRowRef = useRef<HTMLDivElement>(null); // Target for transform
  const listRef = useRef<List>(null);
  const [listHeight, setListHeight] = useState(400);
  const [containerWidth, setContainerWidth] = useState(0);

  const columns = useMemo(() => {
    if (data.length > 0 && data[0]) {
      return Object.keys(data[0]);
    }
    return [];
  }, [data]);

  const totalMinimumContentWidth = useMemo(() => {
    return columns.length * MIN_COLUMN_WIDTH;
  }, [columns]);

  const actualInnerWidth = useMemo(() => {
    return Math.max(totalMinimumContentWidth, containerWidth);
  }, [totalMinimumContentWidth, containerWidth]);

  useEffect(() => {
    const container = listContainerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        setListHeight(entry.contentRect.height);
        setContainerWidth(entry.contentRect.width);
      }
    });

    resizeObserver.observe(container);
    setListHeight(container.clientHeight);
    setContainerWidth(container.clientWidth);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const scrollSyncContainer = listContainerRef.current;
    const headerToMove = headerRowRef.current;

    if (!scrollSyncContainer || !headerToMove) return;

    let rafId: number | null = null;

    const handleScroll = (event: Event) => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(() => {
          const target = event.target as HTMLDivElement;
          const scrollLeft = target.scrollLeft;
          headerToMove.style.transform = `translateX(-${scrollLeft}px)`;
          rafId = null;
      });
    };

    scrollSyncContainer.addEventListener('scroll', handleScroll);
    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      scrollSyncContainer.removeEventListener('scroll', handleScroll);
      if (headerToMove) {
        headerToMove.style.transform = 'translateX(0px)';
      }
    };
  }, []);

  const innerStyle = useMemo(() => ({
    width: `${actualInnerWidth}px`,
    height: `${(data?.length || 0) * ROW_HEIGHT}px`,
  }), [actualInnerWidth, data?.length]);

  if (loading) {
    return (<div className={styles.container}> {/* Keep outer structure */}
                <div className={styles.statusMessage}>Loading data from {csvUrl}...</div>
            </div>);
  }
  if (error) {
     return (<div className={styles.container}>
                 <div className={`${styles.statusMessage} ${styles.errorMessage}`}>Error: {error}</div>
            </div>);
  }

  const Row = ({ index, style }: ListChildComponentProps) => {
    const rowData = data[index];
    if (!rowData) return <div style={style}></div>;

    const rowStyle = { ...style, width: `${actualInnerWidth}px` };

    return (
      <div className={styles.row} style={rowStyle}>
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
      <div ref={headerWrapperRef} className={styles.headerWrapper}>
        <div ref={headerRowRef} className={styles.headerRow} style={{ width: `${actualInnerWidth}px` }}>
          {columns.map((colKey) => (
            <div className={styles.headerCell} key={colKey} title={colKey}>
              {colKey}
            </div>
          ))}
        </div>
      </div>

      <div ref={listContainerRef} className={styles.listContainer}>
        {data.length === 0 ? (
          <div className={styles.statusMessage}>No data available in {csvUrl} or the file is empty.</div>
        ) : (
          <List
            ref={listRef}
            layout="vertical"
            height={listHeight}
            itemCount={data.length}
            itemSize={ROW_HEIGHT}
            width="100%"
            innerElementType={(props) => <div {...props} style={{ ...props.style, ...innerStyle }} />}
            itemKey={(index) => data[index]?.orderID || index}
          >
            {Row}
          </List>
        )}
      </div>
    </div>
  );
};

export default TableDisplay;