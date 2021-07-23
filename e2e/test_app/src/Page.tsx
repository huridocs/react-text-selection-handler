import React, { CSSProperties, FunctionComponent } from 'react';

export const Page: FunctionComponent = ({ children }) => {
  const styles: CSSProperties = {
    width: '300px',
    border: '1px solid red',
    marginBottom: '15px',
    position: 'relative',
  };
  return <div style={styles}>{children}</div>;
};
