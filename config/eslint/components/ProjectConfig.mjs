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
import { join, resolve } from "path";

/**
 * Absolute path to the project root.
 *
 * Is calculated from this file's original location.
 */
const PROJECT_ROOT_PATH = resolve(join(import.meta.dirname, "../../.."));

/**
 * The ESLint configuration defining project details.
 * @type {import("eslint").Linter.Config[]}
 */
const config = [
    {
        //Filter which files this is relevant to.
        //This does NOT apply to everything, like the project config scripts.
        files: [
            //This is needed for package source scripts.
            "./packages/*/src/**/*",

            //This is needed for package test scripts.
            "./packages/*/tests/**/*",
        ],

        languageOptions: {
            parserOptions: {
                //Search for the nearest tsconfig file when resolving types.
                projectService: true,

                //Do not go higher than the project's root searching for tsconfig files.
                tsconfigRootDir: PROJECT_ROOT_PATH,
            },
        },
    },

    //Tell ESLint what it should NOT check.
    //Note that paths are relative to the working directory of the console calling ESLint,
    //so treat them as relative to the project root folder.
    {
        ignores: [
            //Ignore NPM libraries.
            "**/node_modules/**",

            //Ignore template assets.
            "config/template/assets/**/*",

            //Ignore generated docs.
            "doc/api/**/*",

            //Ignore distributable files.
            "packages/*/dist/**/*",

            //Ignore dynamically generated files
            //(if there are any).
            "packages/*/generated/**/*",
        ],
    },

    //Add any custom rules we want to ESLint.
    {
        rules: {
            //The rule that triggers whenever a variable is declared but not used.
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    //Disable unused parameter checking.
                    //It is common for interfaces or callbacks
                    //to define parameters you might not plan on using.
                    //I figure that for documentation purposes
                    //and potential future modifications,
                    //it's better to leave them in even if not used.
                    args: "none",

                    //Likewise, don't trigger when an error is caught but not itself used.
                    caughtErrors: "none",
                },
            ],
        },
    },
];

//Provide the configuration object.
export default config;
