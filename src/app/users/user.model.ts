export interface UserResponse {
  count: number;
  users: User[];
  message?: string;
}

export interface User {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  id_status: UserStatus;
  created_date: string;
  full_name?: string;
  status?: string;
}

export enum UserStatus {
  Active = 1,
  Inactive = 3,
}
