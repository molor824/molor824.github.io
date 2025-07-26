import { useState, type JSX } from "react";

type Props = {
  tabs?: (JSX.Element | string)[];
  contents?: (JSX.Element | string)[];
};
function Tab({ tabs = [], contents = [] }: Props) {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        {tabs.map((tab, i) => (
          <button
            className="p-2 text-white/60 hover:text-white transition-colors duration-300"
            onClick={() => setTabIndex(i)}
            key={i}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="self-center">{contents[tabIndex]}</div>
    </div>
  );
}
export default Tab;
