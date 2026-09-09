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
import type { MustacheValue } from "./MustacheValue.ts";
import type { TemplateOptions } from "./TemplateOptions.ts";
import { access, mkdir, readFile, readdir, writeFile } from "fs/promises";
import Mustache from "mustache";
import { dirname, join, relative, resolve } from "path";
import { stdin, stdout } from "process";
import { Interface, createInterface } from "readline/promises";
import { fileURLToPath } from "url";

/**
 * Absolute path to the folder containing all the template files for a new package.
 *
 * Path is created from its location relative to where this script is expected to be.
 */
const PACKAGE_TEMPLATE_PATH: string = resolve(
    //Convert the URL to a file path.
    //Resolve up above will convert this to an absolute URL
    fileURLToPath(
        //Get the URL to the package template directory,
        //relative to this script.
        new URL("../assets/add-package", import.meta.url),
    ),
);

/**
 * Absolute path to the folder where packages are stored.
 *
 * Path is set to its location relative to where this script is expected to be.
 */
const WORKSPACE_PATH: string = resolve(
    //Convert the URL to a file path.
    //Resolve up above will convert this to an absolute URL
    fileURLToPath(
        //Get the URL to the package directory,
        //relative to this script.
        new URL("../../../packages", import.meta.url),
    ),
);

/**
 *
 * @returns
 * The config object used to customize templates in this project.
 */
async function loadConfig(): Promise<TemplateOptions> {
    //Attempt to import the config script.
    const importPromise = import("../template.config.ts");

    //Wait for config script to finish importing.
    const importedModule = await importPromise;

    //Return the config object stored to its default export.
    return importedModule.default;
}

/**
 * Reads the template file from the given file path
 * and creates a modified copy of it elsewhere, applying the mustache templates.
 * @param templateFilePath
 * File path to the template file.
 * @param outputFilePath
 * Where we want to write the output.
 * @param tagToValue
 * An object, mapping mustache tags to the valuse to replace them with.
 * @returns
 * A promise representing the operation.
 */
async function writeTemplate(
    templateFilePath: string,
    outputFilePath: string,
    view: MustacheValue,
): Promise<void> {
    //Read the template file.
    const templateText: string = await readFile(templateFilePath, "utf8");

    //Fill in the template.
    const renderedText: string = Mustache.render(templateText, view);
    //const filledText: string = replaceMustaches(templateText, tagToValue);

    //Ensure that the new file's folder exists.
    await mkdir(
        //Get the name of the directory the file will be placed in.
        dirname(outputFilePath),
        {
            //Create any parents of parents as needed.
            recursive: true,
        },
    );

    //Write the new file.
    await writeFile(outputFilePath, renderedText, {
        encoding: "utf-8",
    });
}

/**
 * Determines where the given package would be written to.
 * @param unscopedPackageName
 * Unscoped name of the package being created.
 * @returns
 * Directory path new package should be written to.
 */
function getUnscopedPackagePath(unscopedPackageName: string): string {
    return join(WORKSPACE_PATH, unscopedPackageName);
}

/**
 * Creates a new package from template.
 * @param unscopedPackageName
 * Name of the package, WITHOUT the parent scope (if any).
 * For example, the unscoped package name of
 * (scope/some-package) would be "some-package".
 * @param view
 * Value used to customize the mustache template.
 * @returns
 * A promise representing the operation.
 */
async function addNewPackage(
    unscopedPackageName: string,
    view: MustacheValue,
): Promise<void> {
    //Figure out the folder that the new package will be created in.
    const destinationDirPath: string =
        getUnscopedPackagePath(unscopedPackageName);

    //Copy all the files over from PACKAGE_TEMPLATE_PATH,
    //replacing any templated variables with the correct values.
    //Get a list of all of the template files.
    const fileDirents = await readdir(PACKAGE_TEMPLATE_PATH, {
        withFileTypes: true,
        recursive: true,
    });

    //List of promises we are waiting on.
    const promises: Promise<unknown>[] = [];

    //Iterate the template files.
    for (const fileDirent of fileDirents) {
        //If this is a gitkeep file, ignore it.
        //It only exists to mark the existence of a directory in git.
        if (fileDirent.name === ".gitkeep") {
            continue;
        }

        //Calculate the full file path.
        const filePath: string = join(fileDirent.parentPath, fileDirent.name);

        //Calculate its path relative to the template root.
        const relativeFilePath: string = relative(
            PACKAGE_TEMPLATE_PATH,
            filePath,
        );

        //Calculate the output path.
        const outputFilePath: string = join(
            destinationDirPath,
            relativeFilePath,
        );

        //If this is a file.
        if (fileDirent.isFile()) {
            //Begin copying and modifying the template.
            const writeTemplatePromise: Promise<void> = writeTemplate(
                filePath,
                outputFilePath,
                view,
            );

            //Add to list of promises to wait on.
            promises.push(writeTemplatePromise);

            //If this is NOT a file.
        } else {
            //Simply create the folder.
            const makeDirPromise: Promise<unknown> = mkdir(outputFilePath, {
                recursive: true,
            });

            //Store to the list of promises to wait on.
            promises.push(makeDirPromise);
        }
    }

    //Wait for all the promises to complete.
    await Promise.all(promises);
}

