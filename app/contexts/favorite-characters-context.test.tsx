import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";

import {
  FavoriteCharactersProvider,
  useFavoriteCharacters,
} from "./favorite-characters-context";

const STORAGE_KEY = "favorite-ids";

// Test component to consume the context
function TestComponent() {
  const { ids, toggleId } = useFavoriteCharacters();
  return (
    <div>
      <div data-testid="ids-count">{ids.length}</div>
      <div data-testid="ids-list">{ids.join(",")}</div>
      <button onClick={() => toggleId(1)} data-testid="toggle-1">
        Toggle 1
      </button>
      <button onClick={() => toggleId(2)} data-testid="toggle-2">
        Toggle 2
      </button>
    </div>
  );
}

describe("FavoriteCharactersContext", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should load initial state from localStorage", async () => {
    const initialIds = [1, 2, 3];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialIds));

    render(
      <FavoriteCharactersProvider>
        <TestComponent />
      </FavoriteCharactersProvider>
    );

    // useEffect for initialization runs after render
    expect(screen.getByTestId("ids-count").textContent).toBe("3");
    expect(screen.getByTestId("ids-list").textContent).toBe("1,2,3");
  });

  it("should add a character id to favorites when toggleId is called and not present", () => {
    render(
      <FavoriteCharactersProvider>
        <TestComponent />
      </FavoriteCharactersProvider>
    );

    const toggleBtn = screen.getByTestId("toggle-1");
    act(() => {
      toggleBtn.click();
    });

    expect(screen.getByTestId("ids-count").textContent).toBe("1");
    expect(screen.getByTestId("ids-list").textContent).toBe("1");
  });

  it("should remove a character from favorites when toggleId is called and already present", () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([1]));

    render(
      <FavoriteCharactersProvider>
        <TestComponent />
      </FavoriteCharactersProvider>
    );

    const toggleBtn = screen.getByTestId("toggle-1");
    act(() => {
      toggleBtn.click();
    });

    expect(screen.getByTestId("ids-count").textContent).toBe("0");
    expect(screen.getByTestId("ids-list").textContent).toBe("");
  });

  it("should persist changes to localStorage", () => {
    render(
      <FavoriteCharactersProvider>
        <TestComponent />
      </FavoriteCharactersProvider>
    );

    const toggleBtn = screen.getByTestId("toggle-1");
    act(() => {
      toggleBtn.click();
    });

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    expect(stored).toContain(1);
    expect(stored.length).toBe(1);
  });

  it("should handle invalid localStorage data gracefully", () => {
    localStorage.setItem(STORAGE_KEY, "invalid-json{");

    render(
      <FavoriteCharactersProvider>
        <TestComponent />
      </FavoriteCharactersProvider>
    );

    expect(screen.getByTestId("ids-count").textContent).toBe("0");
    expect(console.error).toHaveBeenCalled();
  });

  it("should update favorites count correctly through multiple actions", () => {
    render(
      <FavoriteCharactersProvider>
        <TestComponent />
      </FavoriteCharactersProvider>
    );

    const toggle1 = screen.getByTestId("toggle-1");
    const toggle2 = screen.getByTestId("toggle-2");

    act(() => {
      toggle1.click();
    });
    expect(screen.getByTestId("ids-count").textContent).toBe("1");

    act(() => {
      toggle2.click();
    });
    expect(screen.getByTestId("ids-count").textContent).toBe("2");

    act(() => {
      toggle1.click();
    });
    expect(screen.getByTestId("ids-count").textContent).toBe("1");
  });

  it("should throw error if useFavoriteCharacters is used outside of provider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow(
      "useFavoriteCharacters must be used within a FavoriteCharactersProvider"
    );

    spy.mockRestore();
  });
});
