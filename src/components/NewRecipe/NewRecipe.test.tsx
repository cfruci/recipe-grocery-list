import { render, screen } from "@testing-library/react";
import NewRecipe from "./NewRecipe";

describe("New Recipe Component", () => {
	test("Renders new recipe form", () => {
		render(<NewRecipe />);
		const textElement = screen.getByText("New Recipe");
		expect(textElement).toBeInTheDocument();
	});
});
