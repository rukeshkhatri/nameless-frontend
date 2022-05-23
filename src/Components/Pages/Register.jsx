import { Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
	Box,
	Flex,
	Button,
	Stack,
	Image,
	Heading,
	useToast,
	VStack,
	CircularProgress,
	Alert,
	AlertIcon,
	AlertDescription,
	Text,
	useDisclosure,
	InputGroup,
	InputRightElement,
} from "@chakra-ui/react";
import TextForm from "./sections/TextForm";
import Login from "./Login";
import MenuModal from "../helpers/MenuModal";
import { ViewOffIcon, ViewIcon, HamburgerIcon } from "@chakra-ui/icons";

const Register = () => {
	const [backendError, setBackendError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const toast = useToast();
	const navigate = useNavigate();
	const {
		isOpen: isOpenLoginModal,
		onOpen: onOpenLoginModal,
		onClose: onCloseLoginModal,
	} = useDisclosure();
	const {
		isOpen: isOpenMenuModal,
		onOpen: onOpenMenuModal,
		onClose: onCloseMenuModal,
	} = useDisclosure();
	const [showPassword, setShowPassword] = useState(false);

	return (
		<Formik
			initialValues={{
				first_name: "",
				last_name: "",
				username: "",
				password: "",
			}}
			validationSchema={Yup.object({
				first_name: Yup.string().required("Can't be Blank"),
				last_name: Yup.string().required("Can't be Blank"),
				username: Yup.string()
					.required("Username required")
					.min(6, "Username too short"),
				password: Yup.string()
					.required("Password required")
					.min(6, "Password too short"),
			})}
			onSubmit={async (values, actions) => {
				actions.resetForm();
				setIsLoading(true);
				await axios
					.post("https://api-nameless.herokuapp.com/api/v1/users", {
						user: values,
					})
					.then((response) => {
						setIsLoading(false);
						localStorage.setItem("jwt", response.data.jwt); // INFO: this can removed if user have login after register
						toast({
							title: "Signup Successful",
							status: "success",
							duration: 3000,
							isClosable: true,
						});
						navigate("/home");
						setTimeout(() => window.location.reload(), 400);
					})
					.catch((error) => {
						setIsLoading(false);
						setBackendError(error.response.data.error);
					});
			}}
		>
			{(formik) => (
				<Flex
					align="center"
					justify={{
						base: "center",
						md: "space-around",
						xl: "space-between",
					}}
					direction={{ base: "column-reverse", md: "row" }}
					wrap="no-wrap"
					px={8}
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
						onClick={onOpenMenuModal}
					>
						Menu
						<MenuModal isOpen={isOpenMenuModal} onClose={onCloseMenuModal} />
					</Button>
					<Stack
						spacing={4}
						w={{ base: "80%", md: "40%" }}
						align={["center", "center", "flex-start", "flex-start"]}
					>
						<VStack
							as={"form"}
							mx={"auto"}
							w={{ base: "55%" }}
							justifyContent={"center"}
							onSubmit={formik.handleSubmit}
						>
							<Heading
								as="h1"
								size="xl"
								fontWeight="bold"
								color="primary.800"
								textAlign={["center", "center", "left", "left"]}
								mb={"20px"}
							>
								Signup Now !
							</Heading>
							{backendError &&
								backendError.map((err, index) => {
									return (
										<Alert
											key={index}
											status={"error"}
											variant={"left-accent"}
											borderRadius={"5px"}
											mb={"20px"}
											w={"98%"}
											marginLeft={"auto"}
										>
											<AlertIcon />
											<AlertDescription>{err}</AlertDescription>
										</Alert>
									);
								})}
							<TextForm name={"first_name"} label={"First Name"} />
							<TextForm name={"last_name"} label={"Last Name"} />
							<TextForm name={"username"} label={"Username"} />
							<InputGroup>
								<TextForm
									name={"password"}
									type={showPassword ? "text" : "password"}
									label={"Password"}
									placeholder={"********"}
								/>
								<InputRightElement width={"2.5rem"} top={"32px"}>
									<Button
										h="1.75rem"
										size={"xs"}
										onClick={() => setShowPassword(!showPassword)}
									>
										{showPassword ? <ViewOffIcon /> : <ViewIcon />}
									</Button>
								</InputRightElement>
							</InputGroup>

							<Button
								type={"submit"}
								variant={"outline"}
								colorScheme={"teal"}
								marginY={"25px!important"}
								width={"full"}
							>
								{isLoading ? (
									<CircularProgress
										isIndeterminate
										size={"24px"}
										color={"teal"}
									/>
								) : (
									"Sign Up"
								)}
							</Button>
							<Text as={"i"} color={"purple.600"}>
								Already have an account?
							</Text>
							<Button
								variant={"outline"}
								colorScheme={"gray"}
								width={"full"}
								bg={"blue.300"}
								onClick={onOpenLoginModal}
							>
								Log in
								<Login onClose={onCloseLoginModal} isOpen={isOpenLoginModal} />
							</Button>
						</VStack>
					</Stack>
					<Box
						w={{ base: "80%", sm: "60%", md: "50%" }}
						mb={{ base: 12, md: 0 }}
					>
						<Image
							src={"https://source.unsplash.com/collection/404339/800x600"}
							size="100%"
							rounded="1rem"
							shadow="2xl"
							mt={"20px"}
							fallbackSrc="logo512.png"
						/>
					</Box>
				</Flex>
			)}
		</Formik>
	);
};

export default Register;
