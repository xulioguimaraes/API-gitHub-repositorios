import { createContext, useContext, useEffect, useState } from "react";

const SeachContext = createContext({});

export const SearchProvider = ({ children }) => {
  const [valueSearch, setValueSearch] = useState("");
  const [repositories, setRepositories] = useState([]);
  const [languageSelected, setLanguageSelected] = useState([]);

  useEffect(() => {
    const repos = localStorage.getItem("favorites");
    setRepositories(JSON.parse(repos));
    console.log(JSON.parse(repos));
  }, [languageSelected]);

  return (
    <SeachContext.Provider
      value={{
        valueSearch,
        setValueSearch,
        repositories,
        languageSelected,
        setLanguageSelected,
      }}
    >
      {children}
    </SeachContext.Provider>
  );
};

export const useValues = () => useContext(SeachContext);
