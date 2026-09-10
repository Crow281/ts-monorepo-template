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
import { defineConfig } from "tsdown";
import type { UserConfig } from "tsdown";

/**
 * The configuration object this project is using for tsdown.
 */
const config: UserConfig = defineConfig({
    //Tell tsdown to use workspace mode,
    //and that there are multiple packages to build.
    workspace: {
        //Select the specific spot the packages to operate are in.
        include: [
            "packages/*"
        ]
    },

    //Enables generation of TypeScript declaration files,
    //the files explaining the types of each item in the project.
    dts: {},

    //Files user imports from in final library.
    //Paths are relative to the package currently being operated on.
    entry: [
        //Make every non-internal script under the source directory an entry file.
        "./src/**/*.ts",

        //Do NOT make scripts inside of internal directories directly available.
        //This project is setup to make anything under an "internal" directory
        //part of the project not publically accessible.
        "!**/internal/**",
    ],

    //Makes it so that every source file maps to one output module.
    //Makes the mapping between them clear and makes it
    //so that end users import the specific module they want
    //instead of everything from one.
    unbundle: true,

    //Shrink output. If user needs to map back to source,
    //that's what source maps are for.
    //TODO: As of writing, tsdown still considers this feature experimental.
    //minify: true,

    //Formats to output built modules to in the final library.
    //Enable CommonJS for older projects and ES for newer ones.
    format: [
        //ES Module file format.
        "esm",
        //CommonJS Module file format.
        "cjs",
    ],

    //Tells tsdown to update package.json's exports field.
    exports: {
        //Tells tsdown what it should NOT export.
        exclude: [
            //Ensure internal files are NOT exported.
            "**/internal/**",
        ],
    },
});

//Provide the configuration object.
export default config;
