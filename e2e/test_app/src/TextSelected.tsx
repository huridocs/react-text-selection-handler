import React, { FunctionComponent } from 'react';

export const TextSelected: FunctionComponent = ({ children }) => (
  <div
    id="textSelected"
    style={{
      position: 'absolute',
      left: '320px',
      top: '0',
      width: '100px',
      height: '100px',
      border: '1px solid red',
    }}
  >
    {children}
  </div>
);
