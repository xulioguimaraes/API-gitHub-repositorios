import { Box, Typography } from "@mui/material";
import { Footer } from "../components/Footer/Footer";
import { ToggleButton } from "../components/ToggleButton/ToggleButton";
import { useValues } from "../hooks/useValues";

export const Favorites = () => {
  const { repositories } = useValues();
  const handleSelected = () => {};
  return (
    <>
      <Box component="main" mt={12} >
        <Typography>Lista de Repositorios Favoritos</Typography>
        {repositories.map((item) => {
          return <ToggleButton item={item} handleSelected={handleSelected} />;
        })}
      </Box>
      <Footer/>
    </>
  );
};
