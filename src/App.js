import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SideNav from "./components/sideNav/SideNav";
import Dashboard from "./pages/dashboard/Dashboard";
import DetailKurs from "./pages/detailKurs/DetailKurs";
import "./scss/main.scss";
import AddKurs from "./components/addKurs/AddKurs";
// Initialize Firebase
// Initialize Cloud Firestore and get a reference to the service

function App() {
    return (
        <>
            <Router>
                <SideNav />
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/addkurs" element={<AddKurs />} />
                    <Route path="/detailKurs/:id" element={<DetailKurs />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
