import { login } from "./login"

describe('login', () => {
  const mockEmail = 'nath@dio.bank'
  const mockPassword = '123456'

  it('Deve retornar um objeto com sucesso e dados do usuário caso o email e senha sejam válidos', async() => {
    const response = await login(mockEmail, mockPassword)
    expect(response.success).toBeTruthy()
    expect(response.user).toBeDefined()
    expect(response.user?.email).toBe(mockEmail)
  })

  it('Deve retornar um objeto com sucesso falso caso o email seja inválido', async() => {
    const response = await login('email@invalido.com', mockPassword)
    expect(response.success).toBeFalsy()
    expect(response.user).toBeUndefined()
  })

  it('Deve retornar um objeto com sucesso falso caso a senha seja inválida', async() => {
    const response = await login(mockEmail, 'senha-invalida')
    expect(response.success).toBeFalsy()
    expect(response.user).toBeUndefined()
  })
})