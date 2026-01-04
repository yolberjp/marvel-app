import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeaderFavoriteButton } from "./header-favorite-button";
import { useFavoriteCharacters } from "../../contexts/favorite-characters-context";

vi.mock("../../contexts/favorite-characters-context", () => ({
  useFavoriteCharacters: vi.fn(),
}));

vi.mock("../LinkLoader", () => ({
  default: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

describe("HeaderFavoriteButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should display 0 when there are no favorites", () => {
    (useFavoriteCharacters as Mock).mockReturnValue({ ids: [] });

    render(<HeaderFavoriteButton />);

    expect(screen.getByText("0")).toBeTruthy();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/favorites");
  });

  it("should display the correct count of favorites", () => {
    (useFavoriteCharacters as Mock).mockReturnValue({ ids: [1, 2, 3] });

    render(<HeaderFavoriteButton />);

    expect(screen.getByText("3")).toBeTruthy();
  });

  it("should update when favorites change", () => {
    const { rerender } = render(<HeaderFavoriteButton />);

    (useFavoriteCharacters as Mock).mockReturnValue({ ids: [1, 2] });
    rerender(<HeaderFavoriteButton />);
    expect(screen.getByText("2")).toBeTruthy();

    (useFavoriteCharacters as Mock).mockReturnValue({ ids: [1, 2, 3, 4, 5] });
    rerender(<HeaderFavoriteButton />);
    expect(screen.getByText("5")).toBeTruthy();
  });
});
