import {
  Flex,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Avatar,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { useNavigate } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import axios from "axios";

const ResultsPage = () => {
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();
  const showToast = useShowToast();
  const [result, setResult] = useState(true);
  const [parties, setParties] = useState([]);
  const [members, setMembers] = useState([]);
  useEffect(() => {
    const getVotes = async () => {
      try {
        const resMembers = await axios.get(
          `/api/members/constituency/${user.constituency}/votes`
        );
        const resParties = await axios.get("/api/parties/votes");
        setMembers(resMembers.data);
        setParties(resParties.data);
        
      } catch (error) {
        console.log(error);
        // If the error is from the server (e.g., network error, 500 Internal Server Error)
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
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
    getVotes();
  }, [showToast]);
  return (
    <>
      {!user && navigate("/auth")}
      {user && user.isVoted && !result && (
        <Flex alignItems={"center"} justifyContent={"center"}>
          Stay tuned for results
        </Flex>
      )}
      {user && user.isVoted && result && (
        <Flex flexDirection={"column"} gap={4}>
          <TableContainer border={"1px solid black"} borderRadius={"md"}>
            <Table variant="simple">
              <TableCaption textAlign={"center"}>
                Constituency Votes Results
              </TableCaption>
              <Thead>
                <Tr>
                  <Th>Party</Th>
                  <Th>Member</Th>
                  <Th isNumeric>Votes</Th>
                </Tr>
              </Thead>
              <Tbody>
                {members.map((member) => (
                  <Tr>
                    <Td
                      display={"flex"}
                      alignItems={"center"}
                      gap={2}
                      fontWeight={"semibold"}
                    >
                      <Avatar src={member.img} />
                      {member.partyName}
                    </Td>
                    <Td>{member.memberName}</Td>
                    <Td isNumeric>{member.voteCount}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>

          <TableContainer border={"1px solid black"} borderRadius={"md"}>
            <Table variant="simple">
              <TableCaption textAlign={"center"}>
                Prime Minister Votes Results
              </TableCaption>
              <Thead>
                <Tr>
                  <Th>Party</Th>
                  <Th>Minister</Th>
                  <Th isNumeric>Votes</Th>
                </Tr>
              </Thead>
              <Tbody>
                {parties.map((party) => (
                  <Tr>
                    <Td
                      display={"flex"}
                      alignItems={"center"}
                      gap={2}
                      fontWeight={"semibold"}
                    >
                      <Avatar src={party.img} />
                      {party.name}
                    </Td>
                    <Td>{party.minister}</Td>
                    <Td isNumeric>{party.voteCount}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      )}
    </>
  );
};

export default ResultsPage;
