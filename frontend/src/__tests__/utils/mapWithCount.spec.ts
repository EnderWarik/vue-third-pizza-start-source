import { describe, expect, it } from "vitest";
import { mapWithCount } from "@/helpers/mappers";

describe("mapWithCount", () => {
  it("adds count:0 and preserves data", () => {
    const src = [{ id: 1, name: "a" }];
    const res = mapWithCount(src);
    expect(res).toHaveLength(1);
    expect(res[0]).toEqual({ id: 1, name: "a", count: 0 });
  });

  it("does not mutate original array", () => {
    const src = [{ id: 1 }];
    const before = JSON.stringify(src);
    void mapWithCount(src);
    expect(JSON.stringify(src)).toBe(before);
  });
});
