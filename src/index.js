import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { EasyModeProvider } from "./context/easyMode";
import { EpiphanyAchievementProvider } from "./context/epiphanyAchievement";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <EpiphanyAchievementProvider>
      <EasyModeProvider>
        <RouterProvider router={router}></RouterProvider>
      </EasyModeProvider>
    </EpiphanyAchievementProvider>
  </React.StrictMode>,
);
