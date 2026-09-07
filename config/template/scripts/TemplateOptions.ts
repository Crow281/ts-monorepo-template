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
import type { MustacheValue } from "./MustacheValue";

/**
 * By default, the user lets the script fill in
 * npmPackageName and npmPackageNameUnscoped itself,
 * based on user's input.
 * But if user wants to customize them in advance, they can.
 */
interface NpmPackageOptionsString {
    /**
     * Name of the NPM package.
     * @defaultValue
     * If both {@link npmPackageName} and {@link npmPackageNameUnscoped}
     * are left empty, the add-package script will
     * request it from the user and fill them in itself
     * before template rendering begins.
     *
     * if {@link npmPackageNameUnscoped} is set to a string,
     * but npmPackageName is empty,
     * it will be set to npmPackageNameUnscoped.
     */
    npmPackageName?: string;

    /**
     * Name of the NPM package without the scope.
     *
     * If the package name doesn't have a scope to begin with,
     * then it will be identical.
     * @defaultValue
     * If both {@link npmPackageName} and {@link npmPackageNameUnscoped}
     * are left empty, the add-package script will
     * request it from the user and fill them in itself
     * before template rendering begins.
     *
     * if {@link npmPackageName} is set to a string,
     * but npmPackageNameUnscoped is empty,
     * it will be calculated from npmPackageName,
     * removing the scope if it has one.
     */
    npmPackageNameUnscoped?: string;
}

/**
 * By default, the user lets the script fill in
 * {@link npmPackageName} and {@link npmPackageNameUnscoped} itself,
 * based on user's input.
 * But if user wants to customize them in advance, they can.
 *
 * Note that if npmPackageName is set to a non-string,
 * then npmPAckageNameUnscoped must be set to something,
 * else it's an error.
 */
interface NpmPackageOptionsMustache {
    /**
     * Name of the NPM package.
     * @defaultValue
     * If both {@link npmPackageName} and {@link npmPackageNameUnscoped}
     * are left empty, the add-package script will
     * request it from the user and fill them in itself
     * before template rendering begins.
     *
     * if {@link npmPackageNameUnscoped} is set,
     * then it will be copied to npmPackageName.
     */
    npmPackageName?: MustacheValue;

    /**
     * Name of the NPM package without the scope.
     *
     * If the package name doesn't have a scope to begin with,
     * then it will be identical.
     * @defaultValue
     * If both {@link npmPackageName} and {@link npmPackageNameUnscoped}
     * are left empty, the add-package script will
     * request it from the user and fill them in itself
     * before template rendering begins.
     *
     * if {@link npmPackageName} is set
     * to a non-empty value other than string,
     * but this is left empty, than that is an error.
     *
     * If you set this property yourself,
     * ensure that this returns a value that can be used
     * as a directory path, since that is how
     * add-package figures out where to write the new package to.
     */
    npmPackageNameUnscoped: MustacheValue;
}

/**
 * Contains the minimum required parameters for running add-package.
 */
export interface TemplateOptionsBase {
    /**
     * URL pointing to the location of this project's API documentation.
     */
    apiDocUrl: MustacheValue;

    /**
     * URL pointing to the page people can report bugs to.
     */
    bugReportUrl: MustacheValue;

    /**
     * URL pointing to the homepage of this package.
     */
    homepageUrl: MustacheValue;

    /**
     * Name of the license this project is using.
     */
    licenseName: MustacheValue;

    /**
     * URL to the Git repository.
     */
    repositoryUrl: MustacheValue;
}

/**
 * How this template is customized.
 * It is based on
 * {@link https://www.npmjs.com/package/mustache Mustache}
 * templates.
 *
 * You will need to set the required properties
 * yourself to instances of {@link MustacheValue},
 * to fill the templates in.
 *
 * The add-package script will create its own
 * instance of TemplateOptions, initialized
 * with some defaults, and then override them
 * with whatever you set inside your config file.
 * This combined object will then be used as
 * the view object for the template.
 *
 * If you want to override the template
 * or add your own custom mustache tags,
 * you can add your own properties,
 * and the associated mustaches will be
 * replaced with whatever strings you stored to them.
 */
export type TemplateOptions = Record<string, MustacheValue | undefined> &
    TemplateOptionsBase &
    (NpmPackageOptionsString | NpmPackageOptionsMustache);
