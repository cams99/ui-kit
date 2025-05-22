export interface User {
  id: string;
  name: string;
  email: string;
  status: boolean;
  [key: string]: unknown;
}
