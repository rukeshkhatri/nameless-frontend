import React from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	Divider,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	Link,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const MenuModal = ({ onClose, isOpen, isLoggedIn }) => {
	const navigate = useNavigate();
	const logout = () => {
		localStorage.removeItem("jwt");
		navigate("/signup");
	};
	return (
		<Modal onClose={onClose} isOpen={isOpen} isCentered>
			<ModalOverlay />
			<ModalContent background={"#313744"} color={"white"} width={"14em"}>
				<ModalHeader alignSelf={"center"} textAlign={"center"} fontSize={"3xl"}>
					Menu
				</ModalHeader>
				<Divider
					width={"200px"}
					alignSelf={"center"}
					borderBottom={"solid 2px"}
				/>
				<ModalBody>
					<Accordion className="hero--accordion" allowToggle>
						<AccordionItem>
							<AccordionButton as={Link} href="/">
								Home
							</AccordionButton>
						</AccordionItem>
						<AccordionItem>
							<AccordionButton as={Link} className={"hero--projects"}>
								My Projects
							</AccordionButton>
							<AccordionPanel className="hero--panel" pb={4}>
								<Link href="/project/1">Project 1</Link>
								<Link href="/project/2">Project 2</Link>
								<Link href="/project/3">Project 3</Link>
							</AccordionPanel>
						</AccordionItem>

						<AccordionItem>
							<AccordionButton as={Link} href="/about">
								About Me
							</AccordionButton>
						</AccordionItem>

						{isLoggedIn ? (
							<AccordionItem>
								<AccordionButton as={Link} onClick={() => logout()}>
									Log Out
								</AccordionButton>
							</AccordionItem>
						) : (
							<AccordionItem>
								<AccordionButton as={Link} href="/signup">
									Sign Up
								</AccordionButton>
							</AccordionItem>
						)}
					</Accordion>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default MenuModal;
