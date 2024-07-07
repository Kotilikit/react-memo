import { Link } from "react-router-dom";
import styles from "./SelectLevelPage.module.css";
import { useEasyMode } from "../../context/hooks/useEasyMode";
import Checkbox from "../../components/Checkbox/Checkbox";

export function SelectLevelPage() {
  const { setEasyMode } = useEasyMode();
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Выбери сложность</h1>
        <ul className={styles.levels}>
          <li className={styles.level}>
            <Link className={styles.levelLink} to="/game/3">
              1
            </Link>
          </li>
          <li className={styles.level}>
            <Link className={styles.levelLink} to="/game/6">
              2
            </Link>
          </li>
          <li className={styles.level}>
            <Link className={styles.levelLink} to="/game/9">
              3
            </Link>
          </li>
        </ul>
        <Checkbox
          id={"modeCheckbox"}
          name={"modeCheckbox"}
          label={"Легкий режим"}
          onClick={() => {
            setEasyMode(prev => !prev);
          }}
        />
      </div>
    </div>
  );
}
