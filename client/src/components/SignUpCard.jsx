import React, { useRef, useState } from "react";
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
  Image,
  Center,
  Select,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../atoms/authAtom";
import userAtom from "../atoms/userAtom";
import axios from "axios";
import useShowToast from "../hooks/useShowToast";
import usePreviewImg from "../hooks/usePreviewImg";
import { useNavigate } from "react-router-dom";
export default function SignupCard() {
  const [showVotindId, setShowVotindId] = useState(false);
  const [showAadharNumber, setShowAadharNumber] = useState(false);
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const setUser = useSetRecoilState(userAtom);
  const showToast = useShowToast();
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    votingId: "",
    aadharNumber: "",
    constituency: "",
    phone: "",
  });
  const fileRef = useRef();
  const { handleImageChange, imgUrl } = usePreviewImg();
  const navigate = useNavigate();
  const handleSignUp = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/users/signup", {
        name: inputs.name,
        votingId: inputs.votingId,
        aadharNumber: inputs.aadharNumber,
        constituency: inputs.constituency,
        img: imgUrl,
        phone: inputs.phone,
      });

      localStorage.setItem("user-campusaura", JSON.stringify(res.data));
      setUser(res.data);
      showToast("SignUp", "Account created Successfully!", "success");
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

  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text>
            Enter Correct Details Since Your details get verified by
            E-Scrutinity
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.dark")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="name" isRequired>
              <FormLabel>Full Name</FormLabel>
              <InputGroup>
                <Input
                  type="name"
                  onChange={(e) =>
                    setInputs({ ...inputs, name: e.target.value })
                  }
                />
              </InputGroup>
            </FormControl>
            <HStack>
              <Box>
                <FormControl id="constituency" isRequired>
                  <FormLabel>Constituency</FormLabel>
                  <Select
                    placeholder="Select"
                    onChange={(e) =>
                      setInputs({ ...inputs, constituency: e.target.value })
                    }
                  >
                    <option value="Pune">Pune</option>
                    <option value="Wardha">Wardha</option>
                    <option value="Nagpur">Nagpur</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="New Delhi">New Delhi</option>
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="phone" isRequired>
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    name="phone"
                    type="tel"
                    onChange={(e) =>
                      setInputs({ ...inputs, phone: e.target.value })
                    }
                  />
                </FormControl>
              </Box>
            </HStack>

            <FormControl id="password" isRequired>
              <FormLabel>Voting Id</FormLabel>
              <InputGroup>
                <Input
                  type={showVotindId ? "text" : "password"}
                  onChange={(e) =>
                    setInputs({ ...inputs, votingId: e.target.value })
                  }
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowVotindId((showVotindId) => !showVotindId)
                    }
                  >
                    {showVotindId ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="aadhar" isRequired>
              <FormLabel>Aadhar Number</FormLabel>
              <InputGroup>
                <Input
                  type={showAadharNumber ? "text" : "password"}
                  onChange={(e) =>
                    setInputs({ ...inputs, aadharNumber: e.target.value })
                  }
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowAadharNumber(
                        (showAadharNumber) => !showAadharNumber
                      )
                    }
                  >
                    {showAadharNumber ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl>
              <Stack direction={["column", "row"]} spacing={6}>
                {imgUrl && (
                  <Flex mt={5} w={"full"} position={"relative"}>
                    <Image src={imgUrl} alt="Selected Image" />
                  </Flex>
                )}
                <Center w="full">
                  <Button w="full" onClick={() => fileRef.current.click()}>
                    {imgUrl ? "Change Uploaded Id" : "Upload VoterId"}
                  </Button>
                  <Input
                    type="file"
                    hidden
                    ref={fileRef}
                    onChange={handleImageChange}
                  />
                </Center>
              </Stack>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                isLoading={loading}
                size="lg"
                bg={useColorModeValue("gray.600", "gray.700")}
                color={"white"}
                _hover={{
                  bg: useColorModeValue("gray.700", "gray.800"),
                }}
                onClick={handleSignUp}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link color={"blue.400"} onClick={() => setAuthScreen("login")}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
