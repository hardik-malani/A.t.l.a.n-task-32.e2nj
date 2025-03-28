import React from "react";
import styles from "./ContextMenu.module.css";

interface ContextMenuProps {
  x: number;
  y: number;
  isVisible: boolean;
  tableName: string;
  onSelect: (tableName: string) => void;
  onInsert: (tableName: string) => void;
  onAlter: (tableName: string) => void;
  onClose: () => void;
}

const ContextMenuComponent: React.FC<ContextMenuProps> = ({
  x,
  y,
  isVisible,
  tableName,
  onSelect,
  onInsert,
  onAlter,
  onClose,
}) => {
  if (!isVisible) return null;

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`${styles.contextMenu} ${isVisible ? styles.visible : ""}`}
      style={{ top: y, left: x }}
      onClick={handleMenuClick}
    >
      <button
        className={styles.menuItem}
        onClick={() => {
          onSelect(tableName);
          onClose();
        }}
      >
        SELECT
      </button>
      <button
        className={styles.menuItem}
        onClick={() => {
          onInsert(tableName);
          onClose();
        }}
      >
        INSERT
      </button>
      <button
        className={styles.menuItem}
        onClick={() => {
          onAlter(tableName);
          onClose();
        }}
      >
        ALTER
      </button>
    </div>
  );
};

const ContextMenu = React.memo(ContextMenuComponent);
export default ContextMenu;
