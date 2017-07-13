#!/usr/bin/env node

import * as program from "commander";
import * as fs from "fs";

import * as packageJson from "../../package.json";
import collapse from "../main/collapse";

const version = (packageJson as any).version;

const cli =
    program
        .usage("collapse [options] inputFile outputFile")
        .option("collapse", "Collapse dependencies")
        .option("-l, --levels [integer]", "If collapsing, specifies the level of collapsing. (default: 1)", 1)
        .version(version)
        .parse(process.argv);

if (cli.collapse && program.args.length === 2) {
    const inputFile = program.args[0];
    const outputFile = program.args[1];
    const input = fs.readFileSync(inputFile, "utf8");
    const collapsed = collapse(JSON.parse(input), cli.levels);
    const output = JSON.stringify(collapsed, null, 2);
    fs.writeFileSync(outputFile, output, { encoding: "utf8" });
    process.exit(0);
} else {
    log(program.helpInformation());
    process.exit(1);
}

function log(message: string) {
    /* tslint:disable */
    console.log(message);
    /* tslint:enable */
}
