import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import {
  Camera,
  CheckCircle2,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import { useUploadUserImage, useUser } from "@/hooks/auth";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

const AccountPage = () => {
  const { data: user } = useUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isSubmitting },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      phone: "",
    },
  });

  const { mutate: uploadImage } = useUploadUserImage();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (user) {
      reset({
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
      });

      setPreviewImage(user.imgurl || "");
    }
  }, [user, reset]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      toast.error("Please select a JPG, PNG or WEBP image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must not exceed 5MB.");
      return;
    }

    setPreviewImage(URL.createObjectURL(file));
    uploadImage(file);
  };

  const onSubmit = () => {};

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
            <div className="relative">
              <Avatar className="h-20 w-20 border">
                <AvatarImage src={previewImage} alt="Profile" />
                <AvatarFallback className="bg-blue-50 text-blue-700 text-xl">
                  {user?.username?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>

              <Button
                type="button"
                variant="ghost"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border bg-background shadow-sm hover:bg-muted"
              >
                <Camera size={14} />
              </Button>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold text-base">
                  {user?.username || "Username"}
                </h3>

                {user?.verified && (
                  <Badge className="bg-green-50 text-green-700 border border-green-200 hover:bg-green-50">
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    Verified
                  </Badge>
                )}
              </div>

              <p className="text-sm text-muted-foreground">{user?.email}</p>

              <Button
                variant="link"
                size="sm"
                className="p-0"
                render={<Link to="/app/subscription/plans" />}
              >
                <Sparkles /> Upgrade to featured
              </Button>

              {/* <Badge variant="secondary" className="gap-1">
                <Crown size={12} />
                {user?.role?.name || "Member"} Account
              </Badge> */}
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="gap-2"
          >
            <Camera size={14} />
            Change photo
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={handleImageChange}
          />
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
                <Input {...register("username")} placeholder="Enter username" />
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

              <Field className="grid grid-cols-1 sm:grid-cols-[200px_1fr] items-center gap-2 sm:gap-4">
                <FieldLabel>Phone number</FieldLabel>
                <Input
                  {...register("phone")}
                  placeholder="Enter phone number"
                />
              </Field>
            </FieldGroup>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => reset()}>
                Cancel
              </Button>

              <Button type="submit" disabled={!isDirty || isSubmitting}>
                Save changes
              </Button>
            </div>
          </form>
        </div>

        <Separator />

        {/* Account Information */}
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-sm">Account Information</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Information about your account membership and access.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 rounded-lg border p-4">
              <div className="rounded-md bg-blue-50 p-2 text-blue-600">
                <ShieldCheck size={18} />
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Account type</p>
                <p className="font-medium text-sm mt-1">
                  {user?.role?.name || "Member"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border p-4">
              <div className="rounded-md bg-green-50 p-2 text-green-600">
                <Mail size={18} />
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Email verification
                </p>
                <p className="font-medium text-sm mt-1">
                  {user?.verified ? "Verified" : "Not verified"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountPage;
