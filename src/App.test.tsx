import React from "react";
import { cleanup, fireEvent, render, waitForDomChange, waitForElement } from "@testing-library/react"
import { ApolloMockedProvider } from "./test-utils/providers";
import App from "./App";
import { debug } from "console";

afterEach(cleanup)

test('make sure I can submit a todo', async() => {
    const { getByPlaceholderText, getByTestId, getByText  } = render(
        <ApolloMockedProvider>
            <App />
        </ApolloMockedProvider>
    );

    const todoInput = getByPlaceholderText('todo...')
    const submitButton = getByTestId("submit-button");
    fireEvent.click(submitButton)

    await waitForDomChange()

    fireEvent.change(todoInput, { target: { value: "go to the store"}});

    fireEvent.click(submitButton);
    await waitForElement(() => getByText("go to the store"));
})

