import styles from "./EndGameModal.module.css";
import { Button } from "../Button/Button";
import deadImageUrl from "./images/dead.png";
import celebrationImageUrl from "./images/celebration.png";
import { LeaderboardLink } from "../LeaderBoardLink/LeaderBoardLink";
import { postLeader } from "../../api";
import { useState } from "react";

export function EndGameModal({ isWon, gameDurationSeconds, gameDurationMinutes, onClick, game, achievements }) {
  const title = isWon ? "Вы победили!" : "Вы проиграли!";

  const imgSrc = isWon ? celebrationImageUrl : deadImageUrl;

  const imgAlt = isWon ? "celebration emodji" : "dead emodji";

  const newLeader = game === 9 ? true : false;

  const [leaderName, setLeaderName] = useState("Пользователь");
  const totalGameDuration = gameDurationMinutes * 60 + gameDurationSeconds;

  const handlePostLeader = () => {
    postLeader({ name: leaderName, time: totalGameDuration, achievements: achievements })
      .then()
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <div className={styles.modal}>
        <img className={styles.image} src={imgSrc} alt={imgAlt} />
        {newLeader === true && isWon === true ? (
          <h2 className={styles.newLeaderTitle}>
            Вы попали <br /> на Лидерборд!
          </h2>
        ) : (
          <h2 className={styles.title}>{title}</h2>
        )}
        {newLeader === true && isWon === true ? (
          <input
            className={styles.newLeaderName}
            onChange={e => {
              setLeaderName(e.target.value);
            }}
            onBlur={handlePostLeader}
            type="text"
            placeholder="Пользователь"
          />
        ) : null}

        <p className={styles.description}>Затраченное время:</p>
        <div className={styles.time}>
          {gameDurationMinutes.toString().padStart("2", "0")}.{gameDurationSeconds.toString().padStart("2", "0")}
        </div>

        <Button onClick={onClick}>Начать сначала</Button>
        {newLeader === true && isWon === true ? <LeaderboardLink>Перейти к лидерборду</LeaderboardLink> : null}
      </div>
    </>
  );
}
