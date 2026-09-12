/*
 * The MIT License
 *
 * Copyright 2026 Crow281.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
import { EntryPointStrategy } from "typedoc";

/**
 * The configuration object this project is using for TypeDoc.
 *
 * TypeDoc is a tool to create web documentation for the project's code.
 *
 * Note that all file paths are relative to this file.
 * @type {Partial<import("typedoc").TypeDocOptions>}
 */
const config = {
    //How much we want typedoc to print to console. Defaults to "Info".
    logLevel: "Info",
    //List of plugins we are adding to typedoc.
    plugin: [
        //This plugin enables typedoc to understand
        //some of the global object types (like Math) and link them.
        "typedoc-plugin-mdn-links",
        //This custom plugin marks all modules under
        //an "internal" folder with the @internal tag.
        "./plugin/TagInternal.js",
    ],
    //Tells TypeDoc how to link to 3rd party library types.
    externalSymbolLinkMappings: {
        //Note that "!" must be appended (e.g. {@link !Error}) for globals.
        //The typedoc-plugin-mdn-links will handle most of these.
        "global": {
        },
    },
    //Search all of the packages in the monorepo.
    entryPointStrategy: EntryPointStrategy.Packages,
    //List of locations to search for packages.
    entryPoints: ["../../packages/*"],
    //Ensure that an entry is always created,
    //even if there is only one entry.
    //Ensures consistency even if the monorepo only has one package.
    alwaysCreateEntryPointModule: true,
    //What scripts shouldn't be documented.
    exclude: [],
    //The workspace itself does not have a version,
    //so do NOT include the version here.
    //Individual packages will inside of typedoc.base.config.js
    includeVersion: false,
    //Location of the overall project readme file.
    readme: "../../README.md",
    //Where to write the documentation to.
    out: "../../doc/api/latest",
};

//Provide the configuration object.
export default config;
