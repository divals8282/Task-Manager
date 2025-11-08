import "./styles.app.scss";

import { Outlet, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/zustand-stores/user";
import { useEffect } from "react";
import { getUserInfo } from "./server/user-info";
import { setNavigate } from "./navigator.outside";

function App() {
  const navigate = useNavigate();
  const userStore = useUserStore();

  const getAndSetUserInfo = async () => {
    const userInfo = await getUserInfo();

    if (userInfo) {
      userStore.setUserInfo(userInfo);
      userStore.changeStatus("Authorized");
    }
  };

  useEffect(() => {
    setNavigate(navigate);
    getAndSetUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logoutAction = () => {
    if (window.confirm("Are you sure?")) {
      userStore.changeStatus("Not-Authorized");
      localStorage.removeItem('credentials');
      navigate("/login");
    }
  };

  return (
    <div className="app">
      <div className="app__sidebar">
        <div className="app__sidebar__logo">
          <p>TASK MANAGER</p>
        </div>
        <div className="app__sidebar__profile">
          {userStore.status === "Authorized" ? (
            <>
              <div className="app__sidebar__profile--name">
                {userStore.email}
              </div>
              <Button onClick={() => logoutAction()}>Logout</Button>
            </>
          ) : (
            <>
              <Button variant={"default"} onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button variant={"default"} onClick={() => navigate("/register")}>
                Register
              </Button>
            </>
          )}
        </div>
        {userStore.status === "Authorized" ? (
          <div className="app__sidebar__navigation">
            <Button onClick={() => navigate("/board")}>Board</Button>
            <Button onClick={() => navigate("/epics")}>Epics</Button>
            <Button onClick={() => navigate("/stories")}>Stories</Button>
            <Button onClick={() => navigate("/tasks")}>Tasks</Button>
          </div>
        ) : null}
      </div>
      <div className="app__content">
        <Outlet />
      </div>
      <div className="app__footer">Copyright 2025</div>
    </div>
  );
}

export default App;
