export type RoleType = {
  id?: number;
  name: string;
  description: string;
  code: string;
  active: boolean;
  permissions: {
    [key: string]: number;
  };
};
