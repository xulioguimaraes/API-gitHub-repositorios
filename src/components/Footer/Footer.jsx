import { Box, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <>
      <Box
        bottom={0}
        component="footer"
        width={"100vw"}
        position="fixed"
        alignItems="center"
        display={"flex"}
        justifyContent="center"
        p={2}
        borderTop="1px solid"
        borderColor={"gray"}
        bgcolor="#1976d2"
      >
        <Typography component={"h1"}  fontSize={22} fontWeight="bold" color={"#FFF"}>Obrigado</Typography>
      </Box>
    </>
  );
};
