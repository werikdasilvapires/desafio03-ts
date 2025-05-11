import { Box, Center, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../components/AppContext";
import { Card } from "../components/Card";

const UserProfile = () => {
  const { user, isLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <Box padding="25px">
      <Center>
        <VStack spacing={8}>
          <Text fontSize="2xl" fontWeight="bold">
            Meu Perfil
          </Text>
          <Card>
            <SimpleGrid columns={1} spacing={4}>
              <Box>
                <Text fontWeight="bold">Nome:</Text>
                <Text>{user?.name || "N/A"}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Email:</Text>
                <Text>{user?.email || "N/A"}</Text>
              </Box>
            </SimpleGrid>
          </Card>
        </VStack>
      </Center>
    </Box>
  );
};

export default UserProfile;