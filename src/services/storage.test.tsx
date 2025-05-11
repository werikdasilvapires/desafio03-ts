import { changeLocalStorage, createLocalStorage, getAllLocalStorage } from "./storage"

const dioBank = {
    login: false
}

const dioBankWithUser = {
    login: true,
    user: {
        email: 'test@example.com',
        name: 'Test User',
        id: '1'
    }
}

describe('storage', () => {
    const mockSetItem = jest.spyOn(Storage.prototype, 'setItem')
    it('Deve retornar o objeto no localStorage com a chave diobank', () => {
        const mockGetItem = jest.spyOn(Storage.prototype, 'getItem')
        getAllLocalStorage()
        expect(mockGetItem).toHaveBeenCalledWith('diobank')
    })

    it('Deve criar o objeto no localStorage', () => {
        createLocalStorage()
        expect(mockSetItem).toHaveBeenCalledWith('diobank', JSON.stringify(dioBank))
    })

    it('Deve alterar o valor do objeto no localStorage', () => {
        changeLocalStorage(dioBank)
        expect(mockSetItem).toHaveBeenCalledWith('diobank', JSON.stringify(dioBank))
    })

    it('Deve alterar o objeto no localStorage incluindo dados do usuário', () => {
        changeLocalStorage(dioBankWithUser)
        expect(mockSetItem).toHaveBeenCalledWith('diobank', JSON.stringify(dioBankWithUser))
    })
})