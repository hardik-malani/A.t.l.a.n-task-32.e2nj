import React from 'react';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';
import QueryEditor from '../../components/QueryEditor/QueryEditor';
import TableDisplay from '../../components/TableDisplay/TableDisplay';
import styles from './Home.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <header className={styles.header}>
        <h1>Welcome to the SQL Runner App</h1>
        <ThemeToggle />
      </header>
      <main className={styles.main}>
        <section className={styles.editorSection}>
          <QueryEditor />
        </section>
        <section className={styles.tableSection}>
          <TableDisplay />
        </section>
      </main>
    </div>
  );
};

export default Home;
