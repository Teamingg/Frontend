import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";

const Hello = ({ name }: { name: string }) => <h1>Hello, {name}!</h1>;

test("renders a greeting message", () => {
  render(<Hello name="Next.js" />);
  expect(screen.getByText("Hello, Next.js!")).toBeInTheDocument();
});
