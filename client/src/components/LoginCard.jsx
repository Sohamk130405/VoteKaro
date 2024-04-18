"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  PinInput,
  PinInputField,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useRecoilState, useSetRecoilState } from "recoil";
import authScreenAtom from "../atoms/authAtom";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginCard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const [showVotingId, setShowVotingId] = useState(false);
  const [user, setUser] = useRecoilState(userAtom);
  const showToast = useShowToast();
  const [inputs, setInputs] = useState({
    phone: "",
    votingId: "",
  });
  const [loading, setLoading] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("");
  const navigate = useNavigate();
  const [remainingTime, setRemainingTime] = useState(60);

  // Countdown timer effect
  useEffect(() => {
    let timer;
    if (isOpen && remainingTime > 0) {
      timer = setTimeout(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      setRemainingTime(60); // Reset timer when it reaches zero
    }

    return () => clearTimeout(timer);
  }, [isOpen, remainingTime]);

  const handleOtp = async () => {
    setLoading(true);
    try {
      // Generate OTP and send it to the user
      const res = await axios.post("/api/users/login", {
        votingId: inputs.votingId,
        phone: inputs.phone,
      });

      onOpen();
      showToast(
        "Success",
        `OTP sent to your registered phone number! otp = ${res.data.otp}`,
        "success"
      );
    } catch (error) {
      console.log(error);
      // If the error is from the server (e.g., network error, 500 Internal Server Error)
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error;
        showToast("Error", errorMessage, "error");
      } else {
        // If the error object does not contain the expected structure
        showToast(
          "Error",
          "An error occurred. Please try again later.",
          "error"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    try {
      const res = await axios.post("/api/users/verifyUser", {
        phone: inputs.phone,
        otp: enteredOtp,
      });
      localStorage.setItem("user-voteKaro", JSON.stringify(res.data.token));
      onClose();
      showToast("Success", "Login Successfull", "success");
      setUser(res.data.token);
      if (res.data.token.isVoted) {
        navigate("/results");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      // If the error is from the server (e.g., network error, 500 Internal Server Error)
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error;
        showToast("Error", errorMessage, "error");
      } else {
        // If the error object does not contain the expected structure
        showToast(
          "Error",
          "An error occurred. Please try again later.",
          "error"
        );
      }
    }
  };

  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Login
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.dark")}
          boxShadow={"lg"}
          p={8}
          w={{
            base: "full",
            sm: "400px",
          }}
        >
          <Stack spacing={4}>
            <FormControl id="votingId" isRequired>
              <FormLabel>Voter Id</FormLabel>
              <InputGroup>
                <Input
                  type={showVotingId ? "text" : "password"}
                  onChange={(e) =>
                    setInputs({ ...inputs, votingId: e.target.value })
                  }
                ></Input>
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowVotingId((showVotingId) => !showVotingId)
                    }
                  >
                    {showVotingId ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="phone" isRequired>
              <FormLabel>Phone Number</FormLabel>
              <Input
                type="number"
                onChange={(e) =>
                  setInputs({ ...inputs, phone: e.target.value })
                }
              />
            </FormControl>

            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Logging..."
                size="lg"
                bg={useColorModeValue("gray.600", "gray.700")}
                color={"white"}
                _hover={{
                  bg: useColorModeValue("gray.700", "gray.800"),
                }}
                onClick={handleOtp}
              >
                Send OTP
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Not registerd yet?{" "}
                <Link
                  color={"blue.400"}
                  onClick={() => setAuthScreen("signup")}
                >
                  SignUp
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex align={"center"} justify={"center"}>
              <Stack
                spacing={4}
                w={"full"}
                maxW={"sm"}
                bg={useColorModeValue("white", "gray.700")}
                rounded={"xl"}
                boxShadow={"lg"}
                p={6}
                my={10}
              >
                <Center>
                  <Heading
                    lineHeight={1.1}
                    fontSize={{ base: "2xl", md: "3xl" }}
                  >
                    Verify Your VotingId
                  </Heading>
                </Center>
                <Center
                  fontSize={{ base: "sm", sm: "md" }}
                  color={useColorModeValue("gray.800", "gray.400")}
                >
                  We have sent code to your phone number
                </Center>
                <Text align="center">
                  Remaining time: {Math.ceil(remainingTime)} seconds
                </Text>
                <Center
                  fontSize={{ base: "sm", sm: "md" }}
                  fontWeight="bold"
                  color={useColorModeValue("gray.800", "gray.400")}
                >
                  {inputs.phone.slice(0, 2)}XXXXXXXX
                </Center>
                <FormControl>
                  <Center>
                    <HStack>
                      <PinInput
                        value={enteredOtp}
                        onChange={setEnteredOtp}
                        isDisabled={loading}
                      >
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                      </PinInput>
                    </HStack>
                  </Center>
                </FormControl>
                <Stack spacing={6}>
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    onClick={handleVerify}
                    isLoading={loading}
                  >
                    Verify
                  </Button>
                </Stack>
              </Stack>
            </Flex>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
