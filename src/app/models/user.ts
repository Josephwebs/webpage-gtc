export interface User {
  id: number;
  name: string;
  initials: string;
  email: string;
  role: 'admin' | 'user';
  password: string;
}
