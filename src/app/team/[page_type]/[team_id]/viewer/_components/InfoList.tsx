import React from 'react';

interface InfoListType<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  classNames?: {
    list?: string;
    item?: string;
  };
}

const InfoList = <T,> ({items, renderItem, classNames}: InfoListType<T>) => {
  return (
      <ul className={classNames?.list}>
        {items.map((item, index) => (
            <li key={index} className={classNames?.item}>
              {renderItem(item)}
            </li>
        ))}
      </ul>
  );
};

export default InfoList;