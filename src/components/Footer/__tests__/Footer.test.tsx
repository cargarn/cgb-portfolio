import React from "react";
import { screen, render } from "@testing-library/react";
import { Footer } from '../index';
import { GeneralProvider } from "../../../context/generalContext";

describe("Footer", () => {
  it("SHOULD correctly render the footer including the given name", async () => {
    const authorName = "Example name";

    render(
        <GeneralProvider authorName={ authorName }>
            <Footer />
        </GeneralProvider>
    );

    expect(await screen.findByText(authorName)).toBeVisible();
  });
});