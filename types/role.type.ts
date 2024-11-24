export type RoleType = {
  name: string;
  description: string;
  code: string;
  active: boolean;
  permissions: {
    [key: string]: number;
  };
}