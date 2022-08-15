import { Box, Typography } from "@mui/material";

export const Text = ({ title }) => {
  return (
    <>
      <Box display={"flex"} justifyContent={"center"} alignItems="center">
        <Typography component="h1" fontWeight="bold" fontSize={26}>
          {title}
        </Typography>
      </Box>
    </>
  );
};
