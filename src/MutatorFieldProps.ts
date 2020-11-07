export default interface MutatorFieldProps<T, E extends HTMLElement> {
  thing: T;
  mutator: (newThing: T, event: React.ChangeEvent<E>) => void;
  value?: string | number | readonly string[] | undefined;
  onChange: (oldThing: T, newThing: T) => void;
}
