import { validatedAddress } from "./validate.ts";

test("Should know a valid url", () => {
    const result = validatedAddress("https://google.com/");
    expect(result).toBe(true);
});

test("Should know an invalud url", () => {
    const result = validatedAddress("not a url");
    expect(result).toBe(false);
});
