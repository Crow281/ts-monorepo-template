# Structure

This document explains how the template is setup and the rationale behind it.

A list of project
[NPM Dependencies](./Dependencies.md)
are on their own page.

## Template

The NPM project has a script that
simplifies adding new packages to the monorepo:

```Console
npm run add-package
```

This script links to the
["{project}/config/template/scripts/AddPackage.ts"](../../../config/template/scripts/AddPackage.ts)
TypeScript file.
It will use the data in the config file,
as well as the question answered by the user,
to fill in the template it copies over.

The user can customize the templates by modifying the
[config file](../../../config/template/template.config.ts).

The scripts running the template itself are inside of
[here](../../../config/template/scripts/).

The template used for adding templated packages is located inside of
["{project}/config/template/assets/add-package"](../../../config/template/assets/add-package/).

### Mustache

The templates are based on
[mustache](https://www.npmjs.com/package/mustache),
making it possible to create documents like this:

```Markdown
# {{documentName}}

[Look at article {{articleName}}!]({{{articleUrl}}})
```

And fill it in like this:

```TypeScript
/**
 * An object mapping properties to values
 * to tell Mustache how to fill in a given template.
 */
const view = {
    //Replaces documentName with a simple string.
    documentName: "My Example Document",

    //Replaces articleName with a simple string.
    articleName: "Some Article",

    /**
     * A function that calculates an appropriate value for the mustache.
     * @param template
     * The data inside the mustache being processed.
     * @param render
     * Sub-rendering function using
     * the current view object as its view argument.
     * @returns
     * Whatever you want to fill this in with.
     */
    articleUrl: (
        text: string,
        render: (template: unknown) => string
        ): string => {
        //Assemble a URL.
        const baseUrl = "http://example.com/";

        //
        return "http://example.com/"
    }
};
```

Making it possible to render the template like this:

```Markdown
# My Example Document

[See this article!]({{{http://example.com/}}})
```

For more details, you can study
[the NPM package for it](https://www.npmjs.com/package/mustache).

## .npmrc

Customizes how the package manager behaves.

For security reasons,
it puts a delay on downloading the newest packages,
giving the community a chance to check for supply chain attacks.

For the same reason, it disables post-install scripts.
If the package's post-install script is legitimate,
you can use the following console command:

```Console
npm rebuild package-name --ignore-scripts=false
```

## tsdown

This template uses
[tsdown](https://www.npmjs.com/package/tsdown)
as the overall bundler.

The tsdown config file is located at
["{project}/tsdown.config.ts"](../../../tsdown.config.mjs).

tsdown is set to monorepo mode, allowing it to work
with multiple separate packages inside of the packages folder.
tsdown treats any relative file paths in the configuration
as relative to the package being operated on.

The configuration is set to treat every script
that does NOT have any parent directory named "internal"
as an entry.
So for example, a script at path
"{project}/packages/some-package/src/some-directory/SomeFile.ts"
would be importable as:

```TypeScript
import { SomeFile } from "some-package/some-directory/SomeFile";
```

Scripts that ARE the children of "internal" directories
are hidden from end users.
So for example, a script at path
"{project}/packages/some-package/src/some-directory/internal/some-directory/SomeFile.ts"
would NOT be exported and would NOT be directly available to end users.

tsdown will write the modules to the
"{project}/packages/\*/dist"
folders.

## TypeScript

While tsdown is used to handle the overall build,
it is still integrated with the original
[TypeScript](https://www.npmjs.com/package/typescript)
compiler.

### Config

The basic TypeScript configuration file for settings shared by all packages is located in
["{project}/config/ts/tsconfig.base.json"](../../../config/ts/tsconfig.base.json).

Every individual package has its own TypeScript configuration file,
extending tsconfig.base.json, defining its own paths,
and overriding the base as need be.

The tests folders in each package also have their own tsconfig files,
defining how to access other files in the project.

## Knip

This template uses
[Knip](https://www.npmjs.com/package/knip)
to check for any unused dependencies.

The Knip config file is located in
["{project}/config/knip/knip.config.ts"](../../../config/knip/knip.config.ts).

It includes an array of dependency problems to ignore because
Knip couldn't detect that the project was in fact using them.

## ESLint

This template uses
[ESLint](https://www.npmjs.com/package/eslint)
to check for any coding problems.

The ESLint config file is located in
["{project}/config/eslint/eslint.config.mjs](../../../config/eslint/eslint.config.mjs).
It combines multiple smaller config objects located inside of the
[components](../../../config/eslint/components/)
directory.

It is setup to handle JavaScript, TypeScript and browser globals.

This template is using the following list of ESLint plugins:

<table>
    <tr>
        <th>
            Plugin
        </th>
        <th>
            Description
        </th>
    </tr>
    <tr>
        <td>
            "@eslint/js"
        </td>
        <td>
            Allows ESLint to be able to handle JavaScript.
        </td>
    </tr>
    <tr>
        <td>
            "eslint-import-resolver-typescript"
        </td>
        <td>
            Plugin for eslint-plugin-import-x,
            enabling support for TypeScript imports.
        </td>
    </tr>
    <tr>
        <td>
            "eslint-plugin-import-x"
        </td>
        <td>
            Allows ESLint to check imports.
        </td>
    </tr>
    <tr>
        <td>
            "eslint-plugin-tsdoc"
        </td>
        <td>
            Allows ESLint to check TypeDoc.
        </td>
    </tr>
    <tr>
        <td>
            "typescript-eslint"
        </td>
        <td>
            Allows ESLint to be able to handle TypeScript.
        </td>
    </tr>
    <tr>
        <td>
            "eslint-config-prettier"
        </td>
        <td>
            Any rules of ESLint that would conflict with Prettier are disabled.
        </td>
    </tr>
</table>

## Prettier

This template uses
[Prettier](https://www.npmjs.com/package/prettier)
to keep the code's formatting consistent.

### Config

The Prettier config file is located in
["{project}/config/prettier/prettierrc.config.js"](../../../config/prettier/prettierrc.config.js).

This template is using the following list of Prettier plugins:

<table>
    <tr>
        <th>
            Plugin
        </th>
        <th>
            Description
        </th>
    </tr>
    <tr>
        <td>
            "@trivago/prettier-plugin-sort-imports"
        </td>
        <td>
            Orders the imports.
        </td>
    </tr>
</table>

### Ignore

The ignore file is located in
["{project}/config/prettier/.prettierignore"](../../../config/prettier/.prettierignore).

It is used to tell Prettier which files should NOT be formatted.

## Typedoc

This template uses
[TypeDoc](https://www.npmjs.com/package/typedoc)
to generate documentation for the source files.

The TypeDoc config file for the monorepo is located in
["{project}/config/typedoc/typedoc.config.js"](../../../config/typedoc/typedoc.config.js).

The basic TypeDoc config file for all packages is located in
["{project}/config/typedoc/typedoc.base.config.js"](../../../config/typedoc/typedoc.base.config.js).
Every individual package has its own TypeDoc configuration file,
extending typedoc.base.config.js
and overriding the base as need be.

### Included Documents

TypeDoc includes the workspace project README by default.

It will also include the README and CHANGELOG for every individual package,
"{project}/packages/\*/README.md" and
"{project}/packages/\*/CHANGELOG.md".

Remember to only use relative links when referring
to something included in the TypeDoc.

### Plugins

#### config/doc/plugin/TagInternal.js

This is one of the custom TypeDoc plugins used by the project.

This marks everything under an "internal" folder as @internal,
telling users using the documentation that they are not for public use.

If you do not want @internal items to be in the documentation at all,
you can just append "--excludeInternal" to the end of package.json's "doc"
script.
For example, "doc"'s value would be set to
"typedoc --options typedoc.config.js --excludeInternal".

## Vitest

This project uses
[Vitest](https://www.npmjs.com/package/vitest)
for testing.

For a guide on how to use it yourself, see
[this article](Test.md).

The Vitest config file is located at
["{project}/config/vitest/vitest.config.js"](../../../config/vitest/vitest.config.ts).

All test scripts are placed in files with the following format:
"{project}/packages/\*/tests/../{TestName}.test.ts"

Vitest is set to use the nearest tsconfig file to define types
and path aliases. The tsconfig file for the unit tests is
located at the root of the tests folder.

## Bumpp

This project includes
[Bumpp](https://www.npmjs.com/package/bumpp)
to automate incrementing versions.

The Bumpp config file is located in
["{project}/config/bumpp/bump.config.ts"](../../../config/bumpp/bump.config.ts).
