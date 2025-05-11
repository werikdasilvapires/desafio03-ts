import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AppContext } from './AppContext'
import { Header } from './Header'

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

describe('Header', () => {
  const mockUser = {
    name: 'John Doe',
    email: 'john@example.com',
    id: '1'
  }

  it('should render welcome message when user is logged in', () => {
    render(
      <BrowserRouter>
        <AppContext.Provider value={{
          user: mockUser,
          isLoggedIn: true,
          setIsLoggedIn: jest.fn(),
          setUser: jest.fn()
        }}>
          <Header />
        </AppContext.Provider>
      </BrowserRouter>
    )
    
    expect(screen.getByText('Dio Bank - John Doe')).toBeInTheDocument()
    expect(screen.getByText('Meu Perfil')).toBeInTheDocument()
    expect(screen.getByText('Sair')).toBeInTheDocument()
  })

  it('should not display profile and logout buttons when user is not logged in', () => {
    render(
      <BrowserRouter>
        <AppContext.Provider value={{
          user: null,
          isLoggedIn: false,
          setIsLoggedIn: jest.fn(),
          setUser: jest.fn()
        }}>
          <Header />
        </AppContext.Provider>
      </BrowserRouter>
    )
    
    expect(screen.getByText('Dio Bank')).toBeInTheDocument()
    expect(screen.queryByText('Meu Perfil')).not.toBeInTheDocument()
    expect(screen.queryByText('Sair')).not.toBeInTheDocument()
  })

  it('should navigate to profile page when "Meu Perfil" is clicked', () => {
    render(
      <BrowserRouter>
        <AppContext.Provider value={{
          user: mockUser,
          isLoggedIn: true,
          setIsLoggedIn: jest.fn(),
          setUser: jest.fn()
        }}>
          <Header />
        </AppContext.Provider>
      </BrowserRouter>
    )
    
    const profileButton = screen.getByText('Meu Perfil')
    fireEvent.click(profileButton)
    expect(mockNavigate).toHaveBeenCalledWith('/perfil')
  })

  it('should logout and navigate to home when "Sair" is clicked', () => {
    const mockSetIsLoggedIn = jest.fn()
    const mockSetUser = jest.fn()
    
    render(
      <BrowserRouter>
        <AppContext.Provider value={{
          user: mockUser,
          isLoggedIn: true,
          setIsLoggedIn: mockSetIsLoggedIn,
          setUser: mockSetUser
        }}>
          <Header />
        </AppContext.Provider>
      </BrowserRouter>
    )
    
    const logoutButton = screen.getByText('Sair')
    fireEvent.click(logoutButton)
    expect(mockSetIsLoggedIn).toHaveBeenCalledWith(false)
    expect(mockSetUser).toHaveBeenCalledWith(null)
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })
})