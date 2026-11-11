import "@fontsource-variable/inter";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Telegram Mini App: tell Telegram the app is ready and open it full height
const tg = (window as any).Telegram?.WebApp;
if (tg?.initData) {
  tg.ready();
  tg.expand();
}
