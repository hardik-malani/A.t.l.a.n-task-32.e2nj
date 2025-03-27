import React, { useState, Suspense, lazy, memo, useCallback } from 'react';
import { Table, TerminalSquare, LoaderCircle, PanelLeftClose, PanelLeftOpen } from 'lucide-react'; // Added icons
import styles from './Home.module.css';

const TableDisplay = lazy(() => import('../../components/TableDisplay/TableDisplay'));
const ThemeToggle = memo(lazy(() => import('../../components/ThemeToggle/ThemeToggle')));
const QueryEditor = memo(lazy(() => import('../../components/QueryEditor/QueryEditor')));


const tableMappings: Record<string, string> = {
  'Orders': '/orders.csv',
  'Order Details': '/order_details.csv',
  'Large Data': '/data-large.csv',
};

const LoadingSpinner: React.FC = () => (
    <div className={styles.spinnerContainer}>
        <LoaderCircle size={32} className={styles.spinnerIcon} />
        <span>Loading...</span>
    </div>
);


const Home: React.FC = () => {
  const [selectedTableKey, setSelectedTableKey] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for sidebar
  const selectedCsvUrl = selectedTableKey ? tableMappings[selectedTableKey] : null;

  const handleTableSelect = useCallback((tableKey: string) => {
    if (tableKey !== selectedTableKey) {
        setSelectedTableKey(tableKey);
    }
  }, [selectedTableKey]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);


  const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>, tableKey: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleTableSelect(tableKey);
    }
  };

  const containerClass = `${styles.container} ${!isSidebarOpen ? styles.sidebarCollapsed : ''}`;

  return (
    <div className={containerClass}>
      <header className={styles.header}>
        <button
          onClick={toggleSidebar}
          className={styles.sidebarToggleBtn}
          aria-label={isSidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
        >
          {isSidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
        </button>

        <div className={styles.appTitleContainer}>
          <TerminalSquare size={24} className={styles.appIcon} />
          <h1 className={styles.appTitle}>SQL Runner</h1>
        </div>
        <Suspense fallback={<div style={{ width: '40px', height: '36px' }}></div>}>
            <ThemeToggle />
        </Suspense>
      </header>
      <div className={styles.contentArea}>
        <aside className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>Tables</h2>
          <nav aria-label="Data tables">
            <ul className={styles.tableList}>
              {Object.keys(tableMappings).map((tableKey) => (
                <li
                  key={tableKey}
                  className={`${styles.tableItem} ${selectedTableKey === tableKey ? styles.activeTableItem : ''}`}
                  onClick={() => handleTableSelect(tableKey)}
                  onKeyDown={(e) => handleKeyDown(e, tableKey)}
                  role="button"
                  tabIndex={isSidebarOpen ? 0 : -1}
                  aria-current={selectedTableKey === tableKey ? 'page' : undefined}
                >
                  <Table size={16} className={styles.tableIcon} />
                  <span className={styles.tableItemText}>{tableKey}</span>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className={styles.main}>
          <div className={styles.workspace}>
            <section className={styles.querySection} aria-labelledby="query-editor-label">
                <Suspense fallback={<LoadingSpinner />}>
                    <QueryEditor />
                </Suspense>
            </section>
            <section className={styles.resultSection} aria-live="polite" aria-busy={!!selectedCsvUrl && !document.getElementById('table-display')}>
              {!selectedCsvUrl && (
                <div className={styles.placeholder}>Please select a table from the sidebar to view data.</div>
              )}
              {selectedCsvUrl && (
                <Suspense fallback={<LoadingSpinner />}>
                  <div id="table-display" style={{height: '100%', width: '100%'}}>
                     <TableDisplay key={selectedTableKey} csvUrl={selectedCsvUrl} />
                  </div>
                </Suspense>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;