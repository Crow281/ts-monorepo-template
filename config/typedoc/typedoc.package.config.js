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
/**
 * Base configuration object for TypeDoc in
 * individual packages in the monorepo,
 * shared by all of them.
 *
 * TypeDoc is a tool to create web documentation for the project's code.
 *
 * Note that since this object is extended by the TypeDoc
 * config files in each individual package,
 * file paths will be relative to there.
 * @type {Partial<import("typedoc").TypeDocOptions>}
 */
const config = {
    //Record the version according to NPM package.json.
    includeVersion: true,
    //Specify where to find the typescript configuration for this package.
    tsconfig: "./tsconfig.json",
    //Search all of the folders in entry points.
    entryPointStrategy: "Expand",
    //List of package locations to search for files to document.
    //Paths will be relative to the individual config file
    entryPoints: ["src/"],
    //Make the root source folder the display base path,
    //to enforce consistency if there is nothing at the root.
    //Otherwise, for example, if the common root of everything
    //is subfolder "src/some-folder", then some-folder
    displayBasePath: "src/",
    //Additional package documents to package into the TypeDoc.
    projectDocuments: [
        //List of changes made to every package.
        "CHANGELOG.md",
    ],
    //Location of the package project readme file.
    readme: "./README.md",
};

//Provide the configuration object.
export default config;
