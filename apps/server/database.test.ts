import {
    databaseLinkInsert,
    databaseLinkRetrieve
} from "./database.ts";

test("Should be able to insert a value into the database", () => {
    expect.assertions(2);
    return databaseLinkInsert("url test")
        .then((result) => {
            expect(result).toBe(1);
            return databaseLinkRetrieve(1)
                .then((result) => {
                    expect(result).toBe("url test");
                });
        });
});
