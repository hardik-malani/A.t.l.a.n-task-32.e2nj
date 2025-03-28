import React from 'react';
import styles from './QueryEditor.module.css';
import { Play } from 'lucide-react';

interface QueryEditorProps {
  value: string;
  onChange: (newQuery: string) => void;
  onExecute: (query: string) => void;
  editorId: string;
}

const QueryEditorComponent: React.FC<QueryEditorProps> = ({ value, onChange, onExecute, editorId }) => {

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  const handleExecute = () => {
    onExecute(value);
  };

  return (
    <div className={styles.container} id={editorId} role="tabpanel" aria-labelledby={`tab-button-${editorId}`}>
      <label htmlFor={`${editorId}-textarea`} className={styles.visuallyHidden} id={`${editorId}-label`}>
        SQL Query Input
      </label>
      <textarea
        id={`${editorId}-textarea`}
        className={styles.textarea}
        value={value}
        onChange={handleChange}
        placeholder="Write your SQL query here..."
        aria-labelledby={`${editorId}-label`}
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