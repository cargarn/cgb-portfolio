import React from "react";
import { screen, render } from "@testing-library/react";
import { Card } from '../';

describe("Card", () => {
  it("SHOULD correctly render the title in the card node", async () => {
    const card = {
      title: "Hey",
      description: "Description",
      imageSrc: "",
    };
    render(
        <Card { ...card } />
    );

    expect(await screen.findByText(card.title)).toBeVisible();
  });
});