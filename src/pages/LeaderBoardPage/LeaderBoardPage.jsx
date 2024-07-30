import { useNavigate } from "react-router-dom";
import styles from "./LeaderBoardPage.module.css";
import { useEffect, useState } from "react";
import { getLeaders } from "../../api";
import cn from "classnames";
import { Button } from "../../components/Button/Button";

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
          <div className={cn(styles.leaderTime, styles.gray)}>Время</div>
        </div>
        {leaders
          .sort((a, b) => a.time - b.time)
          .map((leader, index) => (
            <div className={styles.leadersContainer} key={leader.id}>
              <div className={styles.leaderPosition}># {index + 1}</div>
              <div className={styles.leaderName}>{leader.name}</div>
              <div className={styles.leaderTime}>{leader.time}</div>
            </div>
          ))}
      </div>
    </>
  );
}
