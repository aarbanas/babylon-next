export function classNames(...classes: (string | unknown)[]) {
  return classes.filter(Boolean).join(' ');
}
