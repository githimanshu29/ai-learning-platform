import React from 'react'
import WorkspaceProvider from './provider'

const WorkspaceLayout = ({ children }) => {
  return (
    <WorkspaceProvider>
        {children}
    </WorkspaceProvider>
  )
}

export default WorkspaceLayout
