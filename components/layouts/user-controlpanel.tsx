"use client";
import { User } from "@heroui/user";

const UserControlPanel = ({ user }: { user: any }) => {
  return (
    <div className="flex gap-1">
      <User name={user && user.name} description={user && user.email} />
    </div>
  );
};

export default UserControlPanel;
