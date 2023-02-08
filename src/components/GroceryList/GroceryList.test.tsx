import { render, screen } from "@testing-library/react";

import GroceryList from "./GroceryList";

describe("Grocery List component", () => {
	test("Renders Grocery List component", () => {
		render(<GroceryList />);
		const heading = screen.getByRole("heading");
		expect(heading).toBeInTheDocument();
	});
});
