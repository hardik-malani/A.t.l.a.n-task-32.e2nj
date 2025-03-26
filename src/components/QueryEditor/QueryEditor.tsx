import React, { useState } from 'react';
import styles from './QueryEditor.module.css';
import { Play } from 'lucide-react';

const QueryEditor: React.FC = () => {
  const [query, setQuery] = useState('');

  return (
    <div className={styles.container}>
      <textarea
        className={styles.textarea}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Write your SQL query here..."
      />
      <button className={styles.button} onClick={() => console.log('Executing query:', query)}>
        <Play size={16} />
        Execute Query
      </button>
    </div>
  );
};

export default QueryEditor;