import React from 'react'
import {cn} from '@/lib/utils'

const Container = ({
  children, 
  className
}:{
  children:React.ReactNode,
  className?:string;
}) => {
  return (
    <div className={cn("max-w-screen-2xl mx-auto px-4 lg:px-8", className)}>
      {children}
    </div>
  )
}

export default Container
