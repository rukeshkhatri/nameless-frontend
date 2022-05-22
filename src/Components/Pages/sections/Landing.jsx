import { HamburgerIcon } from "@chakra-ui/icons";
import {
	Flex,
	Heading,
	Stack,
	Text,
	useBreakpointValue,
	Container,
	Link,
	Button,
	useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import MenuModal from "../../helpers/MenuModal";

const Landing = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Flex
			w={"full"}
			h={"100vh"}
			backgroundImage={"pbd.jpg"}
			backgroundSize={"cover"}
			backgroundPosition={"center center"}
			flexDirection={"column"}
		>
			<Button
				rightIcon={<HamburgerIcon color={"#00ffd0"} />}
				alignSelf={"flex-end"}
				mt={"20px"}
				mr={"20px"}
				backgroundColor={"transparent"}
				color={"#00ffd0"}
				_hover={{ bg: "#0E1A26" }}
				_focus={{}}
				_active={{}}
				onClick={onOpen}
			>
				Menu
				<MenuModal isOpen={isOpen} onClose={onClose} />
			</Button>
			<Stack
				w={"full"}
				justify={"center"}
				px={useBreakpointValue({ base: 25, md: 50 })}
				py={useBreakpointValue({ base: 125, md: 250 })}
			>
				<Stack maxW={"2xl"} align={"flex-start"} spacing={6}>
					<Heading
						as={"h1"}
						fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }}
						color={"#a2ffc7"}
						alignSelf={"center"}
					>
						Hello!!
					</Heading>
					<Text
						color={"white"}
						fontWeight={300}
						lineHeight={1.2}
						fontSize={useBreakpointValue({ base: "sm", md: "xl" })}
						className={"hero--description"}
					>
						After going through hundreds of images, I couldn't find the
						"perfect" image that I was looking for. The blurry image in the
						background might seem like a poor choice but when I looked at it, I
						knew it was the one. The image was taken by "Voyager 1" and Carl
						Sagon named it{" "}
						<Link
							href="https://www.youtube.com/watch?v=wupToqz1e2g"
							isExternal
							cursor={"pointer"}
						>
							"Pale Blue Dot"
						</Link>
						.
					</Text>
				</Stack>
			</Stack>
			<Container as={"footer"} mt={"auto"} color={"purple.50"} align={"center"}>
				<Text>
					Image Source:{" "}
					<Link
						href="https://solarsystem.nasa.gov/resources/536/voyager-1s-pale-blue-dot/"
						textDecoration={"underline"}
						isExternal
					>
						Pale Blue Dot
					</Link>
				</Text>
			</Container>
		</Flex>
	);
};

export default Landing;
