import React from "react";

// Chakra imports
import { Flex, useColorModeValue } from "@chakra-ui/react";

// Custom components
import { HorizonLogo, Firebird } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align="center" direction="column">
      {/* Top sidebar logo */}
      <Firebird h="64px" w="64px" />
      <HSeparator mb="20px" />
    </Flex>
  );
}

export default SidebarBrand;
