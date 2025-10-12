// import { IRole } from "@/types/role.type";
import React, { createContext, useContext } from "react";

export type AppContextType = {
  roles: any[];
};
export const AppContext = createContext<AppContextType>({} as AppContextType);
const AppProvider = ({
  roles = [],
  children,
}: {
  children: React.ReactNode;
} & Partial<AppContextType>) => {
  return (
    <AppContext.Provider
      value={{
        roles,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);

  if (!context || Object.keys(context).length === 0) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context as AppContextType;
};

export default AppProvider;
