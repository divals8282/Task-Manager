import "./styles.scss";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const LoginView = () => {
  return (
    <div className="login-view">
      <div className="login-view__box">
        <div className="login-view__box__controller">
          <h1>Login</h1>
        </div>
        <div className="login-view__box__controller">
          <label htmlFor="email" className="login-view__box__input--label">
            Email
          </label>
          <Input id="email" />
        </div>
        <div className="login-view__box__controller">
          <label htmlFor="password" className="login-view__box__input--label">
            Password
          </label>
          <Input id="password" type="password" />
        </div>
        <div className="login-view__box__controller">
          <Button variant={"default"}>Sign In</Button>
        </div>
      </div>
    </div>
  );
};
