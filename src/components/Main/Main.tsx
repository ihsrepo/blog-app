import React, { PropsWithChildren } from "react";
import { Container } from "components";

export const Main = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div className="pt-8">
      <Container>{children}</Container>
    </div>
  );
};
