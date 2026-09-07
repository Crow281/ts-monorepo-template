import type { TemplateOptions } from "./scripts/TemplateOptions";

/**
 * The configuration object this project is using
 * to setup templates.
 *
 * This is fed into the template as a
 * {@link https://www.npmjs.com/package/mustache mustache}.
 *
 * As such, you can set the properties to actual strings
 * or even customizable functions.
 */
const config: TemplateOptions = {
    //URL pointing to the location of this project's API documentation.
    apiDocUrl: "https://crow281.github.io/ts-monorepo-template/doc/api/latest/",

    //URL pointing to the page people can report bugs to.
    bugReportUrl: "https://github.com/Crow281/ts-monorepo-template/issues",

    //Name of the license this project is using.
    licenseName: "MIT",

    //URL to the Git repository.
    repositoryUrl: "git+https://github.com/Crow281/ts-monorepo-template.git",

    /**
     * Used to generate the homepage URL for the new package.
     * @param this
     * The current context this function is being invoked in.
     * @param template
     * Contents of the mustache.
     * @param render
     * Sub-rendering function, using the current view as its view argument.
     * For example:
     *
     * ```TypeScript
     * //someString will be set to whatever was stored to
     * //the someString property on the original view object.
     * const someString: string = render("{{someString}}");
     * ```
     * @returns
     * A string containing the URL the homepage should be set to.
     */
    homepageUrl: function (
        this: TemplateOptions,
        template: string,
        render: (template: unknown) => string,
    ): string {
        //This implementation assembles the homepage url by appending the
        //unscoped package name to the base package url of the Git project.
        //Fetch the unscoped package name.
        //The script is expected to request this of the user
        //and fill it in if you don't override it yourself.
        const npmPackageNameUnscoped = this.npmPackageNameUnscoped;

        //Double check that the unscoped package name exists.
        if (typeof npmPackageNameUnscoped === "string") {
            //Create the base url packages are stored to on the website.
            //the package's unscoped name will be appended to it to create the homepage url.
            const packageBaseUrl: URL = new URL(
                "https://github.com/Crow281/ts-monorepo-template/tree/main/packages/",
            );

            //Append the unscoped package name to the base url
            //to figure out the homepage of this specific package.
            const homepageUrl: URL = new URL(
                npmPackageNameUnscoped,
                packageBaseUrl,
            );

            //Return this homepage's url.
            return homepageUrl.href;
        }

        //This shouldn't happen, but just in case, throw an error.
        throw new Error("npmPackageNameUnscoped missing.");
    },
};

//Provide the configuration object.
export default config;
