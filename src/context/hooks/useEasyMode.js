import { useContext } from "react";
import { EasyModeContext } from "../easyMode";

export function useEasyMode() {
  return useContext(EasyModeContext);
}
