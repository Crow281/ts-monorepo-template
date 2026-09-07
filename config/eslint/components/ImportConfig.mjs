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
import * as importAlias from "@limegrass/eslint-plugin-import-alias";
import { importX } from "eslint-plugin-import-x";

/**
 * The ESLint configuration integrating import checking.
 * @type {import("eslint").Linter.Config[]}
 */
const config = [
    //Setup default import checking.
    importX.flatConfigs.recommended,
    importX.flatConfigs.typescript,

    //Enforces import aliases for various project scripts.
    //This will use the nearest tsconfig to define import aliases,
    //as defined inside of PackageConfig.
    {
        //Select the globs we are enforcing import aliases on.
        files: [
            //Package source scripts should use import aliases.
            "./packages/*/src/**/*",

            //Package test scripts should use import aliases.
            "./packages/*/tests/**/*",
        ],

        //Load the import alias plugin.
        plugins: {
            "@limegrass/import-alias": importAlias,
        },

        //Tell it to treat non-aliases as errors.
        rules: {
            "@limegrass/import-alias/import-alias": ["error"],
        },
    },
];

//Provide the configuration object.
export default config;
