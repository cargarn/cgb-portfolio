import { renderHook } from "@testing-library/react-hooks";
import useSubmit from "../useSubmit";

describe("useSubmit", () => {
  test("SHOULD return default values", () => {
    const { result } = renderHook(() => useSubmit());

    expect(result.current.isLoading).toBe(false);
  });

});
