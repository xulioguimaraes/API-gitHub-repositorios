import "./App.css";
import { SearchProvider } from "./hooks/useValues";
import { Routes } from "./routes/Routes";

function App() {
  return (
    <>
      <SearchProvider>
        <Routes />
      </SearchProvider>
    </>
  );
}

export default App;
