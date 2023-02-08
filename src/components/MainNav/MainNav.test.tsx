import { render, screen } from "@testing-library/react";
import MainNav from "./MainNav";

describe("Main Nav component", () => {
	test("Renders Main Nav to screen", () => {
		render(<MainNav />);
		const navigation = screen.getByRole("navigation");
		expect(navigation).toBeInTheDocument();
	});
});
