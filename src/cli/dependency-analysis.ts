#!/usr/bin/env node

import * as program from "commander";
import * as getStdin from "get-stdin";

import * as packageJson from "../../package.json";
import collapse from "../main/collapse";

const version = (packageJson as any).version;

program
    .usage("collapse [options] It reads from STDIN and writes to STDOUT.")
    .option("collapse", "Collapse dependencies")
    .option("-l, --levels [integer]", "If collapsing, specifies the level of collapsing. (default: 1)", 1)
    .version(version)
    .parse(process.argv);

if (program.collapse) {
    getStdin().then(input => {
        const collapsed = collapse(JSON.parse(input), program.levels);
        const output = JSON.stringify(collapsed, null, 2);
        log(output);
        process.exit();
    });
} else {
    log(program.helpInformation());
    process.exit(1);
}

function log(message: string) {
    /* tslint:disable */
    console.log(message);
    /* tslint:enable */
}
