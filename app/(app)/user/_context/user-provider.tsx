import { createContext, useContext, useState } from "react";
import { IUserResponse } from "@/types/user.type";
import { IRole } from "@/types/role.type";

export type UserContextType = {
  users?: IUserResponse[];
  roles: IRole[];
  editingUser: IUserResponse | null;
  setEditingUser: (user: IUserResponse | null) => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider = ({
  users = [],
  roles = [],
  children,
}: {
  children: React.ReactNode;
} & Partial<UserContextType>) => {
  const [editingUser, setEditingUser] = useState<IUserResponse | null>(null);
  return (
    <UserContext.Provider
      value={{
        users,
        roles,
        editingUser,
        setEditingUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
