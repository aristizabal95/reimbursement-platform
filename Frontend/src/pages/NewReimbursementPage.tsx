import {
  Typography,
  Stack,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextField,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";

const NewReimbursementPage = () => {
  const theme = useTheme();
  const [event, setEvent] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setEvent(event.target.value as string);
  };

  return (
    <Stack
      sx={{
        height: "80vh",
        width: "30%",
        display: "flex",
        padding: 4,
        flexDirection: "column",
      }}
      spacing={2}
    >
      <Typography variant="h2" color={theme.palette.text.primary}>
        New Reimbursement
      </Typography>
      <Stack
        direction={"column"}
        border={2}
        borderRadius={"5px"}
        height={"75vh"}
        padding={2}
        borderColor="lightgray"
        spacing={4}
        boxShadow={1}
      >
        <Stack spacing={1}>
          <Typography variant="h5" color={theme.palette.text.primary}>
            Event
          </Typography>
          <Typography variant="body2" color={theme.palette.text.primary}>
            Which event are you requesting reimbursement for?
          </Typography>
          <FormControl fullWidth>
            <Select
              value={event}
              color="primary"
              required
              onChange={handleChange}
            >
              <MenuItem value={10}>Event 1</MenuItem>
              <MenuItem value={20}>Event 2</MenuItem>
              <MenuItem value={30}>Event 3</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Stack spacing={1}>
          <Typography variant="h5" color={theme.palette.text.primary}>
            Description
          </Typography>
          <TextField
            multiline
            rows={4}
            placeholder="Describe the event and what you are requesting reimbursement for."
          />
        </Stack>
        <Stack spacing={1}>
          <Typography variant="h5" color={theme.palette.text.primary}>
            Invoices
          </Typography>
          <Stack
            height={110}
            border={2}
            borderRadius={"5px"}
            borderColor="lightgray"
            p={1}
          >
            <Typography variant="body2" color={theme.palette.text.primary}>
              Upload invoices for the event.
            </Typography>
          </Stack>
          <Button variant="outlined" color="primary">
            Upload invoices
          </Button>
        </Stack>
        <Stack direction={"row"} justifyContent="space-between">
          <Typography variant="h4" color={theme.palette.text.primary}>
            Total:
          </Typography>
          <Typography variant="h4" color={theme.palette.text.primary}>
            $0.00
          </Typography>
        </Stack>
        <Button variant="contained" color="secondary">
          Submit request
        </Button>
      </Stack>
    </Stack>
  );
};

export default NewReimbursementPage;
