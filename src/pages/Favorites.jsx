import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToggleButton } from "../components/ToggleButton/ToggleButton";
import { useValues } from "../hooks/useValues";

export const Favorites = () => {
  const { repositories } = useValues();
  const handleSelected = () => {};
  return (
    <>
      <Box mt={12}>
        <Typography>Lista de Repositorios Favoritos</Typography>
        {repositories.map((item) => {
          return <ToggleButton item={item} handleSelected={handleSelected} />;
        })}
      </Box>
    </>
  );
};
