import { useContext } from "react";
import { EpiphanyAchievementContext } from "../epiphanyAchievement";

export function useEpiphanyAchievement() {
  return useContext(EpiphanyAchievementContext);
}
