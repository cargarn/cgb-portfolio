import React from "react";
import { screen, render } from "@testing-library/react";
import { LanguageSelector } from '..';

describe("LanguageSelector", () => {
  it("SHOULD correctly render the LanguageSelector", async () => {
    render(
      <LanguageSelector />
    );

    expect(await screen.findByText("asdasdasd")).toBeVisible();
  });
});