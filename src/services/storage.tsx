interface IUser {
    email: string;
    name: string;
    id: string;
  }
  
  interface IDioBank {
    login: boolean;
    user?: IUser;
  }
  
  const dioBank = {
    login: false
  }
  
  export const getAllLocalStorage = (): string | null  => {
    return localStorage.getItem('diobank')
  }
  
  export const createLocalStorage = (): void => {
    localStorage.setItem('diobank', JSON.stringify(dioBank))
  }
  
  export const changeLocalStorage = (dioBank: IDioBank): void => {
    localStorage.setItem('diobank', JSON.stringify(dioBank))
  }