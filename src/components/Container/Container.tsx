import React, { PropsWithChildren } from "react";

export const Container = ({ children }: PropsWithChildren<{}>) => {
  return <div className="mx-auto max-w-5xl w-full px-4 pt-4">{children}</div>;
};
