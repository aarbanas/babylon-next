export enum Role {
  USER = 'USER',
  ORGANISATION = 'ORGANISATION',
  ADMIN = 'ADMIN',
}

export enum Type {
  DOCTOR = 'DOCTOR',
  NURSE = 'NURSE',
  LIFEGUARD = 'LIFEGUARD',
}

export type RegisterUserData = {
  email: string;
  password: string;
  role: Role;
  city: string;
  reCaptchaToken: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  type?: Type;
  name?: string;
  street?: string;
  oib?: string;
};
