import { renderHook } from "@testing-library/react-hooks";
import useFetch from "../useFetch";

describe("useFetch", () => {
  test("SHOULD return default values", () => {
    const url = "";
    const { result } = renderHook(() => useFetch({ url }));

    expect(result.current.loading).toBe(false);
    expect(result.current.response).toEqual([]);
  });

});
