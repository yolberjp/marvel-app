import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
  type Mock,
} from "vitest";
import { fetchApi } from "./api";

describe("fetchApi", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = vi.fn() as unknown as typeof fetch;
    vi.stubEnv("COMICVINE_API_KEY", "test-api-key");
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  it("should construct the correct URL with API key and parameters", async () => {
    const mockResponse = { results: [], status_code: 1, error: "OK" };
    (global.fetch as Mock).mockResolvedValue({
      json: () => Promise.resolve(mockResponse),
    });

    await fetchApi("test-endpoint", { param1: "value1", param2: "value2" });

    const expectedUrl =
      "https://comicvine.gamespot.com/api/test-endpoint/?api_key=test-api-key&format=json&param1=value1&param2=value2";
    expect(global.fetch).toHaveBeenCalledWith(expectedUrl);
  });

  it("should construct the correct URL when no parameters are provided", async () => {
    const mockResponse = { results: [], status_code: 1, error: "OK" };
    (global.fetch as Mock).mockResolvedValue({
      json: () => Promise.resolve(mockResponse),
    });

    await fetchApi("test-endpoint");

    const expectedUrl =
      "https://comicvine.gamespot.com/api/test-endpoint/?api_key=test-api-key&format=json&";
    expect(global.fetch).toHaveBeenCalledWith(expectedUrl);
  });

  it("should handle error when API key is missing (undefined in environment)", async () => {
    vi.stubEnv("COMICVINE_API_KEY", "");
    await expect(fetchApi("test-endpoint")).rejects.toThrow(
      "API_KEY is missing"
    );
  });

  it("should handle failed fetch requests", async () => {
    const fetchError = new Error("Network error");
    (global.fetch as Mock).mockRejectedValue(fetchError);

    await expect(fetchApi("test-endpoint")).rejects.toThrow("Network error");
  });
});
