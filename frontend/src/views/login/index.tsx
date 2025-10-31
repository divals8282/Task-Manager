import "./styles.scss";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { schema, type LoginFormT } from "./form.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatFormErrorsToMessage } from "@/utils/format-form-errors-to-message";
import { loginServer, type LoginErrorResponseI } from "./login.server";
import { useNavigate } from "react-router";
import axios from "axios";
import { useUserStore } from "@/zustand-stores/user";

export const LoginView = () => {
  const userStore = useUserStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  useEffect(() => {
    const message = formatFormErrorsToMessage(errors);

    if (Object.keys(errors).length > 0) {
      toast.error(message);
    }
  }, [errors]);

  const onSubmit = async (data: LoginFormT) => {
    try {
      const {
        data: {
          email,
          lastname,
          name,
          auth: { accessToken, refreshToken },
        },
      } = await loginServer(data);

      toast.success(<p className="text-success">You are logged in</p>);

      localStorage.setItem(
        "credentials",
        JSON.stringify({ accessToken, refreshToken })
      );

      userStore.setUserInfo({
        email,
        lastname,
        name,
      });

      userStore.changeStatus("Authorized");

      navigate("/dashboard");
    } catch (error) {
      if (axios.isAxiosError<LoginErrorResponseI>(error)) {
        toast.error(
          <p className="text-destructive">{error.response?.data.message}</p>
        );
      }
    }
  };

  return (
    <div className="login-view">
      <form onSubmit={handleSubmit(onSubmit)} className="login-view__box">
        <div className="login-view__box__controller">
          <h1>Login</h1>
        </div>
        <div className="login-view__box__controller">
          <label htmlFor="email" className="login-view__box__input--label">
            Email
          </label>
          <Input {...register("email")} id="email" />
        </div>
        <div className="login-view__box__controller">
          <label htmlFor="password" className="login-view__box__input--label">
            Password
          </label>
          <Input {...register("password")} id="password" type="password" />
        </div>
        <div className="login-view__box__controller">
          <Button variant={"default"} type="submit">
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};
