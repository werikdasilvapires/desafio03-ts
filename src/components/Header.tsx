import { Box, Button, Center, Flex, HStack, Spacer, Text } from '@chakra-ui/react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { changeLocalStorage } from '../services/storage'
import { AppContext } from './AppContext'

export const Header = () => {
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useContext(AppContext)
  const navigate = useNavigate()

  const logout = () => {
    changeLocalStorage({ login: false })
    setIsLoggedIn(false)
    setUser(null)
    navigate('/')
  }

  const goToProfile = () => {
    navigate('/perfil')
  }

  return (
    <Flex backgroundColor='orange' padding='5px'>
      <Box>
        <Center>
          <Text fontSize='3xl'>Dio Bank {isLoggedIn && user ? `- ${user.name}` : ''}</Text>
        </Center>
      </Box>
      {
        isLoggedIn && (
          <>
            <Spacer />
            <HStack spacing={4}>
              <Button onClick={() => goToProfile()}>
                Meu Perfil
              </Button>
              <Button onClick={() => logout()}>
                Sair
              </Button>
            </HStack>
          </>
        )
      }
    </Flex>
  )
}