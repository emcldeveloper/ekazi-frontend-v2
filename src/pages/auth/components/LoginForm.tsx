import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useLogin } from "@/hooks/auth";
import type { LoginPayload } from "@/@types/auth";
import { getErrorMessage } from "@/utils/axios-helpers";

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const USER_ROLE_ID = 12;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginPayload>();

  // login
  const { mutate: loginUser, isPending } = useLogin();

  const onSubmit = (data: LoginPayload) => {
    loginUser(data, {
      onSuccess: (res) => {
        const role = res.data?.role_id;
        const verified = res.data?.verified === true;

        if (role !== USER_ROLE_ID) {
          toast.error("You are not authorized to access this app");
          return;
        }

        if (!verified) {
          navigate("/not-verified", { replace: true });
          return;
        }

        localStorage.setItem("token", res.token);
        localStorage.setItem("verified", String(res.data?.verified));

        toast.success(res?.message || "Logged in successfully");
        reset();
        navigate("/app/dashboard", { replace: true });
      },
      onError: (err) => {
        toast.error(getErrorMessage(err));
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="username">Email</FieldLabel>
          <Input
            id="username"
            type="username"
            placeholder="example@gmail.com"
            {...register("username", { required: "Email is required" })}
          />
          {errors.username && (
            <FieldError>{errors.username.message}</FieldError>
          )}
        </Field>

        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Link to={"/forgot-password"}>
              <span className="text-xs text-Blue font-semibold">
                forgot password?
              </span>
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="******"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
            >
              {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
            </span>
          </div>

          {errors.password && (
            <FieldError>{errors.password.message}</FieldError>
          )}
        </Field>
        <Field>
          <Button
            type="submit"
            disabled={isPending}
            className="bg-Blue hover:bg-blue-900"
          >
            {isPending ? "Logging in..." : "Login"}
          </Button>
        </Field>

        <FieldSeparator>Or</FieldSeparator>

        <FieldDescription className="text-center">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-Blue hover:text-blue-600">
            Register
          </Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
