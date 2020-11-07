export default interface MutatorFieldProps<T, I> {
  thing: T;
  mutator: (newThing: T, item: I) => void;
  onChange: (oldThing: T, newThing: T) => void;
}
