import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
	test("App component renders on the screen", () => {
		render(<App />);
		const divElement = screen.getByText("My App");
		expect(divElement).toBeInTheDocument();
	});
});
