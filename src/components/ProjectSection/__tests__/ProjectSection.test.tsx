import React from "react";
import { screen, render } from "@testing-library/react";
import { ProjectsSection } from '../';

describe("ProjectsSection", () => {
  it("SHOULD correctly render the ProjectsSection", async () => {
    render(
      <ProjectsSection />
    );

    expect(await screen.findByText("asdasdasd")).toBeVisible();
  });
});