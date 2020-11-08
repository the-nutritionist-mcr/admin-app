import Plan from "./Plan";

export enum Snack {
  None,
  Standard,
  Large,
}

export default interface Customer {
  id: number;
  name: string;
  email: string;
  daysPerWeek: number;
  plan: Plan;
  snack: Snack;
  breakfast: boolean;
  allergicTo: string[];
}
