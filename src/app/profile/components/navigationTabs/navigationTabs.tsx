import { FC, PropsWithChildren, Children } from 'react';

const NavigationTabs: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div className="inline-flex flex-col w-full sm:w-auto mb-10">
        <div className="flex flex-nowrap overflow-y-hidden py-4">
          {Children.map(children, (child) => {
            return (
              <button className="mr-8 text-gray-800 font-semibold">
                {child}
              </button>
            );
          })}
        </div>
        <div className="bg-gray-300 h-1 rounded-full">
          <></>
        </div>
      </div>
    </>
  );
};

export default NavigationTabs;
