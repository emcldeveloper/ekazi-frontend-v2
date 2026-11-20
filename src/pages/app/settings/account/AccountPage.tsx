import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CheckCircle2, Loader } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import { useUpdateUser, useUser } from "@/hooks/auth";
import AccountImageModal from "./AccountImageModal";
import { BASE_URL } from "@/config";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/axios-helpers";

type FormDataPayload = {
  username: string;
  email: string;
};

const AccountPage = () => {
  const { data: user } = useUser();

  const accountImage = user?.profile_picture
    ? `${BASE_URL}/${user.profile_picture.replace(/^\//, "")}`
    : `${BASE_URL}/uploads/picture/pre_photo.jpg`;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDataPayload>();

  const { mutate: updateUser, isPending } = useUpdateUser();

  useEffect(() => {
    if (user) {
      reset({
        username: user.username,
        email: user.email,
      });
    }
  }, [user, reset]);

  const onSubmit = (data: FormDataPayload) => {
    const payload = {
      username: data.username,
    };

    updateUser(payload, {
      onSuccess: (res) => {
        toast.success(res?.message || "Username updated");

        reset();
      },
      onError: (err) => toast.error(getErrorMessage(err)),
    });
  };

  return (
    <Card className="mt-6 border shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">
          Account settings
        </CardTitle>

        <p className="text-sm text-muted-foreground">
          Manage your personal information and account preferences.
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <Avatar className="h-20 w-20 border">
              <AvatarImage src={accountImage} alt="Profile" />
              <AvatarFallback className="bg-blue-50 text-blue-700 text-xl">
                {user?.username?.charAt(0)?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold text-base">
                  {user?.username || "Username"}
                </h3>
              </div>

              <p className="text-sm text-muted-foreground">{user?.email}</p>

              {user?.verified && (
                <Badge className="bg-green-50 text-green-700 border border-green-200 hover:bg-green-50">
                  <CheckCircle2 className="mr-1 h-3 w-3" />
                  Verified
                </Badge>
              )}
            </div>
          </div>

          <AccountImageModal currentImageUrl={accountImage} />
        </div>

        <Separator />

        {/* Personal Information */}
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-sm">Personal Information</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Update your personal details associated with your account.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <FieldGroup className="space-y-2">
              <Field className="grid grid-cols-1 sm:grid-cols-[200px_1fr] items-center gap-2 sm:gap-4">
                <FieldLabel>Username</FieldLabel>
                <div>
                  <Input
                    {...register("username", {
                      required: "Username is required",
                    })}
                    placeholder="Enter username"
                    className="mb-1"
                  />
                  {errors.username && (
                    <FieldError>{errors.username.message}</FieldError>
                  )}
                </div>
              </Field>

              <Field className="grid grid-cols-1 sm:grid-cols-[200px_1fr] items-center gap-2 sm:gap-4">
                <FieldLabel>Email address</FieldLabel>
                <Input
                  type="email"
                  {...register("email")}
                  placeholder="Enter email"
                  readOnly
                />
              </Field>
            </FieldGroup>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => reset()}>
                Cancel
              </Button>

              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save changes"
                )}
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountPage;
