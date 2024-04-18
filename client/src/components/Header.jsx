import React from "react";
import { Flex, useColorMode, Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AiFillCheckSquare, AiFillHome } from "react-icons/ai";
import { RxArrowLeft, RxArrowRight, RxAvatar } from "react-icons/rx";
import useLogout from "../hooks/useLogout";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { logout } = useLogout();
  const user = useRecoilValue(userAtom);
  return (
    <Flex justifyContent={"space-evenly"} mt={6} mb={"12"}>
      {user && (
        <Link to={"/"}>
          <AiFillHome size={24} />
        </Link>
      )}
      <Button
        onClick={toggleColorMode}
        display={"flex"}
        gap={2}
        borderRadius={"xl"}
      >
        <Text>VoteKaro </Text>
        <AiFillCheckSquare w={6} cursor={"pointer"} />
      </Button>
      {user && (
        <Flex alignItems={"center"} gap={2}>
          <Link to={`/user`}>
            <RxAvatar size={26} />
          </Link>
          <Link onClick={logout}>
            <RxArrowRight size={26} />
          </Link>
        </Flex>
      )}
    </Flex>
  );
};

export default Header;
