import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import theme from "./theme";
import { ChakraProvider } from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	// <React.StrictMode>
	<ChakraProvider theme={theme}>
	<title> Nameless </title>
		<App />
	</ChakraProvider>
	// </React.StrictMode>
);
