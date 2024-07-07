import { createContext, useState } from "react";

export const EasyModeContext = createContext(null);
export const EasyModeProvider = ({ children }) => {
  const [isEasyMode, setEasyMode] = useState(false);

  return <EasyModeContext.Provider value={{ isEasyMode, setEasyMode }}>{children}</EasyModeContext.Provider>;
};
