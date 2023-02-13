import React from "react";
import { screen, render } from "@testing-library/react";
import { ContactMeSection } from '../';

describe("ContactMeSection", () => {
  it("SHOULD correctly render the contact me section", async () => {
    render(
      <ContactMeSection />
    );

    expect(await screen.findByText("Contact me")).toBeVisible();
  });
});