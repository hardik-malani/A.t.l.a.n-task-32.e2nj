import React from "react";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import QueryEditor from "../../components/QueryEditor/QueryEditor";
import TableDisplay from "../../components/TableDisplay/TableDisplay";
import styles from "./Home.module.css";

const Home: React.FC = () => {
  const availableTables = ["Orders", "Customers", "Products", "Suppliers"];

  return (
    <div className={styles.home}>
      <aside className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Tables</h2>
        <ul className={styles.tableList}>
          {availableTables.map((table) => (
            <li key={table} className={styles.tableItem}>
              {table}
            </li>
          ))}
        </ul>
      </aside>

      <main className={styles.main}>
        <header className={styles.topHeader}>
          <h1 className={styles.appTitle}>SQL Runner App</h1>
          <ThemeToggle />
        </header>
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
  );
};

export default Home;
