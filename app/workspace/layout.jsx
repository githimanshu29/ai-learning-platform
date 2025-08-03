import React from 'react'
import WorkspaceProvider from './provider'
import AnimatedBackground from '../AnimatedBackground'

const WorkspaceLayout = ({ children }) => {
  return (
    <WorkspaceProvider>
      <div >
        {/* <AnimatedBackground /> */}
        {children}
        </div>
    </WorkspaceProvider>
  )
}

export default WorkspaceLayout