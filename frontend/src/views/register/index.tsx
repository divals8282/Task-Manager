import "./styles.scss";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const RegisterView = () => {
  return (
    <div className="register-view">
      <div className="register-view__box">
        <div className="register-view__box__controller">
          <h1>Register</h1>
        </div>
        <div className="register-view__box__controller">
          <label htmlFor="email" className="register-view__box__input--label">
            Email
          </label>
          <Input id="email" />
        </div>
        <div className="register-view__box__controller">
          <label
            htmlFor="password"
            className="register-view__box__input--label"
          >
            Password
          </label>
          <Input id="password" type="password" />
        </div>
        <div className="register-view__box__controller">
          <label htmlFor="name" className="register-view__box__input--label">
            Name
          </label>
          <Input id="name" type="text" />
        </div>
        <div className="register-view__box__controller">
          <label
            htmlFor="last_name"
            className="register-view__box__input--label"
          >
            Last Name
          </label>
          <Input id="last_name" type="text" />
        </div>
        <div className="register-view__box__controller">
          <Button variant={"default"}>Sign Up</Button>
        </div>
      </div>
    </div>
  );
};
