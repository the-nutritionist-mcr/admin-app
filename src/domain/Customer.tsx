import Exclusion from "./Exclusion";
import Plan from "./Plan";

export enum Snack {
  None = "None",
  Standard = "Standard",
  Large = "Large",
}

export default interface Customer {
  id: number;
  firstName: string;
  surname: string;
  salutation: string;
  address: string;
  telephone: string;
  startDate?: Date;
  paymentDayOfMonth?: number;
  notes?: string;
  email: string;
  pauseStart?: Date;
  pauseEnd?: Date;
  daysPerWeek: number;
  plan: Plan;
  legacyPrice?: number;
  snack: Snack;
  breakfast: boolean;
  exclusions: Exclusion[];
}
