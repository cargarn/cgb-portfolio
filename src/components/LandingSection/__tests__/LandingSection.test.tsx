import React from "react";
import { screen, render } from "@testing-library/react";
import { LandingSection } from '../';

describe("LandingSection", () => {
  it("SHOULD correctly render the LandingSection", async () => {
    render(
      <LandingSection />
    );

    expect(await screen.findByText("asdasdasd")).toBeVisible();
  });
});