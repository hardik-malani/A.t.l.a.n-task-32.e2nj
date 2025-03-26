import React, { useState } from 'react';
import styles from './QueryEditor.module.css';
import { Play } from 'lucide-react';

const QueryEditorComponent: React.FC = () => {
  const [query, setQuery] = useState('');
  const editorId = 'sql-query-editor';

  return (
    <div className={styles.container}>
      <label htmlFor={editorId} className={styles.visuallyHidden} id="query-editor-label">
        SQL Query Input
      </label>
      <textarea
        id={editorId}
        className={styles.textarea}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Write your SQL query here..."
        aria-label="SQL Query Input"
      />
      <button className={styles.button} onClick={() => console.log('Executing query:', query)}>
        <Play size={16} />
        Execute Query
      </button>
    </div>
  );
};

const QueryEditor = React.memo(QueryEditorComponent);
export default QueryEditor;