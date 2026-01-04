import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import CharacterCard from "./character-card";

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

vi.mock("../favorite-button/favorite-button", () => ({
  default: ({ characterId }: { characterId: number }) => (
    <button data-testid="favorite-button">Favorite {characterId}</button>
  ),
}));

vi.mock("../LinkLoader", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} data-testid="link-loader">
      {children}
    </a>
  ),
}));

describe("CharacterCard component", () => {
  const mockCharacter = {
    id: 101,
    name: "Spider-Man",
    imageUrl: "/spider.jpg",
    isFavorite: false,
  };

  it("renders character name correctly", () => {
    render(<CharacterCard character={mockCharacter} />);
    expect(screen.getByText("Spider-Man")).toBeInTheDocument();
  });

  it("renders character image with correct src and alt", () => {
    render(<CharacterCard character={mockCharacter} />);
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "/spider.jpg");
    expect(image).toHaveAttribute("alt", "Spider-Man");
  });

  it("links navigate to character detail page", () => {
    render(<CharacterCard character={mockCharacter} />);
    const links = screen.getAllByTestId("link-loader");

    links.forEach((link) => {
      expect(link).toHaveAttribute("href", "/character/101");
    });
  });

  it("integrates favorite button with correct character id", () => {
    render(<CharacterCard character={mockCharacter} />);
    const favoriteBtn = screen.getByTestId("favorite-button");
    expect(favoriteBtn).toHaveTextContent("Favorite 101");
  });
});
