// TODO: Refactor to separate npm package.

// Cannot use spread operator, see:
// https://stackoverflow.com/questions/44986333/typescript-strictnullchecks-and-arrays
export function concat<T>(arrays: T[][]): T[] {
    let result: T[] = [];
    for (const array of arrays) {
        result = result.concat(array as T[]);
    }
    return result;
}
