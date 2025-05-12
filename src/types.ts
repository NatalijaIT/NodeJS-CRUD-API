export interface RequestData {
  method: string;
  path: string;
  headers: Record<string, string | undefined>;
  body?: User | undefined;
  params?: Record<string, string>;
}

export interface ResponseData {
  statusCode: number;
  body?: unknown;
  headers?: Record<string, string>;
}

export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[] | [];
}

export type UserWithoutId = Omit<User, "id">;

export interface BodyData {
    body?: User;
    params?: object;
}