import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	Box,
	Container,
	Heading,
	Text,
	Stack,
	HStack,
	List,
	ListItem,
	ListIcon,
	useColorModeValue,
	VStack,
	Flex,
	Image,
	Link,
	Button,
	useDisclosure,
} from "@chakra-ui/react";
import { CheckIcon, CalendarIcon, HamburgerIcon } from "@chakra-ui/icons";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import axios from "axios";
import MenuModal from "../../helpers/MenuModal";

const Projects = () => {
	let { projectId } = useParams();
	const [projectInfo, setProjectInfo] = useState({});
	const { name, description, url, features, future_plan, screenshots } =
		projectInfo;
	const navigate = useNavigate();
	const { isOpen, onOpen, onClose } = useDisclosure();

	useEffect(() => {
		const fetchData = async () => {
			await axios
				.get(
					`http://peaceful-earth-08821.herokuapp.com/api/v1/project/${projectId}`
				)
				.then((response) => {
					setProjectInfo(response.data);
				})
				.catch((error) => {
					navigate("/project/oops", { state: error.response.status });
				});
		};
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [projectId]);

	const arrowStyles = {
		cursor: "pointer",
		pos: "absolute",
		top: "50%",
		w: "auto",
		mt: "-22px",
		p: "16px",
		color: "white",
		fontWeight: "bold",
		fontSize: "12px",
		transition: "0.4s ease",
		borderRadius: "0 3px 3px 0",
		userSelect: "none",
		_hover: {
			opacity: 0.3,
			bg: "black",
		},
	};

	const actualDescription = () => {
		if (name === "Private") {
			return (
				<span>
					{description} Shoutout to{" "}
					<Link href="https://twitter.com/dhurba87" isExternal>
						Dhurba.
					</Link>
				</span>
			);
		} else {
			return description;
		}
	};

	const [currentSlide, setCurrentSlide] = useState(0);

	const slidesCount = screenshots && screenshots.length;

	const prevSlide = () => {
		setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
	};
	const nextSlide = () => {
		setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
	};

	const carouselStyle = {
		transition: "all .5s",
		ml: `-${currentSlide * 100}%`,
	};

	return (
		<Box
			p={10}
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
			<Stack
				spacing={4}
				as={Container}
				maxW={"3xl"}
				textAlign={"center"}
				className={"project--header"}
			>
				<Heading fontSize={"3xl"}>
					<Link href={url} isExternal={true} className={"project--headerlink"}>
						Project {name}
					</Link>
				</Heading>
				<Text
					color={"gray.600"}
					fontSize={"xl"}
					className={"project--description"}
				>
					{actualDescription()}
				</Text>
			</Stack>
			<VStack>
				<Container maxW={"6xl"} mt={20}>
					<HStack spacing="340px" justify={"center"}>
						<Box
							maxW={"420px"}
							w={"full"}
							h={"400px"}
							bg={useColorModeValue("white", "gray.900")}
							boxShadow={"2xl"}
							rounded={"lg"}
							p={10}
							px={14}
						>
							<List spacing={3}>
								<Heading pb={10}>Key Features</Heading>

								{features &&
									features.map((feature, index) => (
										<ListItem key={index}>
											<ListIcon as={CheckIcon} color="green.500" />
											{feature}
										</ListItem>
									))}
							</List>
						</Box>

						<Box
							maxW={"420px"}
							w={"full"}
							h={"400px"}
							bg={useColorModeValue("white", "gray.900")}
							boxShadow={"2xl"}
							rounded={"lg"}
							p={10}
							px={14}
						>
							<List spacing={3}>
								<Heading pb={10}>Future Plans</Heading>

								{future_plan &&
									future_plan.map((plan, index) => (
										<ListItem key={index}>
											<ListIcon as={CalendarIcon} color="green.500" />
											{plan}
										</ListItem>
									))}
							</List>
						</Box>
					</HStack>
				</Container>

				{screenshots && (
					<>
						<Heading pt={16}>Screenshots</Heading>
						<Flex w="800px" alignItems="center" justifyContent="center">
							<Flex w="full" overflow="hidden" pos="relative">
								<Flex h="300px" w="full" {...carouselStyle}>
									{screenshots &&
										screenshots.map((slide, sid) => (
											<Box
												key={`slide-${sid}`}
												boxSize="full"
												flex="none"
												align={"center"}
											>
												<Zoom zoomMargin={100} boxSize={"sm"}>
													<Image
														src={slide}
														alt="carousel image"
														height={"300px"}
														borderRadius={"10px"}
														objectFit={"contain"}
													/>
												</Zoom>
											</Box>
										))}
								</Flex>
								<Text {...arrowStyles} left="0" onClick={prevSlide}>
									&#10094;
								</Text>
								<Text {...arrowStyles} right="0" onClick={nextSlide}>
									&#10095;
								</Text>
							</Flex>
						</Flex>
					</>
				)}
			</VStack>
		</Box>
	);
};

export default Projects;
