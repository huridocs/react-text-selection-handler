import React from 'react'

export function Page({ children }) {
  const styles = {
    width: '300px',
    border: '1px solid red',
    'margin-bottom': '15px',
    position: 'relative'
  }
  return <div style={styles}>{children}</div>
}
