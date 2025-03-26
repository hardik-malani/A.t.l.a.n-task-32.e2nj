import React from 'react';
import { Table, TerminalSquare } from 'lucide-react';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';
import QueryEditor from '../../components/QueryEditor/QueryEditor';
import TableDisplay from '../../components/TableDisplay/TableDisplay';
import styles from './Home.module.css';

const Home: React.FC = () => {
  const availableTables = ['Orders'];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.appTitleContainer}>
          <TerminalSquare size={24} className={styles.appIcon} />
          <h1 className={styles.appTitle}>SQL Runner</h1>
        </div>
        <ThemeToggle />
      </header>
      <div className={styles.contentArea}>
      <aside className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Tables</h2>
        <ul className={styles.tableList}>
          {availableTables.map((tableName) => (
            <li key={tableName} className={styles.tableItem}>
              <Table size={16} className={styles.tableIcon} />
              {tableName}
            </li>
          ))}
        </ul>
      </aside>
      <main className={styles.main}>
        <div className={styles.workspace}>
          <section className={styles.querySection}>
            <QueryEditor />
          </section>
          <section className={styles.resultSection}>
            <TableDisplay />
          </section>
        </div>
      </main>
      </div>
    </div>
  );
};

export default Home;