import React from "react";
import { screen, render } from "@testing-library/react";
import { Header } from '../index';

describe("Header", () => {
  it("SHOULD correctly render the header", async () => {
    render(
      <Header />
    );

    //expect(await screen.findByText("asdasdasd")).toBeVisible();
  });
});