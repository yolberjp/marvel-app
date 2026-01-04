"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type CharacterId = number;

type FavoriteCharactersContextValue = {
  ids: CharacterId[];
  toggleId: (id: CharacterId) => void;
};

const STORAGE_KEY = "favorite-ids";

const FavoriteCharactersContext = createContext<
  FavoriteCharactersContextValue | undefined
>(undefined);

export function FavoriteCharactersProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ids, setIds] = useState<CharacterId[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedIds = JSON.parse(stored) as CharacterId[];
        setIds(parsedIds);
      }
    } catch (error) {
      console.error("Error loading favorites from localStorage:", error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    }
  }, [ids, isInitialized]);

  const toggleId = useCallback((id: CharacterId) => {
    setIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const value = useMemo<FavoriteCharactersContextValue>(
    () => ({ ids, toggleId }),
    [ids, toggleId]
  );

  return (
    <FavoriteCharactersContext value={value}>
      {children}
    </FavoriteCharactersContext>
  );
}

export function useFavoriteCharacters() {
  const ctx = useContext(FavoriteCharactersContext);
  if (!ctx)
    throw new Error(
      "useFavoriteCharacters must be used within a FavoriteCharactersProvider"
    );
  return ctx;
}
