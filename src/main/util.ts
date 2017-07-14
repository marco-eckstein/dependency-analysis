// TODO: Refactor to separate npm package and/or consider replacing by established 3rd party libraries.

export function concat<T>(arrays: T[][]): T[] {
    return ([] as T[]).concat(...arrays);
}

export function distinct<T>(array: T[]): T[] {
    return Array.from(new Set(array));
}
