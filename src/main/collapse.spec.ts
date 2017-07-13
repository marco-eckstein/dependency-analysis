import collapse from "./collapse";

describe("collapse", () => {
    it("collapses 1 level by default", () => {
        /* tslint:disable */
        const input = {
            "a/aa1": ["b/bb/bbb1"],
            "a/aa2": ["b/bb/bbb1", "c/cc1"],
            "b/bb/bbb1": ["b/bb/bbb2"],
            "b/bb/bbb2": ["c/cc1"],
            "b/bb/bbb3": ["d/dd1"],
            "c/cc1": [],
            "d/dd1": [],
        };
        const output = {
            "a": ["b/bb", "c"],
            "b/bb": ["c", "d"],
            "c": [],
            "d": [],
        };
        /* tslint:enable */
        const actual = JSON.stringify(collapse(input));
        const expected = JSON.stringify(output);
        expect(actual).toEqual(expected);
    });
    it("can collapse 2 levels", () => {
        /* tslint:disable */
        const input = {
            "a/aa/aaa": ["b/bb/bbb"],
            "b/bb/bbb": [],
        };
        const output = {
            "a": ["b"],
            "b": [],
        };
        /* tslint:enable */
        const actual = JSON.stringify(collapse(input, 2));
        const expected = JSON.stringify(output);
        expect(actual).toEqual(expected);
    });
});
