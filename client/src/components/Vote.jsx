import {
  Avatar,
  Flex,
  Stack,
  Heading,
  Text,
  Button,
  useColorModeValue,
  Center,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
const Vote = () => {
  const [parties, setParties] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const showToast = useShowToast();
  const user = useRecoilValue(userAtom);
  const { logout } = useLogout();
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userAtom);
  const handleVote = async () => {
    try {
      if (
        !window.confirm(`Are you sure you want to vote your selected member ?`)
      ) {
        return;
      }
      const res = await axios.post(
        `/api/members/vote/${selectedMemberId}/${user._id}`
      );

      if (res.data.success) {
        showToast(
          "Success",
          "You voted successfully!,wait for results",
          "success"
        );
        setUser({ ...user, isVoted: true });
        localStorage.setItem(
          "user-voteKaro",
          JSON.stringify({ ...user, isVoted: true })
        );
        navigate("/results");
      }
      // Implement your vote submission logic here
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

  useEffect(() => {
    const getPartiesAndMembers = async () => {
      try {
        const resParties = await axios.get("/api/parties/getParties");
        const resMembers = await axios.get(
          `/api/members/getMembers/${user.constituency}`
        );
        setMembers(resMembers.data);
        setParties(resParties.data);
      } catch (error) {
        console.log(error);
        // Handle error
      }
    };
    getPartiesAndMembers();
  }, [showToast, user.constituency]);

  return (
    <Flex align={"center"} justify={"center"}>
      <Stack
        spacing={10}
        w={"full"}
        maxW={"2xl"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"2xl"}
        p={6}
        my={12}
      >
        <Heading
          lineHeight={1.1}
          fontSize={{ base: "lg", sm: "xl", md: "2xl" }}
          w={"full"}
          textAlign={"center"}
        >
          Vote Your Respective Participant
        </Heading>

        <Flex flexDirection={"column"} gap={4}>
          <RadioGroup
            onChange={(value) => setSelectedMemberId(value)}
            value={selectedMemberId}
          >
            {parties.length > 0 &&
              parties.map((party) => (
                <Flex alignItems={"center"} gap={4} key={party._id}>
                  <Avatar src={party.img} />

                  <Text
                    minW={20}
                    fontSize={20}
                    fontWeight={"semibold"}
                    flex={50}
                    textAlign={"start"}
                  >
                    {party.name}
                  </Text>
                  <Text minW={20} fontSize={15} flex={50} textAlign={"start"}>
                    {members.map((member) => {
                      if (member.party === party._id) {
                        return (
                          <Radio key={member._id} value={member._id}>
                            {member.name}
                          </Radio>
                        );
                      }
                    })}
                  </Text>
                </Flex>
              ))}
          </RadioGroup>
          <Button
            onClick={handleVote}
            bg={"green.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "blue.500",
            }}
            disabled={!selectedMemberId}
          >
            Vote
          </Button>
        </Flex>
      </Stack>
    </Flex>
  );
};

export default Vote;
