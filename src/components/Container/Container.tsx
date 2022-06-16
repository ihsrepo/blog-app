import React, { PropsWithChildren } from "react";

export const Container = ({ children }: PropsWithChildren<{}>) => {
  return <div className="px-8 mx-auto">{children}</div>;
};
