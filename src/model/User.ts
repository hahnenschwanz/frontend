export type UserId = string;
export type CupId = string;

export interface User {
  id: UserId;
  name?: string | null;
  cups: CupId[];
}
