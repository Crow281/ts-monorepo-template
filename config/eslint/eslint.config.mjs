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
 * Exports the base ESLint configuration used by this project.
 * ESLint is a tool to find formatting problems in your code.
 */
import ImportConfig from "./components/ImportConfig.mjs";
import LanguageConfig from "./components/LanguageConfig.mjs";
import ProjectConfig from "./components/ProjectConfig.mjs";

/**
 * The basic configuration object this project is using for ESLint.
 * ESLint is used to check for bad coding practices.
 *
 * This object combines multiple sub-configurations into
 * one big configuration array.
 * @type {import("eslint").Linter.Config[]}
 */
const config = [
    //Holds lint configuration for interpreting languages.
    ...LanguageConfig,
    //Holds lint configuration for imports.
    ...ImportConfig,
    //Holds lint configuration defining project details, like which files to check.
    ...ProjectConfig,
];

//Provide the configuration object.
export default config;
