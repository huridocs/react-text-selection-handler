import React from 'react'

export function TextSelected({ children }) {
  return (
    <div
      id="textSelected"
      style={{
        position: 'absolute',
        left: '320px',
        top: '0',
        width: '100px',
        height: '100px',
        border: '1px solid red'
      }}
    >
      {children}
    </div>
  )
}