/**
 * Calculates the unscoped package name of a given package.
 * @param npmPackageName
 * Name of the package.
 * @returns
 * The package name without the scope.
 *
 * If it doesn't have a scope to begin with,
 * there will be no change from paramter npmPackageName.
 */
function getNpmPackageNameUnscoped(npmPackageName: string): string {
    //Find the index of the separator, separating scope.
    const separatorIndex: number = npmPackageName.indexOf("/");

    //If this has a scope to begin with.
    if (separatorIndex >= 0) {
        //Return the package name without the scope and its separator.
        return npmPackageName.substring(separatorIndex + 1);

        //If there is no scope.
    } else {
        //Then we can just return the original value.
        return npmPackageName;
    }
}

/**
 * @param unscopedPackageName
 * Package we want to check if it exists in the user's project or not.
 * @returns
 * A promise that will resolve to true if the given package exists.
 */
async function existsUnscopedPackageName(
    unscopedPackageName: string,
): Promise<boolean> {
    //Calculate the path for the unscoped package name.
    const packagePath: string = getUnscopedPackagePath(unscopedPackageName);

    try {
        //Check if it exists.
        await access(packagePath);

        //If we were able to access it, it exists.
        return true;

        //If accessing it failed.
    } catch (error) {
        //Return that it does NOT exist.
        return false;
    }
}

/**
 * The overall logic of the script.
 * @returns
 * Promise representing the operation.
 */
async function run(): Promise<void> {
    //Load the template config.
    const config: TemplateOptions = await loadConfig();

    //Create an interface to the console
    //so that we can communicate with user.
    const consoleInterface: Interface = createInterface(stdin, stdout);

    //Tell user what this is.
    consoleInterface.write("Setting up package template...\n");

    //Stores the npm package name if not already set by config.
    let npmPackageName: MustacheValue | undefined = undefined;

    //Stores the unscoped npm package name if not already set by config.
    let npmPackageNameUnscoped: MustacheValue | undefined = undefined;

    //If package name is not set.
    if (!config.npmPackageNameUnscoped) {
        //If package name isn't set either.
        if (!config.npmPackageName) {
            //Request the package name by asking for it from the user.
            npmPackageName = await consoleInterface.question(
                'Name of your package (eg "@scope/package"): ',
            );

            //Calculate the unscoped package name.
            npmPackageNameUnscoped = getNpmPackageNameUnscoped(npmPackageName);

            //If package name is available.
        } else {
            //If package name is a string.
            if (typeof config.npmPackageName === "string") {
                //Calculate the unscoped package name.
                npmPackageNameUnscoped = getNpmPackageNameUnscoped(
                    config.npmPackageName,
                );

                //If package name is non-empty, but not a string.
            } else {
                //Throw an error.
                throw new Error(
                    "If npmPackageName and npmPackageNameUnscoped " +
                        "are set to any kind of value other than string, " +
                        "then both must be non-empty.",
                );
            }
        }

        //If the unscoped name is available.
    } else {
        //If the scoped name is NOT available.
        if (!config.npmPackageName) {
            //Set it to a copy of unscoped name.
            npmPackageName = config.npmPackageNameUnscoped;
        }
    }

    //Create the object to store all the template substitutions to.
    const addPackageView: TemplateOptions = {
        //Add the npmPackageName and npmPackageNameUnscoped if they needed to be calculated.
        npmPackageName: npmPackageName,
        npmPackageNameUnscoped: npmPackageNameUnscoped,

        //Add the script's tags, including any custom ones chosen by the user.
        //They can even override whatever was calculated by default if they want to.
        ...config,

        //Since TypeScript cannot infer the type correctly from
        //partial arguments, forcibly cast it.
    } as TemplateOptions;

    //Calculate the unscoped npm package name's value from its mustache.
    const npmPackageNameUnscopedString: string = Mustache.render(
        "{{npmPackageNameUnscoped}}",
        addPackageView,
    );

    //Check if the desired package already exists.
    const packageExists: boolean = await existsUnscopedPackageName(
        npmPackageNameUnscopedString,
    );

    //If the desired package already exists.
    if (packageExists) {
        //Since it exists, warn user
        //and tell them to delete it themselves
        //if they really want to reset it.
        consoleInterface.write(
            "A folder for package " +
                npmPackageNameUnscopedString +
                " already exists. " +
                "If you truly wish to reset it, delete the old one by hand.\n",
        );

        //Terminate our control over the console.
        consoleInterface.close();

        //Since there is nothing left to do, terminate the run.
        return;
    }

    //Now create the template.
    await addNewPackage(npmPackageNameUnscopedString, addPackageView);

    //Tell user we are done.
    consoleInterface.write("Finished!\n");

    //Terminate our control over the console.
    consoleInterface.close();
}

//Catch anything that goes wrong.
try {
    //Run the script.
    await run();

    //If anything goes wrong.
} catch (error) {
    //Report it to the console.
    console.error(error);
}
