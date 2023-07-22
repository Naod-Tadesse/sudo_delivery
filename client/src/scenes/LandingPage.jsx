import React from "react";
import { Link } from "react-router-dom";
import { Stack, Flex, Box, Text, Button, Image } from "@chakra-ui/react";

const LandingPage = () => {
  return (
    <Stack backgroundColor="#e7dfdf">
      <Flex spacing="200px" p="32" alignSelf="center">
        <Box align="center">
          <Text fontSize="50px" fontWeight="Bold">
            SUDO
          </Text>
          <Text fontWeight="Bold">
            Find all of your favorite foods all in one place !
          </Text>
          <Link to="/auth">
            <Button mt={8} colorScheme="blue">
              Register/Login
            </Button>
          </Link>
        </Box>
      </Flex>
    </Stack>
  );
};

export default LandingPage;
