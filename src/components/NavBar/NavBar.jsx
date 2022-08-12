import { AppBar, Box, Button, Container, Toolbar } from "@mui/material";
import { Search } from "../Search/Search";
import { SearchIconWrapper } from "../Search/SearchIconWrapper";
import SearchIcon from "@mui/icons-material/Search";

import { StyledInputBase } from "../Search/StyledInputBase";
import { useNavigate } from "react-router-dom";
import { useValues } from "../../hooks/useValues";
const pages = [
  { name: "Home", route: "/" },
  { name: "Favoritos", route: "/favoritos" },
];

export const NavBar = () => {
  const { valueSearch, setValueSearch } = useValues();
  const navigate = useNavigate();
  const handleClickPage = (route) => {
    navigate(route);
  };
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: "100vw",
          top: 0,
          left: 0,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              justifyContent={"space-between"}
              width="100%"
              alignItems={"center"}
              display="flex"
            >
              <Box sx={{ display: "flex" }}>
                {pages.map((page) => (
                  <Button
                    key={page.name}
                    onClick={() => handleClickPage(page.route)}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page.name}
                  </Button>
                ))}
              </Box>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  value={valueSearch}
                  onChange={(e) => setValueSearch(e.target.value)}
                  placeholder="Pesquisar"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
