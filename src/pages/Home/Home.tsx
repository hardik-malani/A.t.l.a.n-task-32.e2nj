import React, { useState, Suspense, lazy, memo, useCallback, useEffect, useMemo } from 'react';
import { Table, TerminalSquare, LoaderCircle, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { nanoid } from 'nanoid';
import styles from './Home.module.css';
import type { QueryTab } from '../../components/QueryTabs/QueryTabs'; // Import interface

// Lazy Load Components
const TableDisplay = lazy(() => import('../../components/TableDisplay/TableDisplay'));
const ThemeToggle = memo(lazy(() => import('../../components/ThemeToggle/ThemeToggle')));
const QueryEditor = memo(lazy(() => import('../../components/QueryEditor/QueryEditor')));
const QueryTabs = lazy(() => import('../../components/QueryTabs'));

// --- Mappings ---
const tableFileMappings: Record<string, string> = {
  'orders': '/orders.csv',
  'order details': '/order_details.csv', 
  'order_details': '/order_details.csv',
  'large data': '/data-large.csv',
  'data-large': '/data-large.csv',
};

const displayTableNames: string[] = ['Orders', 'Order_Details', 'data-large'];

const LoadingSpinner: React.FC = () => (
    <div className={styles.spinnerContainer}>
        <LoaderCircle size={32} className={styles.spinnerIcon} />
        <span>Loading...</span>
    </div>
);

const createNewTab = (): QueryTab => ({
  id: nanoid(),
  title: `Query ${Math.floor(Math.random() * 1000)}`,
  query: '-- New Query',
});

// --- Main Home Component ---
const Home: React.FC = () => {
  const [selectedTableKey, setSelectedTableKey] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [tabs, setTabs] = useState<QueryTab[]>([createNewTab()]);
  const [activeTabId, setActiveTabId] = useState<string | null>(tabs[0]?.id || null);

  const selectedCsvUrl = selectedTableKey ? tableFileMappings[selectedTableKey] : null;
  const [loading] = useState(false); 

  const addTab = useCallback(() => {
    const newTab = createNewTab();
    setTabs(prevTabs => [...prevTabs, newTab]);
    setActiveTabId(newTab.id);
  }, []);

  const closeTab = useCallback((tabIdToClose: string) => {
    setTabs(prevTabs => {
      const closingTabIndex = prevTabs.findIndex(tab => tab.id === tabIdToClose);
      if (prevTabs.length <= 1) return prevTabs;
      const newTabs = prevTabs.filter(tab => tab.id !== tabIdToClose);
      if (activeTabId === tabIdToClose) {
        const newActiveIndex = Math.max(0, closingTabIndex - 1);
        setActiveTabId(newTabs[newActiveIndex]?.id || null);
      }
      return newTabs;
    });
  }, [activeTabId]);

  const updateTabQuery = useCallback((tabId: string, newQuery: string) => {
    setTabs(prevTabs =>
      prevTabs.map(tab =>
        tab.id === tabId ? { ...tab, query: newQuery } : tab
      )
    );
  }, []);

   useEffect(() => {
        if (tabs.length > 0 && !tabs.find(tab => tab.id === activeTabId)) {
            setActiveTabId(tabs[0].id);
        } else if (tabs.length === 0 && activeTabId !== null) {
            const newTab = createNewTab();
            setTabs([newTab]);
            setActiveTabId(newTab.id);
        }
   }, [tabs, activeTabId]);

  const handleTableSelect = useCallback((displayTableName: string) => {

    const lowerCaseKey = displayTableName.toLowerCase();
    
    const matchingKey = Object.keys(tableFileMappings).find(key => key === lowerCaseKey || key.replace(/[-_]/g, ' ') === lowerCaseKey);

    if (matchingKey && matchingKey !== selectedTableKey) {
        setSelectedTableKey(matchingKey);
    } else if (matchingKey === selectedTableKey) {
      
        console.log(`Table ${displayTableName} already selected.`);
    } else {
        console.warn(`No file mapping found for table: ${displayTableName}`);
    }
  }, [selectedTableKey]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>, displayTableName: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleTableSelect(displayTableName);
    }
  };

  
  const handleExecuteQuery = (query: string) => {
    console.log(`Executing query from tab ${activeTabId}:`, query);

    
    const match = query.match(/SELECT\s+\*\s+FROM\s+([\w\s_-]+);?/i);

    if (match && match[1]) {
      const requestedTable = match[1].trim().toLowerCase();
      console.log("Parsed table name:", requestedTable);

      const matchingKey = Object.keys(tableFileMappings).find(key => key === requestedTable || key.replace(/[-_]/g, ' ') === requestedTable);

      if (matchingKey) {
        console.log(`Query matched table key: ${matchingKey}. Displaying corresponding data.`);
        setSelectedTableKey(matchingKey);
      } else {
        alert(`Table "${match[1].trim()}" not found in available mappings.`);
        setSelectedTableKey(null);
      }
    } else {
      alert('Query format not recognized. Please use "SELECT * FROM tablename;"');
      setSelectedTableKey(null);
    }
  };

  const containerClass = `${styles.container} ${!isSidebarOpen ? styles.sidebarCollapsed : ''}`;
  const activeTab = useMemo(() => tabs.find(tab => tab.id === activeTabId), [tabs, activeTabId]);


  const selectedDisplayTable = useMemo(() => {
    if (!selectedTableKey) return null;
    
    return displayTableNames.find(name => name.toLowerCase() === selectedTableKey || name.toLowerCase() === selectedTableKey.replace(/[-_]/g, ' ')) || null;
  }, [selectedTableKey]);


  return (
    <div className={containerClass}>
      <header className={styles.header}>
        <button onClick={toggleSidebar} className={styles.sidebarToggleBtn} aria-label={isSidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}>
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
                {displayTableNames.map((displayTableName) => (
                    <li
                        key={displayTableName}
                        className={`${styles.tableItem} ${selectedDisplayTable === displayTableName ? styles.activeTableItem : ''}`}
                        onClick={() => handleTableSelect(displayTableName)}
                        onKeyDown={(e) => handleKeyDown(e, displayTableName)}
                        role="button"
                        tabIndex={isSidebarOpen ? 0 : -1}
                        aria-current={selectedDisplayTable === displayTableName ? 'page' : undefined}
                    >
                        <Table size={16} className={styles.tableIcon} />
                        <span className={styles.tableItemText}>{displayTableName}</span>
                    </li>
                ))}
                </ul>
            </nav>
        </aside>

        <main className={styles.main}>
          <div className={styles.workspace}>
            <section className={styles.querySection} aria-labelledby="query-editor-label">
              <Suspense fallback={<LoadingSpinner />}>
                 <QueryTabs
                    tabs={tabs}
                    activeTabId={activeTabId}
                    onTabChange={setActiveTabId}
                    onAddTab={addTab}
                    onCloseTab={closeTab}
                 />
                 {activeTab ? (
                    <QueryEditor
                      key={activeTab.id}
                      value={activeTab.query}
                      onChange={(newQuery) => updateTabQuery(activeTab.id, newQuery)}
                      onExecute={handleExecuteQuery}
                    />
                 ) : (
                    <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-secondary)'}}>
                      Please add or select a query tab.
                    </div>
                 )}
              </Suspense>
            </section>

             <section className={styles.resultSection} aria-live="polite" aria-busy={loading}>
              {!selectedCsvUrl && !loading && (
                <div className={styles.placeholder}>Please select a table or execute a valid 'SELECT * FROM table;' query.</div>
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