import { createContext, useState } from "react";

export const EpiphanyAchievementContext = createContext(null);

export const EpiphanyAchievementProvider = ({ children }) => {
  const [hasEpiphanyAchievement, setEpiphanyAchievement] = useState(false);

  return (
    <EpiphanyAchievementContext.Provider value={{ hasEpiphanyAchievement, setEpiphanyAchievement }}>
      {children}
    </EpiphanyAchievementContext.Provider>
  );
};
