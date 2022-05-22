import React from "react";
import { useLocation } from "react-router-dom";
import {
	Image,
	Heading,
	VStack,
	Center,
	Button,
	useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import MenuModal from "./MenuModal";

const Errors = () => {
	let code = useLocation().state;
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Center
			background={
				"linear-gradient(0deg, rgb(96 107 141) 0%, rgb(172 172 213) 100%)"
			}
			minH={"100vh"}
		>
			<Button
				rightIcon={<HamburgerIcon />}
				alignSelf={"self-end"}
				mt={"20px"}
				mr={"20px"}
				backgroundColor={"transparent"}
				position={"absolute"}
				top={0}
				right={0}
				_focus={{}}
				_active={{}}
				onClick={onOpen}
			>
				Menu
				<MenuModal isOpen={isOpen} onClose={onClose} />
			</Button>
			<VStack align={"center"}>
				<Image src="../sadface.png" alt="sad-face" boxSize={"60"} mb={14} />
				{code === 404 ? (
					<Heading>Project Doesn't Exist</Heading>
				) : (
					<Heading>Something else happened</Heading>
				)}
			</VStack>
		</Center>
	);
};

export default Errors;
