import React from "react";
import {
	Avatar,
	Box,
	Stack,
	Text,
	useColorModeValue,
	Button,
	useDisclosure,
	Link,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import MenuModal from "../../helpers/MenuModal";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const About = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Stack
			background={
				"linear-gradient(0deg, rgb(96 107 141) 0%, rgb(172 172 213) 100%)"
			}
			spacing={{ base: 8, md: 10 }}
			align={"center"}
			direction={"column"}
			height={"100vh"}
			justifyContent={"center"}
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
			<Text
				fontSize={{ base: "xl", md: "2xl" }}
				textAlign={"center"}
				maxW={"3xl"}
			>
				Still figuring stuff out!
			</Text>
			<Box textAlign={"center"}>
				<Avatar
					src={"https://avatars.githubusercontent.com/u/6669393?v=4"}
					alt={"Rukesh Khatri"}
					mb={2}
				/>

				<Text fontWeight={600}>Rukesh Khatri</Text>
				<Text fontSize={"sm"} color={useColorModeValue("gray.700", "gray.700")}>
					Web Developer
				</Text>
			</Box>
			<Box className="about--icons">
				<Link href="https://github.com/rukeshkhatri" isExternal>
					<GitHubIcon sx={{ fontSize: 55 }} />
				</Link>
				<Link href="https://www.instagram.com/rukeshkhatri/" isExternal>
					<InstagramIcon sx={{ fontSize: 55 }} />
				</Link>
				<Link href="https://www.facebook.com/rukeshkhatri/" isExternal>
					<FacebookIcon sx={{ fontSize: 55 }} />
				</Link>
				<Link href="https://www.linkedin.com/in/rukeshkhatri/" isExternal>
					<LinkedInIcon sx={{ fontSize: 55 }} />
				</Link>
			</Box>
		</Stack>
	);
};

export default About;
