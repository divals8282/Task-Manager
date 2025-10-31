import "./styles.scss";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { schema, type RegisterFormT } from "./form.schema";
import { useEffect, useState } from "react";
import { formatFormErrorsToMessage } from "@/utils/format-form-errors-to-message";
import { toast } from "sonner";
import { registerServer, type RegisterErrorResponseI } from "./register.server";
import { useNavigate } from "react-router";
import axios from "axios";

export const RegisterView = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });
  const navigate = useNavigate();
  const [reEnteredPassword, setReEnteredPassword] = useState("");

  useEffect(() => {
    const message = formatFormErrorsToMessage(errors);

    if (Object.keys(errors).length > 0) {
      toast.error(message);
    }
  }, [errors]);

  const onSubmit = async (data: RegisterFormT) => {
    if (data.password !== reEnteredPassword) {
      toast.error(<p className="text-destructive">Passwords do not match</p>);
      return;
    }

    try {
      await registerServer(data);

      toast.success(<p className="text-success">User created successfully</p>);

      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError<RegisterErrorResponseI>(error)) {
        toast.error(
          <p className="text-destructive">{error.response?.data.message}</p>
        );
      }
    }
  };

  return (
    <div className="register-view">
      <form onSubmit={handleSubmit(onSubmit)} className="register-view__box">
        <div className="register-view__box__controller">
          <h1>Register</h1>
        </div>
        <div className="register-view__box__controller">
          <label htmlFor="email" className="register-view__box__input--label">
            Email
          </label>
          <Input {...register("email")} id="email" />
        </div>
        <div className="register-view__box__controller">
          <label htmlFor="name" className="register-view__box__input--label">
            Name
          </label>
          <Input {...register("name")} name="name" id="name" type="text" />
        </div>
        <div className="register-view__box__controller">
          <label
            htmlFor="lastname"
            className="register-view__box__input--label"
          >
            Last Name
          </label>
          <Input
            {...register("lastname")}
            name="lastname"
            id="lastname"
            type="text"
          />
        </div>
        <div className="register-view__box__controller">
          <label
            htmlFor="password"
            className="register-view__box__input--label"
          >
            Password
          </label>
          <Input
            {...register("password")}
            name="password"
            id="password"
            type="password"
          />
        </div>
        <div className="login-view__box__controller">
          <label
            htmlFor="reenter_password"
            className="login-view__box__input--label"
          >
            ReEnter Password
          </label>
          <Input
            value={reEnteredPassword}
            onChange={(e) => setReEnteredPassword(e.target.value)}
            id="reenter_password"
            type="password"
          />
        </div>
        <div className="register-view__box__controller">
          <Button type="submit">Sign Up</Button>
        </div>
      </form>
    </div>
  );
};
