import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import { twMerge } from "tailwind-merge";

type Context = {
  activeTab?: string;
  updateActiveTab(id: string): void;
};
const tabContext = createContext({ updateActiveTab() {} } as Context);

type Props = {
  defaultValue?: string;
  className?: string;
};
function Tab({ children, defaultValue, className }: PropsWithChildren<Props>) {
  const [activeTab, setActiveTab] = useState<string | undefined>(defaultValue);

  return (
    <div className={twMerge("flex flex-col gap-2", className)}>
      <tabContext.Provider value={{ activeTab, updateActiveTab: setActiveTab }}>
        {children}
      </tabContext.Provider>
    </div>
  );
}

Tab.List = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return <div className={twMerge("flex", className)}>{children}</div>;
};
type TriggerProps = {
  value: string;
  className?: string;
};
Tab.Trigger = ({
  children,
  value,
  className,
}: PropsWithChildren<TriggerProps>) => {
  const context = useContext(tabContext);
  const isActive = context.activeTab === value;
  return (
    <button
      className={twMerge(
        `transition-colors border-b-2 p-2 ${
          isActive
            ? "text-primary border-primary"
            : "border-gray-400 text-gray-400 hover:border-white hover:text-white"
        }`,
        className
      )}
      onClick={() => context.updateActiveTab(value)}
    >
      {children}
    </button>
  );
};
type ContentProps = {
  value: string;
  className?: string;
};
Tab.Content = ({
  children,
  value,
  className,
}: PropsWithChildren<ContentProps>) => {
  const context = useContext(tabContext);
  const isActive = context.activeTab === value;
  return (
    <div className={twMerge(isActive ? "" : "hidden", className)}>
      {children}
    </div>
  );
};

export default Tab;
