import { useTheme } from "@mui/material/styles";

export function Loader() {
  const theme = useTheme();
  return (
    <div className="spinner-container">
      <div
        className="loading-spinner"
        style={{
          borderTopColor: theme.palette.secondary.main,
        }}
      ></div>
    </div>
  );
}
