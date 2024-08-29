import { useState } from "react";

import { type TabOptions } from "config/trade/constants";
import { usePaginationStore } from "store/usePaginationStore";

import { styles } from "./styles";

const Tabs = ({
  tabs,
  tabsIcons,
  onSelect,
}: {
  tabs: TabOptions[];
  tabsIcons?: string[];
  onSelect: (newTab: TabOptions) => void;
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const { reset } = usePaginationStore();

  const handleTabClick = (index: number, newTab: TabOptions) => {
    setActiveTabIndex(index);
    onSelect(newTab);
    reset();
  };

  return (
    <div css={styles()} className="tabs-container">
      <div className="tabs-list">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            className={`tab-button ${
              activeTabIndex === idx ? "active-tab" : ""
            }`}
            onClick={() => handleTabClick(idx, tab)}
          >
            <p>{tab}</p>
            {tabsIcons?.length && <img src={tabsIcons[idx]} />}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
