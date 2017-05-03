export default function invariant(predicate, error) {
  if (!predicate) throw error;
}
