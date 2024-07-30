import { useNavigate } from "react-router-dom";
import styles from "./LeaderBoardPage.module.css";
import { useEffect, useState } from "react";
import { getLeaders } from "../../api";
import cn from "classnames";
import { Button } from "../../components/Button/Button";
import withHardMode from "./images/withHardMode.svg";
import withoutHardMode from "./images/withoutHardMode.svg";
import withSuperpower from "./images/withSuperpower.svg";
import withoutSuperpower from "./images/withoutSuperpower.svg";

export function LeaderboardPage() {
  const [leaders, setLeaders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getLeaders()
      .then(data => {
        setLeaders(data.leaders);
      })
      .catch(error => {
        console.log(error);
      });
  }, [setLeaders]);

  function onClick() {
    navigate("/");
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>Лидерборд</div>
          <Button onClick={onClick}>Начать игру</Button>
        </div>
        <div className={styles.leadersContainer}>
          <div className={cn(styles.leaderPosition, styles.gray)}>Позиция</div>
          <div className={cn(styles.leaderName, styles.gray)}>Пользователь</div>
          <div className={cn(styles.leaderName, styles.gray)}>Достижения</div>
          <div className={cn(styles.leaderTime, styles.gray)}>Время</div>
        </div>
        {leaders
          .sort((a, b) => a.time - b.time)
          .map((leader, index) => (
            <div className={styles.leadersContainer} key={leader.id}>
              <div className={styles.leaderPosition}># {index + 1}</div>
              <div className={styles.leaderName}>{leader.name}</div>
              <div className={styles.achievements}>
                {leader.achievements.includes(1) ? (
                  <img src={withHardMode} alt="withHardMode" />
                ) : (
                  <img src={withoutHardMode} alt="withoutHardMode" />
                )}
                {leader.achievements.includes(2) ? (
                  <img src={withoutSuperpower} alt="withoutSuperpower" />
                ) : (
                  <img src={withSuperpower} alt="withSuperpower" />
                )}
              </div>
              <div className={styles.leaderTime}>
                {Math.floor(leader.time / 60)
                  .toString()
                  .padStart("2", "0")}
                :
                {Math.floor(leader.time % 60)
                  .toString()
                  .padStart("2", "0")}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
