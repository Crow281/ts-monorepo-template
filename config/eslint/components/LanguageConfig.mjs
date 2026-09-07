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
import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginTsdoc from "eslint-plugin-tsdoc";
import globals from "globals";
import { configs as typescriptEslintConfigs } from "typescript-eslint";

/**
 * The ESLint configuration defining how to interpret various languages.
 * @type {import("eslint").Linter.Config[]}
 */
const config = [
    //Setup javascript checking.
    pluginJs.configs.recommended,

    //Setup typescript checking.
    ...typescriptEslintConfigs.recommended,

    //Setup TypeDoc checking.
    {
        plugins: {
            "eslint-plugin-tsdoc": eslintPluginTsdoc,
        },
    },

    //Tell Lint we want access to browser globals.
    {
        languageOptions: {
            globals: globals.browser,
        },
    },

    //Disable anything prettier will handle.
    eslintConfigPrettier,
];

//Provide the configuration object.
export default config;
