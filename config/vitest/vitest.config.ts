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
import { UserConfig } from "vite";
import { defineConfig } from "vitest/config";

/**
 * The basic configuration object this project is using for Vitest.
 * Vitest is used to run unit tests and
 * ensure all the code is still working correctly.
 */
const config: UserConfig = defineConfig({
    //Options for the tsts.
    test: {
        //List of glob patterns for scripts being used as unit tests.
        include: [
            //Select the test files in the test folder of each package in the monorepo.
            "packages/*/tests/**/*.{test,spec}.?(c|m)[jt]s?(x)",
        ],

        //List of glob patterns to NOT test,
        //even if they are part of a glob pattern in include.
        exclude: [],
    },
    //Tells Vitest how to resolve paths.
    resolve: {
        //Tell Vitest to look for the nearest
        //tsconfig file to determine import paths.
        tsconfigPaths: true,
    },
});

//Provide the configuration object.
export default config;
