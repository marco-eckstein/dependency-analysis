// TODO: Refactor to separate npm package.

export function concat<T>(arrays: T[][]): T[] {
    return ([] as T[]).concat(...arrays);
}
