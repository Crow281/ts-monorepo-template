# User Guide

This tutorial gives instructions to make the template project your own.

## Setup

1. Download a copy of the repository:

```Console
git clone https://github.com/Crow281/ts-monorepo-template.git
```

2. You will need to replace the
   [LICENSE](../../../LICENSE)
   file with one of your own.
   Even if you are yourself using the MIT license,
   you will need to replace the name and year with
   appropriate values for your own project.

3. Modify the root
   [README.md](../../../README.md)
   and replace everything
   with whatever content is appropriate for your project.

4. Go to the template configuration,
   ["{project}/config/template/template.config.ts"](../../../config/template/template.config.ts).
   This file controls what each
   [mustache](https://www.npmjs.com/package/mustache)
   template in the add-package template will be replaced with.
   It will initially be set with the values this Git project would have if it
   was an actual NPM project as an example.
   Replace the initial values with the ones appropriate for your project.
   Modify the homepageUrl function, replacing the base url with your own:

```TypeScript
{
    //...
    homepageUrl: function (
        this: TemplateOptions,
        template: string,
        render: (template: unknown) => string,
    ): string {
        //...
        //Create the base url packages are stored to on the website.
        //the package's unscoped name will be appended to it to create the homepage url.
        //The original default value points to what it would be for this template.
        //If you are already hosting on git, you will want to replace the user and repo names.
        const packageBaseUrl: URL = new URL(
            "https://github.com/Crow281/ts-monorepo-template/tree/main/packages/",
        );
        //...
    }
}
```

If you want to implement your own tags,
you may add them to the template and configuration.
The add-package template is located
[here](../../../config/template/assets/add-package/).
You can read
[this article](./Structure.md#Template) for more details.

## NPM Packages

You can use the following console command to download
this project's node_modules:

```Console
npm install
```

As a monorepo, all shared tooling and repository management dependencies
should be installed from the root. Stuff like devDependencies.

Anything that a given package depends on,
like runtime dependencies or
tools exclusive to the package,
should be installed to that package's individual package.json file.

## Packages

As a monorepo, this template is designed to potentially add multiple related packages to itself,
though you can, of course, create only one if you only want one.

### Creating a New Package

1. You can add a new package to your monorepo by
   using the following project console command and answering its questions:

```Console
npm run add-package
```

It will ask you for the name you want for your package.
For example, if your new package was named "scope/some-package",
then it will insert that into the appropriate locations of the template
and create a folder called
"{project}/packages/some-package",
extracting the unscoped name.

2. You will probably want to modify the new package's README.md file
   according to your needs, such as
   expanding the Introduction section in the beginning
   and appending Demo and Example sections to the end.
   Keep in mind that this document will be added to the TypeDoc,
   and as such, you will generally want to use absolute links.

3. Now you will want to go open your repository's copy of
   [package.json](https://docs.npmjs.com/creating-a-package-json-file).

The add-package script will setup the basics,
but you will need to customize it for your project further by hand.

The properties you should consider include the following:

<table>
    <tr>
        <th>
            Property
        </th>
        <th>
            Description
        </th>
    </tr>
    <tr>
        <td>
            name
        </td>
        <td>
            Name that uniquely distinguishes this NPM package.
        </td>
    </tr>
    <tr>
        <td>
            private
        </td>
        <td>
            Boolean that blocks NPM from publishing your package if set to true,
            ensuring you do not accidentally publish an NPM package
            you did not intend to publish.
        </td>
    </tr>
    <tr>
        <td>
            author
        </td>
        <td>
            Name of the person who created the package.
        </td>
    </tr>
    <tr>
        <td>
            contributors
        </td>
        <td>
            Names of the people who helped create the package.
        </td>
    </tr>
    <tr>
        <td>
            description
        </td>
        <td>
            A description of your project allowing people to find it via search.
        </td>
    </tr>
    <tr>
        <td>
            keywords
        </td>
        <td>
            A list of keywords you want to associate with your project,
            allowing people to find it via search.
        </td>
    </tr>
    <tr>
        <td>
            license
        </td>
        <td>
            Name of the license, defining the
            legal permissions under which you are distributing this package.
        </td>
    </tr>
    <tr>
        <td>
            homepage
        </td>
        <td>
            URL pointing to the main page for this project.
        </td>
    </tr>
    <tr>
        <td>
            repository
        </td>
        <td>
            Points people to the repository storing the project.
        </td>
    </tr>
    <tr>
        <td>
            bugs
        </td>
        <td>
            Points people to where they can file bug reports.
        </td>
    </tr>
    <tr>
        <td>
            files
        </td>
        <td>
            <p>
                List of files that should be uploaded if you are publishing your
                NPM package.
                The initial value will probably be enough under most circumstances.
            </p>
            <p>
                The initial value submits the actual built modules,
                the source code behind them, the license, and the Read Me.
            </p>
        </td>
    </tr>
    <tr>
        <td>
            sideEffects
        </td>
        <td>
            A non-standard field used by some bundlers to identify side effect
            files when tree-shaking (getting rid of unused code).
            Side effects are scripts used to modify stuff outside themselves,
            which bundlers often have trouble figuring out.
            This property can be:
            <table>
                <tr>
                    <td>
                        true
                    </td>
                    <td>
                        All files have side effects.
                    </td>
                </tr>
                <tr>
                    <td>
                        false
                    </td>
                    <td>
                        No files have side effects.
                    </td>
                </tr>
                <tr>
                    <td>
                        string[]
                    </td>
                    <td>
                        List of source files with side effects.
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td>
            devDependencies
        </td>
        <td>
            <p>
                List of NPM packages needed to develop this package,
                but are NOT needed for the final distribution.
            </p>
            <p>
                For example, a person working on the project itself might
                use ESLint to look for problems in the project's source code.
                But unless the compiled project is itself an ESLint plugin,
                it doesn't need ESLint to run and as such end users don't need to install it.
            </p>
            <p>
                As this project is a monorepo, you will generally
                want to install shared developer dependencies to the root,
                though a developer dependency specific to one package
                might be installed to it personally.
            </p>
        </td>
    </tr>
    <tr>
        <td>
            dependencies
        </td>
        <td>
            <p>
                List of NPM packages the package's distribution is specifically dependant on.
            </p>
            <p>
                These are packages that people importing your library also need
                in order to use the library.
            </p>
        </td>
    </tr>
    <tr>
        <td>
            peerDependencies
        </td>
        <td>
            <p>
                List of NPM packages the project's distribution is dependant on.
            </p>
            <p>
                This is similar to dependencies.
                The difference is that you use peerDependencies instead of
                dependencies when having multiple different versions of the
                dependency in your project imported by different packages would
                cause them to interfere with one another.
            </p>
            <p>
                For example, it might not be a huge deal for separate libraries
                to link to separate copies of a simple math library,
                but having separate copies of the project's main UI
                library is likely to cause incompatibility as they will each
                want to use different versions from the main one your project is using.
            </p>
            <p>
                peerDependencies are most useful for plugin libraries.
                For example, if you wanted to build a custom widget library over
                an overall UI library, like React, you would define React as a peerDependency.
                That way, when the user imports multiple custom React widget
                packages, they can then pick which mutually compatible version of React
                to use, which all the custom widget libraries will then share.
            </p>
            <p>
                By default, this project has no peerDependencies.
            </p>
            <p>
                You will want to keep the version range as flexible
                as what your library supports,
                so barring a need for new library features,
                you will probably just be adding
                "| ^{newMajorVersion}.0.0"
                when adding support for new major versions of peerDependencies.
            </p>
        </td>
    </tr>
    <tr>
        <td>
            peerDependenciesMeta
        </td>
        <td>
            <p>
                Can be used to define peerDependencies as optional.
                When a peerDependency is marked as optional,
                that will make it so that NPM does not install it by default.
            </p>
            <p>
                One reason to use this is if your library has
                optional features dependant on optional packages.
                For example, maybe your library provides a custom new
                <a href="https://en.wikipedia.org/wiki/Query_language">Query language</a>.
                Your library is designed to operate over multiple backends.
                There might be one
                <a href="https://en.wikipedia.org/wiki/Adapter_pattern">adapter</a>
                that converts your Query Language
                to save to a file system, another adapter that saves to
                <a href="https://en.wikipedia.org/wiki/MySQL">MySQL databases</a>,
                and another adapter that saves to
                <a href="https://en.wikipedia.org/wiki/SQLite">SQLite databases</a>.
                End users are only likely to need one of these adapters.
                Thus, you can declare each database package it has an adapter for
                to be an optional peerDependency.
            </p>
        </td>
    </tr>
</table>

### CHANGELOG.md

Whenever you publish a new version of your package, you will want to update
the associated
[{project}/packages/\*/CHANGELOG.md](https://github.com/Crow281/ts-file-module-template/blob/main/CHANGELOG.md).

One recommended guide is
[here](https://keepachangelog.com/).

### Modules

Every file represents a file module.

#### Internal Modules

If you want a folder full of code that should NOT be directly accessible
to the public, intended only for use by the library itself,
you can name it "internal".

The tsdown build script is currently set to NOT include any entries for scripts
inside of internal folders. However, if non-internal scripts
reference them, then it will build them to JS files which
the non-internal scripts can then import.

These "internal" scripts are set to NOT be included in the package exports.

### Unit Tests

To ensure changes to your code don't break anything, you
should implement unit tests.

A more detailed guide is located
[here](./Test.md).

## Scripts

To learn how to use all NPM project scripts, such as test and build, you can
[open this guide](../Scripts.md).
