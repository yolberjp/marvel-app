import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import FavoriteButton from "./favorite-button";
import { useFavoriteCharacters } from "../../contexts/favorite-characters-context";

vi.mock("../../contexts/favorite-characters-context", () => ({
  useFavoriteCharacters: vi.fn(),
}));

vi.mock("../icons/heart", () => ({
  HeartIcon: () => <svg data-testid="heart-icon" />,
}));

vi.mock("../icons/heart-off", () => ({
  HeartOffIcon: () => <svg data-testid="heart-off-icon" />,
}));

describe("FavoriteButton component", () => {
  const characterId = 123;
  const toggleIdMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render HeartOffIcon and 'Add to favorites' label when not favorite", () => {
    (useFavoriteCharacters as Mock).mockReturnValue({
      ids: [],
      toggleId: toggleIdMock,
    });

    render(<FavoriteButton characterId={characterId} />);

    expect(screen.getByTestId("heart-off-icon")).toBeTruthy();
    expect(screen.getByLabelText("Add to favorites")).toBeTruthy();
    expect(screen.queryByTestId("heart-icon")).toBeNull();
  });

  it("should render HeartIcon and 'Remove from favorites' label when is favorite", () => {
    (useFavoriteCharacters as Mock).mockReturnValue({
      ids: [characterId],
      toggleId: toggleIdMock,
    });

    render(<FavoriteButton characterId={characterId} />);

    expect(screen.getByTestId("heart-icon")).toBeTruthy();
    expect(screen.getByLabelText("Remove from favorites")).toBeTruthy();
    expect(screen.queryByTestId("heart-off-icon")).toBeNull();
  });

  it("should call toggleId with the correct characterId when clicked", () => {
    (useFavoriteCharacters as Mock).mockReturnValue({
      ids: [],
      toggleId: toggleIdMock,
    });

    render(<FavoriteButton characterId={characterId} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(toggleIdMock).toHaveBeenCalledTimes(1);
    expect(toggleIdMock).toHaveBeenCalledWith(characterId);
  });
});
