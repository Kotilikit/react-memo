import styles from "./Tooltip.module.css";

export function Tooltip({ text, position, placement }) {
  return (
    <div className={`${styles.tooltip} ${styles[placement]}`} style={{ top: position.top, left: position.left }}>
      {text}
    </div>
  );
}
