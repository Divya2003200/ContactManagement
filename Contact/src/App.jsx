import { CssBaseline, Container, Typography } from "@mui/material";
import ContactTable from "./components/ContactTable";

export default function App() {
  return (
    <>
      <CssBaseline />
      <Container>
        <Typography variant="h4" sx={{ my: 3, textAlign: "center" }}>
          Contact Management
        </Typography>
        <ContactTable />
      </Container>
    </>
  );
}
