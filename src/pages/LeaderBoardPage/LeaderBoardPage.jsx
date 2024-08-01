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
import { Tooltip } from "../../components/Tooltip/Tooltip";

export function LeaderboardPage() {
  const [leaders, setLeaders] = useState([]);
  const [tooltip, setTooltip] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [tooltipPlacement, setTooltipPlacement] = useState("top");
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

  function showTooltip(text, placement, e) {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();

    setTooltipPosition({
      top: rect.top - 55 + window.scrollY,
      left: rect.left + window.scrollX,
    });
    setTooltipPlacement(placement);
    setTooltip(text);
  }

  function hideTooltip() {
    setTooltip(null);
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
          .slice(0, 10)
          .map((leader, index) => (
            <div className={styles.leadersContainer} key={leader.id}>
              <div className={styles.leaderPosition}># {index + 1}</div>
              <div className={styles.leaderName}>{leader.name}</div>
              <div className={styles.achievements}>
                <div
                  onMouseEnter={e =>
                    showTooltip(
                      leader.achievements.includes(1)
                        ? "Игра пройдена в сложном режиме"
                        : "Игра пройдена в легком режиме",
                      "top",
                      e,
                    )
                  }
                  onMouseLeave={hideTooltip}
                >
                  <img
                    src={leader.achievements.includes(1) ? withHardMode : withoutHardMode}
                    alt="Hard Mode Achievement"
                  />
                </div>
                <div
                  onMouseEnter={e =>
                    showTooltip(
                      leader.achievements.includes(2) ? "Игра пройдена без суперсил" : "Использована суперсила",
                      "top",
                      e,
                    )
                  }
                  onMouseLeave={hideTooltip}
                >
                  <img
                    src={leader.achievements.includes(2) ? withoutSuperpower : withSuperpower}
                    alt="Superpower Achievement"
                  />
                </div>
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
        {tooltip && <Tooltip text={tooltip} position={tooltipPosition} placement={tooltipPlacement} />}
      </div>
    </>
  );
}
