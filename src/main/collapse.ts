import DependenciesMap from "./DependenciesMap";
import { concat } from "./util";

export default function collapse(map: DependenciesMap, levels: number = 1): DependenciesMap {
    const multiMap = upAll(map, levels);
    return toDependenciesMap(multiMap);
}

interface DependenciesMultiMap {
    [key: string]: string[][];
}

function upAll(map: DependenciesMap, levels = 1): DependenciesMultiMap {
    const result: DependenciesMultiMap = {};
    for (let key of Object.keys(map)) {
        key = key as string;
        const keyUpped = up(key, levels);
        const valuesUpped = map[key].map(it => up(it, levels));
        if (!result[keyUpped]) {
            result[keyUpped] = [];
        }
        result[keyUpped].push(valuesUpped);
    }
    return result;
}

function up(path: string, levels: number = 1): string {
    const parts = path.split("/");
    return parts.slice(0, parts.length - levels).join("/");
}

function toDependenciesMap(multiMap: DependenciesMultiMap): DependenciesMap {
    const result: DependenciesMap = {};
    for (let key of Object.keys(multiMap)) {
        key = key as string;
        const arrays = multiMap[key];
        result[key] = [...new Set(concat(arrays))].filter(it => it !== key) as string[];
    }
    return result;
}
