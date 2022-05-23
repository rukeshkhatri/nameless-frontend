import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Components/Pages/sections/Landing";
import Errors from "./Components/helpers/Errors";
import Register from "./Components/Pages/Register";
import About from "./Components/Pages/sections/About";
import Projects from "./Components/Pages/sections/Projects";
import HomePage from "./Components/UserProfile/HomePage";
import "./Components/Pages/sections/sectionstyles.css";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={"/"} element={<Landing />} />
				<Route path="/about" element={<About />} />
				<Route path="/project/:projectId" element={<Projects />} />
				<Route path="/project/oops" element={<Errors />} />
				<Route path={"/signup"} element={<Register />} />
				<Route path="/home" element={<HomePage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
