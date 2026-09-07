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
 * Exports the project's knip configuration.
 * Knip is a tool used to check for anything not being used.
 */
import type { KnipConfig } from "knip";

/**
 * The configuration object this project is using for knip.
 */
const config: KnipConfig = {
    //This is a monorepo, meaning it can contain multiple linked packages.
    workspaces: {
        //Root folder.
        ".": {
            //Array of glob patterns to find entry files.
            //Entry files are files that are definitely used,
            //and the ones to check from to see if other files are used.
            //Can prefix with "!" for negation (e.x. "!some/path/SomeFile.ts").
            //Paths are relative to the working directory.
            //Since that is the project root, make these paths relative to root.
            entry: [
                //Give it the config directory, where all the project scripts are.
                //Treat every script as an entry.
                "config/**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}",

                //Block knip from operating on the templates,
                //since the resulting renders use relative
                //paths that aren't available to them as templates.
                "!config/template/assets/**/*",
            ],

            //Array of glob patterns to find project files.
            //Project files are files in the project that may or may not be used.
            //If knip cannot find an entry leading to it, it will be marked as unused.
            //Can prefix with "!" for negation (e.x. "!some/path/SomeFile.ts").
            project: [
                //Give it the config directory, where all the project scripts are.
                "config/**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}",

                //Block knip from operating on the templates,
                //since the resulting renders use relative
                //paths that aren't available to them as templates.
                "!config/template/assets/**/*",
            ],
        },
        //All packages in the monorepo to operate on.
        "packages/*": {
            //Array of glob patterns to find entry files.
            //Entry files are files that are definetely used,
            //and the ones to check from to see if other files are used.
            //Can prefix with "!" for negation (e.x. "!some/path/SomeFile.ts").
            //Paths are relative to the working directory.
            //Since that is the project root, make these paths relative to root.
            entry: [
                //Give it the source directory, where all the project source files are.
                "src/**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}",
            ],
            //Array of glob patterns to find project files.
            //Project files are files in the project that may or may not be used.
            //If knip cannot find an entry leading to it, it will be marked as unused.
            //Can prefix with "!" for negation (e.x. "!some/path/SomeFile.ts").
            //"project": []
        },
    },

    //Knip cannot detect all uses of dependencies,
    //such as dynamically imported ones.
    //Add any dependencies that are used,
    //but cannot be detected, to this array.
    //Make sure to leave a comment above them
    //to indicate where they are actually used.
    ignoreDependencies: [
        //One of the plugins used by TypeDoc.
        //TypeDoc uses it to create external links to MDN types.
        "typedoc-plugin-mdn-links",
    ],

    //Knip cannot always figure out how some stuff is imported.
    //Add any imports that are used,
    //but cannot be detected as such by knip,
    //so that it will ignore them when creating the output.
    //Make sure to leave a comment above them
    //to indicate where they are actually used
    //so that they can be removed from this list if
    //they are deprecated.
    ignoreUnresolved: [],
};

//Provide the configuration object.
export default config;
