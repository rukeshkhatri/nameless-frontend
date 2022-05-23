import React, { useState } from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	Button,
	Alert,
	AlertIcon,
	AlertDescription,
	VStack,
	CircularProgress,
	useToast,
	InputGroup,
	InputRightElement,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import TextForm from "./sections/TextForm";
import axios from "axios";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const Login = ({ onClose, isOpen }) => {
	const [backendError, setBackendError] = React.useState("");

	const [isLoading, setIsLoading] = React.useState(false);

	const toast = useToast();

	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);

	return (
		<>
			<Modal onClose={onClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader textAlign={"center"} fontSize={"28px"}>
						Log In
					</ModalHeader>
					<ModalBody>
						{backendError && (
							<Alert
								status={"error"}
								variant={"left-accent"}
								borderRadius={"5px"}
								mb={"20px"}
								w={"98%"}
								marginLeft={"auto"}
							>
								<AlertIcon />
								<AlertDescription>{backendError}</AlertDescription>
							</Alert>
						)}

						<Formik
							initialValues={{
								username: "",
								password: "",
							}}
							validationSchema={Yup.object({
								username: Yup.string().required("can't be blank"),
							})}
							onSubmit={async (values) => {
								setIsLoading(true);
								await axios
									.post("https://api-nameless.herokuapp.com/api/v1/login", {
										user: values,
									})
									.then((response) => {
										localStorage.setItem("jwt", response.data.jwt);
										onClose();
										navigate("/home");
										toast({
											title: "Login Successful!",
											status: "success",
											duration: 3000,
											isClosable: true,
										});
										setIsLoading(false);
										setTimeout(() => window.location.reload(), 400);
									})
									.catch((error) => {
										setIsLoading(false);
										console.log(error);
										const actualError = error.response.data.message;
										setBackendError(actualError);
									});
							}}
						>
							{(formik) => (
								<VStack
									as={"form"}
									mx={"auto"}
									w={{ base: "90%" }}
									justifyContent={"center"}
									onSubmit={formik.handleSubmit}
								>
									<TextForm
										name={"username"}
										label={"Username"}
										type={"text"}
									/>
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
											"Log in"
										)}
									</Button>
								</VStack>
							)}
						</Formik>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default Login;
