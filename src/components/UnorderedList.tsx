import type { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

function ListItem({ children }: PropsWithChildren) {
  return <li>{children}</li>;
}
type Props = {
  className?: string;
};
function UnorderedList({ children, className }: PropsWithChildren<Props>) {
  return (
    <ul className={twMerge("list-disc ml-[25px]", className)}>{children}</ul>
  );
}
export default UnorderedList;
export { ListItem };
