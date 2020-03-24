import React from "react";

import { render, cleanup } from "@testing-library/react";

import DayListItem from "components/DayListItem";

afterEach(cleanup);

xit("renders without crashing", () => {
  render(<DayListItem />);
});

it("renders 'no spots remaining' when there are 0 spots", () => {
  const { getByText } = render(<DayListItem name="Monday" spots={0} />);
  expect(getByText("no spots remaining")).toBeInTheDocument();
});

it("renders '1 spot remaining' when there is 1 spot", () => {
  const { getByText } = render(<DayListItem name="Monday" spots={1} />);
  expect(getByText("1 spot remaining")).toBeInTheDocument();
});

it("renders '2 spots remaining' when there are 2 spots", () => {
  const { getByText } = render(<DayListItem name="Monday" spots={2} />);
  expect(getByText("2 spots remaining")).toBeInTheDocument();
});


it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  // 1. Render the Application.
  const { container } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  // 3. Click the "Add" button on the first empty appointment.
  // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
  // 5. Click the first interviewer in the list.
  // 6. Click the "Save" button on that same appointment.
  // 7. Check that the element with the text "Saving" is displayed.
  // 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
  // 9. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
});