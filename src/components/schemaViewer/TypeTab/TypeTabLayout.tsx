import React from 'react';

type TypeTabLayoutProps = {
  tabHeader: React.ReactElement;
  tabDescription: React.ReactElement;
  tabDetails: React.ReactElement;
  tabArguments: React.ReactElement;
};

export function TypeTabLayout({
  tabHeader,
  tabDescription,
  tabDetails,
  tabArguments,
}: TypeTabLayoutProps) {
  return (
    <div className="relative flex flex-col gap-4 w-80 shrink-0 overflow-y-scroll p-2 text-left bg-schema-gradient">
      {tabHeader}
      {tabDescription}
      {tabDetails}
      {tabArguments}
      <div className="absolute -z-10 top-0 left-0 h-full w-full opacity-25 bg-schema-pattern" />
    </div>
  );
}
