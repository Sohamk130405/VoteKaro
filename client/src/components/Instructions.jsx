import React from "react";
import {
  Avatar,
  Flex,
  Stack,
  Heading,
  Text,
  Button,
  useColorModeValue,
  List,
  ListItem,
  OrderedList,
} from "@chakra-ui/react";
import { AiFillCheckSquare } from "react-icons/ai";
const Instructions = ({ setVoteScreen }) => {
  return (
    <Flex
      flexDirection={"column"}
      gap={6}
      bg={useColorModeValue("white", "gray.700")}
      rounded={"xl"}
      boxShadow={"2xl"}
      py={6}
      my={12}
    >
      <Heading
        lineHeight={1.1}
        fontSize={{ base: "lg", sm: "xl", md: "2xl" }}
        w={"full"}
        textAlign={"center"}
      >
        Instructions
      </Heading>
      <OrderedList maxH={"550px"} overflowY={"auto"}>
        <ListItem>
          <strong>Election Date and Time:</strong> Voting will take place on
          [Date] from [Start Time] to [End Time] (Timezone: [Specify Timezone]).
        </ListItem>
        <ListItem>
          <strong>Voter Eligibility:</strong> All registered voters aged
          [Minimum Age] and above and holding [Specify Citizenship Requirement]
          are eligible to vote.
        </ListItem>
        <ListItem>
          <strong>Access Information:</strong> Access the online voting system
          at [Website URL]. Use your registered username and password to log in.
        </ListItem>
        <ListItem>
          <strong>Technical Requirements:</strong> For the best experience, use
          a modern web browser (e.g., Chrome, Firefox) with JavaScript enabled.
          The system is compatible with desktop, tablet, and mobile devices.
        </ListItem>
        <ListItem>
          <strong>Voting Period:</strong> The voting period begins at [Start
          Time] on [Date] and ends at [End Time] on [Date].
        </ListItem>
        <ListItem>
          <strong>Security Measures:</strong> Your vote is secure. Our system
          employs encryption and authentication protocols to safeguard your
          personal information and vote.
        </ListItem>
        <ListItem>
          <strong>Voting Process:</strong>
          <OrderedList>
            <ListItem>
              Log in to the system using your username and password.
            </ListItem>
            <ListItem>
              Review the list of candidates/options and their information.
            </ListItem>
            <ListItem>
              Select your preferred candidate(s) or option(s).
            </ListItem>
            <ListItem>Review your selections carefully.</ListItem>
            <ListItem>
              Once satisfied, submit your vote. Once submitted, votes cannot be
              changed.
            </ListItem>
          </OrderedList>
        </ListItem>
        <ListItem>
          <strong>Candidate/Option Information:</strong> View information about
          the candidates or options available for voting on the voting
          interface.
        </ListItem>
        <ListItem>
          <strong>Number of Votes:</strong> You may cast [Number of Votes
          Allowed] vote(s). If allowed, you can vote for multiple
          candidates/options.
        </ListItem>
        <ListItem>
          <strong>Review and Confirmation:</strong> Review your selections
          carefully before submitting. Confirm that your choices are accurate.
        </ListItem>
        <ListItem>
          <strong>Submission Confirmation:</strong> After submitting your vote,
          you will receive a confirmation message on the screen.
        </ListItem>
        <ListItem>
          <strong>Contact Information:</strong> For technical support or
          assistance, contact [Support Email] or call [Support Phone Number].
        </ListItem>
        <ListItem>
          <strong>Feedback Mechanism:</strong> We value your feedback! Please
          provide your comments or suggestions on your voting experience
          [Feedback Link].
        </ListItem>
        <ListItem>
          <strong>Privacy Policy:</strong> Your privacy is important to us. Read
          our privacy policy [Privacy Policy Link] to learn how we handle your
          personal information.
        </ListItem>
        <ListItem>
          <strong>Legal Disclaimers:</strong> [Your Election Name] is conducted
          in accordance with [Applicable Laws]. The validity of the election
          results is subject to [Regulatory Authority].
        </ListItem>
        <Flex gap={3} justifyContent={"center"} alignItems={"center"}>
          <Text>I accepts all terms & conditions</Text>
          <Button onClick={() => setVoteScreen(true)}>
            <AiFillCheckSquare w={6} h={6} />
          </Button>
        </Flex>
      </OrderedList>
    </Flex>
  );
};

export default Instructions;
