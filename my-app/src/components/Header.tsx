import React from 'react'
import Container from './Container'
import Logo from './Logo'
import HeaderMenu from './HeaderMenu'
import SearchBar from './SearchBar'
import Cart from './Cart'
import SignIn from './SignIn'
import MobileMenu from './MobileMenu'

const Header = async() => {
  const user = await fetch('https://api.escuelajs.co/api/v1/users')

  return (
    <header className="bg-white max-w-full py-5">
      <Container className="flex items-center justify-between text-lightColor md:gap-0">
        <div className="w-auto md:-1/3 flex items-center gap-2.5 justify-start md:gap-0">
          <MobileMenu />
          <Logo className="text-4xl"/>
        </div>
        <HeaderMenu />
        <div className="w-auto md:w-1/3 flex items-center justify-end space-x-4">
          <SearchBar/>
          <Cart />
          <SignIn />
        </div>
        
      </Container>
    </header>
  )
}

export default Header
