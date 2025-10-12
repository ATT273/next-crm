"use client";

import { z } from "zod";
// import { useState } from 'react';
import { updateInfo } from "../actions";
import { useEffect, useState } from "react";
import { getLocalUser } from "@/utils/session";
import { getUserDetails } from "@/app/(app)/user/actions";
import { Form, Input, Button, DatePicker } from "@heroui/react";
import { Controller, useForm } from "react-hook-form";
import { parseDate } from "@internationalized/date";
import { addToast } from "@heroui/toast";
import { zodResolver } from "@hookform/resolvers/zod";

const formInfoSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  name: z.string().min(6, {
    message: "Name must be at least 6 characters",
  }),
  dob: z.string(),
});

type LocalUser = {
  id: string;
  email: string;
  name: string;
  accessToken: string;
  status: number;
};

const initUser = {
  id: "",
  email: "",
  name: "",
  accessToken: "",
  status: 0,
};

const InforForm = () => {
  const [localUser, setLocalUser] = useState<LocalUser>(initUser);
  const [value, setValue] = useState(parseDate("2024-04-04"));
  const formInfo = useForm({
    defaultValues: {
      email: "",
      name: "",
      dob: "",
    },
    mode: "onChange",
    resolver: zodResolver(formInfoSchema),
  });
  useEffect(() => {
    const _localUser = getLocalUser();
    if (_localUser.id) {
      getDetail(_localUser.id);
    }
  }, []);

  const getDetail = async (id: string) => {
    const res = await getUserDetails(id);
    if (res.status === 200) {
      formInfo.reset({
        email: res.data.email,
        name: res.data.name,
        dob: res.data.dob,
      });
    }
  };
  const onSubmit = async (values: z.infer<typeof formInfoSchema>) => {
    const res = await updateInfo(values.email, values.name, values.dob, localUser?.id);
    if (res.status === 200) {
      addToast({
        title: "Success",
        description: "Info updated successfully",
        color: "success",
      });
    }
  };
  return (
    <div className="mb-3">
      <h2 className="text-gray-800 text-xl font-semibold">General Information</h2>
      <Form className="w-full max-w-xs flex flex-col gap-4" onSubmit={formInfo.handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={formInfo.control}
          render={({ field }) => (
            <Input
              isRequired
              label="Email"
              type="email"
              placeholder="your@email.com"
              className="w-full"
              value={field.value}
              name={field.name}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          name="name"
          control={formInfo.control}
          render={({ field }) => (
            <Input
              isRequired
              label="Name"
              type="text"
              placeholder="Enter your name"
              value={field.value}
              name={field.name}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          name="dob"
          control={formInfo.control}
          render={({ field }) => (
            <DatePicker
              className="w-full"
              label="Date of Birth"
              // value={value}
              // onChange={setValue}
            />
          )}
        />
        <div className="flex justify-end w-full">
          <Button type="submit" variant="light" className="w-full bg-gray-900 text-white">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default InforForm;
