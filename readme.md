[![npm version](https://badge.fury.io/js/%40marco-eckstein%2Fdependency-analysis.svg)](https://badge.fury.io/js/%40marco-eckstein%2Fdependency-analysis)

Tools that supplement the JavaScript module dependency analysis tool 
[madge](https://www.npmjs.com/package/madge).

So far, there is only one tool: `collapse`. It allows you to collapse module dependencies, i.e., 
to view dependencies between the folders in which the models are contained. You can thus get a more 
coarse-grained overview of your project structure.

# Usage

## Command-line

Madge analyzes your dependencies and lets you output them in various format, e.g. JSON: `madge --json modules-base-dir > dependencies.json`

An example output may be:

```
{
  "a/aa1": ["b/bb/bbb1"],
  "a/aa2": ["b/bb/bbb1", "c/cc1"],
  "b/bb/bbb1": ["b/bb/bbb2"],
  "b/bb/bbb2": ["c/cc1"],
  "b/bb/bbb3": ["d/dd1"],
  "c/cc1": [],
  "d/dd1": [],
};
```

If your project is large, your dependencies (especially when viewed as an image) may become overwhelming.
Use `dependency-analysis collapse < dependencies.json` to collapse them by a level:

```
{
  "a": ["b/bb", "c"],
  "b/bb": ["c", "d"],
  "c": [],
  "d": [],
};
```

You can also collapse by multiple levels:
`dependency-analysis collapse --levels 2 < dependencies.json`

Input:

```
{
  "a/aa/aaa": ["b/bb/bbb"],
  "b/bb/bbb": [],
};
```

Output:

```
{
  "a": ["b"],
  "b": [],
};
```

Note that the minimum level of nesting in your input file must be equal to or larger than the levels 
you are collapsing!

Interaction with the madge command:

`madge --json modules-base-dir | dependency-analysis collapse > dependencies-collapsed.json`

## API

```
import { collapse } from "@marco-eckstein/dependency-analysis";

const dependencies = JSON.parse(fs.readFileSync("deps.json", "utf8"));
const levels = 2;
const dependenciesCollapsed = collapse(dependencies, levels);
```

# Development

No global modules other than `npm` are necessary.

- Run `npm install` once after checking out.
- Then, run either `npm test` for a single full build cycle (clean, compile, lint, test), 
  or `npm start` for running the full cycle initially and then watch for file changes which will 
  trigger appropriate parts of the build cycle (compile, lint, test). The watch mode is not bulletproof:
  It works for file updates, but you may get problems if you rename or delete files.
- Publish with `npm publish --access public`. This will run the full build cycle before publishing.
