import StarIcon from "@mui/icons-material/Star";
import { ToggleButton as ToggleButtonMUI } from "@mui/material";
export const ToggleButton = ({ item, handleSelected }) => {
  return (
    <>
      <ToggleButtonMUI
        sx={{
          fontSize: "1rem",
          display: "flex",
          alignItems: "center",
        }}
        onChange={() => handleSelected(item)}
        selected={item.selected}
        fullWidth
        value={item.name}
        key={item.id}
      >
        {item.name}
        {item.selected && (
          <StarIcon
            sx={{
              pl: 1,
              color: "yellow",
            }}
          />
        )}
      </ToggleButtonMUI>
    </>
  );
};
