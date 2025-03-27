import React from 'react';
import styles from './QueryEditor.module.css';
import { Play } from 'lucide-react';

interface QueryEditorProps {
  value: string;
  onChange: (newQuery: string) => void;
  onExecute: (query: string) => void;
}

const QueryEditorComponent: React.FC<QueryEditorProps> = ({ value, onChange, onExecute }) => {
  const editorId = 'sql-query-editor';

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  const handleExecute = () => {
    onExecute(value);
  };

  return (
    <div className={styles.container}>
      <label htmlFor={editorId} className={styles.visuallyHidden} id="query-editor-label">
        SQL Query Input
      </label>
      <textarea
        id={editorId}
        className={styles.textarea}
        value={value}
        onChange={handleChange}
        placeholder="Write your SQL query here..."
        aria-label="SQL Query Input"
      />
      <button className={styles.button} onClick={handleExecute}>
        <Play size={16} />
        Execute Query
      </button>
    </div>
  );
};

const QueryEditor = React.memo(QueryEditorComponent);
export default QueryEditor;