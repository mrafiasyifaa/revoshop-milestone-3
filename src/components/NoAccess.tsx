import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import Logo from './Logo'
import SignIn from './SignIn'

const NoAccess = ({details? = "Login to see your cart items"}:{details? : string}) => {
  return (
    <div className="flex items-center justify-center py-12 md:py-32 bg-gray-100 p-4">
      
      <Card className="w-full max-w-md">
        <CardHeader className="flex items-center flex-col">
            <Logo/>
            <CardTitle className="text-2xl font-bold text-center">
                Welcome Back!
            </CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-center font-medium text-darkColor/80">{details}</p>
        </CardContent>
        <SignIn/>
      </Card>
    </div>
  )
}

export default NoAccess
