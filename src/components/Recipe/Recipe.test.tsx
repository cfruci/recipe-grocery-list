import { render, screen } from "@testing-library/react";

import Recipe from "./Recipe";

describe("Renders Recipe component", () => {
	test("Renders Recipe component to screen", () => {
		render(<Recipe name="null" />);
		const recipe = screen.getByText("Recipe");
		expect(recipe).toBeInTheDocument();
	});
});
