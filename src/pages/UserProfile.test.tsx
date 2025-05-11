import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AppContext } from '../components/AppContext'
import UserProfile from './UserProfile'

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

describe('UserProfile', () => {
  const mockUser = {
    name: 'John Doe',
    email: 'john@example.com',
    id: '1'
  }

  it('should redirect to home when user is not logged in', () => {
    render(
      <BrowserRouter>
        <AppContext.Provider value={{
          user: null,
          isLoggedIn: false,
          setIsLoggedIn: jest.fn(),
          setUser: jest.fn()
        }}>
          <UserProfile />
        </AppContext.Provider>
      </BrowserRouter>
    )
    
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  it('should display user information when logged in', () => {
    render(
      <BrowserRouter>
        <AppContext.Provider value={{
          user: mockUser,
          isLoggedIn: true,
          setIsLoggedIn: jest.fn(),
          setUser: jest.fn()
        }}>
          <UserProfile />
        </AppContext.Provider>
      </BrowserRouter>
    )
    
    expect(screen.getByText('Meu Perfil')).toBeInTheDocument()
    expect(screen.getByText('Nome:')).toBeInTheDocument()
    expect(screen.getByText('Email:')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
  })

  it('should show N/A when user data is incomplete', () => {
    render(
      <BrowserRouter>
        <AppContext.Provider value={{
          user: { id: '1', name: '', email: '' },
          isLoggedIn: true,
          setIsLoggedIn: jest.fn(),
          setUser: jest.fn()
        }}>
          <UserProfile />
        </AppContext.Provider>
      </BrowserRouter>
    )
    
    expect(screen.getAllByText('N/A')).toHaveLength(2)
  })
})