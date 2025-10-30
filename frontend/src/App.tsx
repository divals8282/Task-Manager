import "./styles.app.scss";

import { Outlet, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

function App() {
  const navigate = useNavigate();
  return (
    <div className="app">
      <div className="app__header">
        <div className="app__header__logo">
          <p>TASK MANAGER</p>
        </div>
        <div className="app__header__profile">
          <Button variant={"default"} onClick={() => navigate("/login")}>
            Login
          </Button>
          <Button variant={"default"} onClick={() => navigate("/register")}>
            Register
          </Button>
        </div>
      </div>
      <div className="app__content">
        <Outlet />
      </div>
      <div className="app__footer">Copyright 2025</div>
    </div>
  );
}

export default App;
