import DependenciesMap from "./DependenciesMap";
import * as util from "./util";

export default function collapse(map: DependenciesMap, levels: number = 1): DependenciesMap {
    const multiMap = upAll(map, levels);
    return toDependenciesMap(multiMap);
}

interface DependenciesMultiMap {
    [key: string]: string[][];
}

function upAll(map: DependenciesMap, levels = 1): DependenciesMultiMap {
    const result: DependenciesMultiMap = {};
    for (const module of Object.keys(map)) {
        const moduleUpped = up(module, levels);
        const dependenciesUpped = map[module].map(it => up(it, levels));
        if (!result[moduleUpped]) {
            result[moduleUpped] = [];
        }
        result[moduleUpped].push(dependenciesUpped);
    }
    return result;
}

function up(path: string, levels: number = 1): string {
    const parts = path.split("/");
    return parts.slice(0, parts.length - levels).join("/");
}

function toDependenciesMap(multiMap: DependenciesMultiMap): DependenciesMap {
    const result: DependenciesMap = {};
    for (const folder of Object.keys(multiMap)) {
        const dependencies = util.flatten(multiMap[folder]);
        result[folder] = util.distinct(dependencies).filter(it => it !== folder);
    }
    return result;
}
