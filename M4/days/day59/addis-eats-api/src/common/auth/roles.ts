export const ROLES = ['staff', 'customer'] as const;
export type Role = (typeof ROLES)[number];

export interface AuthUser {
  roles: Role[];
}
