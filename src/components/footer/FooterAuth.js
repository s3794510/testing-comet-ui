/*eslint-disable*/
import React from "react";
import {
  Flex,
  Link,
  List,
  ListItem,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Footer() {
  let textColor = useColorModeValue("black", "black");
  let linkColor = useColorModeValue({ base: "black", lg: "black" }, "black");
  return (
    <Flex
      zIndex="3"
      flexDirection={{
        base: "column",
        lg: "row",
      }}
      alignItems={{
        base: "center",
        xl: "start",
      }}
      justifyContent="space-between"
      px={{ base: "30px", md: "0px" }}
      pb="30px"
    >
      <Text
        color={textColor}
        textAlign={{
          base: "center",
          xl: "start",
        }}
        mb={{ base: "20px", lg: "0px" }}
      >
        {" "}
        &copy; {1900 + new Date().getYear()}
      </Text>
      <List display="flex">
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}
        >
          <Link fontWeight="500" color={linkColor} href="">
            Something
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}
        >
          <Link fontWeight="500" color={linkColor} href="">
            Something
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}
        >
          <Link fontWeight="500" color={linkColor} href="Something">
            Something
          </Link>
        </ListItem>
        <ListItem>
          <Link fontWeight="500" color={linkColor} href="">
            Something
          </Link>
        </ListItem>
      </List>
    </Flex>
  );
}
