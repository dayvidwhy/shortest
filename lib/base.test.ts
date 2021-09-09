import { toBase62, toBase10 } from "./base";

test("Should convert 5 to the same value in base 62", () => {
    const result = toBase62("5");
    expect(result).toBe("5");
});

test("Should convert 10 to a single character in base 62", () => {
    const result = toBase62("10");
    expect(result).toBe("a");
});

test("Should convert 4 back to the same value in base 10", () => {
    const result = toBase10("4");
    expect(result).toBe(4);
});

test("Should convert 'b' back to 11 in base 10", () => {
    const result = toBase10("b");
    expect(result).toBe(11);
});
