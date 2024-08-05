import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SelectLevelPage.module.css";
import { useEasyMode } from "../../context/hooks/useEasyMode";
import Checkbox from "../../components/Checkbox/Checkbox";
import { LeaderboardLink } from "../../components/LeaderBoardLink/LeaderBoardLink";

export function SelectLevelPage() {
  const { setEasyMode } = useEasyMode();
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const startGame = () => {
    if (selectedLevel !== null) {
      navigate(`/game/${selectedLevel}`);
    } else {
      setError("Выберите уровень сложности.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Выбери сложность</h1>
        <ul className={styles.levels}>
          <li className={styles.level} style={{ borderColor: selectedLevel === 3 ? "#004980" : "transparent" }}>
            <button
              className={styles.levelLink}
              onClick={() => {
                setSelectedLevel(3);
                setError("");
              }}
            >
              1
            </button>
          </li>
          <li className={styles.level} style={{ borderColor: selectedLevel === 6 ? "#004980" : "transparent" }}>
            <button
              className={styles.levelLink}
              onClick={() => {
                setSelectedLevel(6);
                setError("");
              }}
            >
              2
            </button>
          </li>
          <li className={styles.level} style={{ borderColor: selectedLevel === 9 ? "#004980" : "transparent" }}>
            <button
              className={styles.levelLink}
              onClick={() => {
                setSelectedLevel(9);
                setError("");
              }}
            >
              3
            </button>
          </li>
        </ul>
        <Checkbox
          id={"modeCheckbox"}
          name={"modeCheckbox"}
          label={"Легкий режим (3 жизни)"}
          onClick={() => {
            setEasyMode(prev => !prev);
          }}
        />
        {error && <div className={styles.error}>{error}</div>}
        <button className={styles.startButton} onClick={startGame}>
          Начать игру
        </button>
        <LeaderboardLink>Перейти к лидерборду</LeaderboardLink>
      </div>
    </div>
  );
}
