import styles from "./EndGameModal.module.css";
import { Button } from "../Button/Button";
import deadImageUrl from "./images/dead.png";
import celebrationImageUrl from "./images/celebration.png";
import { LeaderboardLink } from "../LeaderBoardLink/LeaderBoardLink";
import { postLeader } from "../../api";
import { useContext, useState } from "react";
import { EasyModeContext } from "../../context/easyMode";
import { useEpiphanyAchievement } from "../../context/hooks/useEpiphanyAchievement";

export function EndGameModal({ isWon, gameDurationSeconds, gameDurationMinutes, onClick, game }) {
  const { isEasyMode } = useContext(EasyModeContext);
  const { hasEpiphanyAchievement } = useEpiphanyAchievement();
  const title = isWon ? "Вы победили!" : "Вы проиграли!";

  const imgSrc = isWon ? celebrationImageUrl : deadImageUrl;

  const imgAlt = isWon ? "celebration emodji" : "dead emodji";

  const newLeader = game === 9;

  const [leaderName, setLeaderName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const totalGameDuration = gameDurationMinutes * 60 + gameDurationSeconds;

  const handlePostLeader = () => {
    if (leaderName.trim() === "") {
      setErrorMessage("Введите имя");
      return;
    }
    setErrorMessage("");
    const achievements = [];
    if (!isEasyMode) {
      achievements.push(1);
    }
    if (!hasEpiphanyAchievement) {
      achievements.push(2);
    }
    postLeader({ name: leaderName, time: totalGameDuration, achievements })
      .then(() => {
        setIsSubmitted(true);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <div className={styles.modal}>
        <img className={styles.image} src={imgSrc} alt={imgAlt} />
        {newLeader && isWon ? (
          <>
            <h2 className={styles.newLeaderTitle}>
              Вы попали <br /> на Лидерборд!
            </h2>
            {!isSubmitted ? (
              <>
                <input
                  className={`${styles.newLeaderName} ${errorMessage ? styles.errorInput : ""}`}
                  onChange={e => {
                    setLeaderName(e.target.value);
                    if (e.target.value.trim() !== "") {
                      setErrorMessage("");
                    }
                  }}
                  type="text"
                  placeholder="Введите ваше имя"
                />
                {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                <Button onClick={handlePostLeader}>Добавить</Button>
              </>
            ) : (
              <p className={styles.successMessage}>Ваш результат успешно добавлен!</p>
            )}
          </>
        ) : (
          <h2 className={styles.title}>{title}</h2>
        )}

        <p className={styles.description}>Затраченное время:</p>
        <div className={styles.time}>
          {gameDurationMinutes.toString().padStart(2, "0")}.{gameDurationSeconds.toString().padStart(2, "0")}
        </div>

        <Button onClick={onClick}>Начать сначала</Button>
        {newLeader && isWon ? <LeaderboardLink>Перейти к лидерборду</LeaderboardLink> : null}
      </div>
    </>
  );
}
