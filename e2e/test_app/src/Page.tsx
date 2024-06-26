import React, { CSSProperties } from 'react';

export const Page = ({ children }: { children: React.ReactNode }) => {
  const styles: CSSProperties = {
    width: '300px',
    border: '1px solid red',
    marginBottom: '15px',
    position: 'relative',
  };
  return <div style={styles}>{children}</div>;
};
