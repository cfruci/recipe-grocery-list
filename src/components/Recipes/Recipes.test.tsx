import { render, screen } from "@testing-library/react";

import Recipes from "./Recipes";

describe("Recipes component", () => {
	test("Renders recipes component", () => {
		render(<Recipes />);
		const h2 = screen.getByText("My Recipes");
		expect(h2).toBeInTheDocument();
	});
});
