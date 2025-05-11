import { Box, Center, Input } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../components/AppContext";
import { Card } from "../components/Card";
import DButton from "../components/DButton";
import { login } from "../services/login";
import { changeLocalStorage } from "../services/storage";

const Home = () => {
    const [ email, setEmail ] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')
    const { isLoggedIn, setIsLoggedIn, setUser } = useContext(AppContext)
    const navigate = useNavigate()

    useEffect(() => {
        if(isLoggedIn) {
            navigate('/conta/1')
        }
    }, [isLoggedIn, navigate])

    const validateUser = async (email: string, password: string) => {
        const response = await login(email, password)

        if(!response.success){
            return alert('Email ou senha inválidos')
        }

        if(response.user) {
            setUser(response.user)
            setIsLoggedIn(true)
            changeLocalStorage({ login: true, user: response.user })
            navigate('/conta/1')
        }
    }
  
    return (
        <Box padding="25px">
            <Card>
                <Center>
                    <h1>Faça o login</h1>
                </Center>
                <Input placeholder="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                <Input 
                    placeholder="password" 
                    type="password" 
                    value={password} 
                    onChange={(event) => setPassword(event.target.value)} 
                    marginTop="10px"
                />
                <Center>
                    <DButton
                        onClick={() => validateUser(email, password)}
                    />
                </Center>
            </Card>
        </Box>
    );
}

export default Home;