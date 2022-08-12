import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { api } from "../services/api";
import { useValues } from "../hooks/useValues";
import { ToggleButton } from "../components/ToggleButton/ToggleButton";

function Home() {
  const { valueSearch, setValueSearch, languageSelected, setLanguageSelected } =
    useValues();
  const [languages, setLanguages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [controler, setControler] = useState(false);
  const [nameLanguage, setNameLanguage] = useState("");
  const [selected, setSelected] = useState(false);
  useEffect(() => {
    try {
      api
        .get("/languages")
        .then(({ data }) => {
          setLanguages(data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
    setLanguageSelected([]);
  }, []);
  const filterLanguages =
    valueSearch.length > 0
      ? languages.filter((item) =>
          item.name.toLowerCase().includes(valueSearch.toLowerCase())
        )
      : [];
  const handleLanguages = async (language) => {
    setSelected(true);
    setIsLoading(true);
    setNameLanguage(language.name);
    try {
      await api
        .get(`/search/repositories?q=language:${language.aliases[0]}`)
        .then(({ data }) => {
          const newData = data.items.map((item) => {
            return { name: item.name, id: item.id, selected: false };
          });
          let localFavorites = localStorage.getItem("favorites");

          const aux = newData.map((item) => {
            if (localFavorites) {
              const repoItem = JSON.parse(localFavorites).filter((repo) => {
                if (repo.id === item.id) {
                  return repo;
                }
              });
              if (repoItem.length > 0) {
                const { name, id, selected } = repoItem[0];
                return { name, id, selected };
              }
            }
            return item;
          });
          setLanguageSelected(aux);
          setControler(!controler);
        })
        .finally(() => setIsLoading(false));
    } catch (error) {
      console.log(error);
    }
  };
  const handleClean = () => {
    setNameLanguage("");
    setSelected(false);
    setValueSearch("");
    setLanguageSelected([]);
  };

  const handleSelected = (repo) => {
    let localFavorites = localStorage.getItem("favorites");
    const repositories = languageSelected.map((item) => {
      if (item.id === repo.id) {
        return { ...item, selected: !item.selected };
      }
      return item;
    });
    setLanguageSelected(repositories);
    setControler(!controler);
  };
  const setDuplicateRepos = new Set();
  useEffect(() => {
    if (languageSelected?.length > 0 && selected) {
      let localFavorites = localStorage.getItem("favorites");
      let repoFiltered = languageSelected.filter(
        (item) => item.selected === true
      );
      if (repoFiltered.length > 0) {
        localStorage.setItem("favorites", JSON.stringify(repoFiltered));
      }
    }
  }, [languageSelected]);

  return (
    <>
      <Box
        px={2}
        position={"absolute"}
        display="flex"
        justifyContent={"space-around"}
        top={72}
        width="100%"
      >
        <Typography fontSize={24} textAlign="center">
          {nameLanguage?.length > 0
            ? "Linguagem selecionada é : " + nameLanguage
            : "Selecione uma linguagem"}
        </Typography>
        <Button onClick={handleClean} color="error" variant="contained" mr={2}>
          Limpar
        </Button>
      </Box>
      <Box mt={14} px={2}>
        {isLoading && (
          <Box display={"flex"} justifyContent={"center"} alignItems="center">
            <CircularProgress />
          </Box>
        )}
        <Box display="grid" gridTemplateColumns={"1fr 1fr 1fr"} gap={2}>
          {!selected && (
            <>
              {valueSearch.length > 0
                ? filterLanguages.map((item) => {
                    return (
                      <Button
                        key={item.name}
                        onClick={() => handleLanguages(item)}
                        fullWidth
                        variant="contained"
                      >
                        {item.name}
                      </Button>
                    );
                  })
                : languages.map((item) => {
                    return (
                      <Button
                        sx={{
                          height: "48px",
                        }}
                        onClick={() => handleLanguages(item)}
                        fullWidth
                        key={item.name}
                        variant="contained"
                      >
                        {item.name}
                      </Button>
                    );
                  })}
              {valueSearch.length > 0 && filterLanguages.length === 0 && (
                <>
                  <Typography>Nenhum resultado encontrado</Typography>
                </>
              )}
            </>
          )}

          {selected &&
            languageSelected.length > 0 &&
            languageSelected.map((item) => {
              return (
                <ToggleButton item={item} handleSelected={handleSelected} />
              );
            })}
        </Box>
        {selected && languageSelected.length === 0 && !isLoading && (
          <>
            <Box display={"flex"} justifyContent={"center"} alignItems="center">
              <Typography component="h1" fontWeight="bold" fontSize={26}>
                Nenhum resultado encontrado
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </>
  );
}

export default Home;
