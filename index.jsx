import { createRoot } from "react-dom/client";
import { Board } from "./board";

const App = () => {
  return <Board />;
};

const rootDom = document.getElementById("root");
const root = createRoot(rootDom);
root.render(<App />);
