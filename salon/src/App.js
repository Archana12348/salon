import { BrowserRouter as Router, Routes } from "react-router-dom";
import { AdminRoutes } from "./admin/adminroutes";
import { FrontendRoutes } from "./frontend/frontendroutes";

function App() {
  return (
    <Router>
      <Routes>
        {FrontendRoutes}
        {AdminRoutes}
      </Routes>
    </Router>
  );
}

export default App;
