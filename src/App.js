import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import SideNav from "./components/sideNav/SideNav";
import Dashboard from "./pages/dashboard/Dashboard";
import DetailKurs from "./pages/detailKurs/DetailKurs";
import "./scss/main.scss";
import AddKurs from "./components/addKurs/AddKurs";
import { ThemeProvider } from "@emotion/react";
// Initialize Firebase
// Initialize Cloud Firestore and get a reference to the service
const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "hsl(0, 0%, 100%)",
            contrastText: "#fff",
        },
        secondary: {
            main: "hsl(163, 100%, 46%)",
            contrastText: "#fff",
        },
    },
});
function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Router>
                    <SideNav />
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/addkurs" element={<AddKurs />} />
                        <Route
                            path="/detailKurs/:id"
                            element={<DetailKurs />}
                        />
                    </Routes>
                </Router>
            </ThemeProvider>
        </>
    );
}

export default App;
