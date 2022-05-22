import React, { useEffect, useState } from "react";
import { Box, Button, Heading, useDisclosure } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import MenuModal from "../helpers/MenuModal";
import axiosAuth from "../Auth/axiosAuth";

const HomePage = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [user, setUser] = useState({});

	const authService = async () => {
		await axiosAuth
			.get("/profile")
			.then((response) => {
				setUser(response.data.user);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		authService();
	}, []);

	return (
		<Box
			p={10}
			background={
				"linear-gradient(0deg, rgb(96 107 141) 0%, rgb(172 172 213) 100%)"
			}
			minH={"100vh"}
			align={"center"}
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
				<MenuModal
					isOpen={isOpen}
					onClose={onClose}
					isLoggedIn={user.first_name ? true : false}
				/>
			</Button>
			<Heading>Hello, {user.first_name}</Heading>
		</Box>
	);
};

export default HomePage;

// create a function to fetch a get request to profile
// run that function in useeffect
