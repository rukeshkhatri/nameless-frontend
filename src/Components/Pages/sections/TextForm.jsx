import React from "react";
import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
} from "@chakra-ui/react";
import { Field, useField } from "formik";

const TextForm = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<FormControl isInvalid={meta.error && meta.touched}>
			<FormLabel fontWeight={"bold"}>{label}</FormLabel>
			<Field as={Input} {...field} {...props} />
			<FormErrorMessage>{meta.error}</FormErrorMessage>
		</FormControl>
	);
};

export default TextForm;
