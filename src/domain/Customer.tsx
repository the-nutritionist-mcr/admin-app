import Plan from "./Plan";

export default interface Customer {
  id: number;
  name: string;
  email: string;
  daysPerWeek: number;
  mealsPerDay: number;
  plan: Plan;
  allergicTo: string[];
}
