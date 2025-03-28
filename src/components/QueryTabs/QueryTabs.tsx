import React from 'react';
import { Plus, X } from 'lucide-react';
import styles from './QueryTabs.module.css';

export interface QueryTab {
  id: string;
  title: string;
  query: string;
}

interface QueryTabsProps {
  tabs: QueryTab[];
  activeTabId: string | null;
  onTabChange: (tabId: string) => void;
  onAddTab: () => void;
  onCloseTab: (tabId: string) => void;
}

const QueryTabs: React.FC<QueryTabsProps> = ({
  tabs,
  activeTabId,
  onTabChange,
  onAddTab,
  onCloseTab,
}) => {
  return (
    <div className={styles.tabsWrapper}>
      <div className={styles.tabsContainer} role="tablist" aria-label="Query Editor Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={tab.id === activeTabId}
            aria-controls={`query-editor-${tab.id}`}
            className={`${styles.tab} ${tab.id === activeTabId ? styles.activeTab : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.title}
            {tabs.length > 1 && (
              <button
                className={styles.closeButton}
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseTab(tab.id);
                }}
                aria-label={`Close ${tab.title}`}
                title={`Close ${tab.title}`}
              >
                <X size={14} />
              </button>
            )}
          </button>
        ))}
      </div>
      <button
          className={styles.addButton}
          onClick={onAddTab}
          aria-label="Add new query tab"
          title="Add new query tab"
        >
          <Plus size={16} />
      </button>
    </div>
  );
};

export default QueryTabs;