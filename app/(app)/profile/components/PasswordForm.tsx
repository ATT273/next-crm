"use client";

import { z } from "zod";
import { updatePassword } from "../actions";
import { getLocalUser } from "@/utils/session";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";

const formChangePWSchema = z
  .object({
    newPassword: z.string().min(6, {
      message: "New password must be at least 6 characters",
    }),
    confirmPassword: z.string().min(6, {
      message: "Confirm password must be at least 6 characters",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });

const initalFormPassword = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const initUser = {
  id: "",
  email: "",
  name: "",
  accessToken: "",
  status: 0,
};
const PasswordForm = () => {
  const formPassword = useForm({
    mode: "onSubmit",
    defaultValues: initalFormPassword,
    resolver: zodResolver(formChangePWSchema),
  });

  type LocalUser = {
    id: string;
    email: string;
    name: string;
    accessToken: string;
    status: number;
  };

  const handleSubmitChangePW = async (
    values: z.infer<typeof formChangePWSchema>
  ) => {
    const _localUser = await getLocalUser();
    if (!_localUser?.id) {
      addToast({
        title: "Fail",
        description: "Can not find your user",
        color: "danger",
      });
    }
    const res = await updatePassword(values.newPassword, _localUser?.id);
    if (res.status === 200) {
      addToast({
        title: "Success",
        description: "Password updated successfully",
        color: "success",
      });
    }
  };
  return (
    <div>
      <form
        key="passwordForm"
        onSubmit={formPassword.handleSubmit(handleSubmitChangePW)}
        className="flex flex-col gap-3 p-3 items-center"
      >
        <Controller
          name="newPassword"
          control={formPassword.control}
          render={({ field }) => (
            <Input
              isRequired
              label="New Password"
              type="password"
              placeholder="Enter your new password"
              className="w-full"
              {...field}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={formPassword.control}
          render={({ field }) => (
            <Input
              isRequired
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              className="w-full"
              {...field}
            />
          )}
        />
        <div className="flex justify-end w-full">
          <Button
            type="submit"
            variant="light"
            className="w-full bg-gray-900 text-white"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PasswordForm;
