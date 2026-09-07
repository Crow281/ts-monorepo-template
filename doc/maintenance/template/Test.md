# Test

This project uses
[Vitest](https://www.npmjs.com/package/vitest)
for checking if your project still works.

The official Vitest guide is
[here](https://vitest.dev/guide/).

## Unit Tests

Unit tests are tests you write that run against your code
and check if the results are what you expect.
This is useful to ensure that updates to your
code don't break anything.

You can add new unit tests by adding ".test.ts" files
to the "{project}/packages/*/tests" folders.

A typical unit test will look something like this:

```TypeScript
import { myFunction } from "@/MyFunction";
import { expect, test } from "vitest";

//Create a test against myFunction, verifying that it
//returns "CorrectValue" like it is meant to.
//Give a brief description of the test
//and then provide the test itself.
test("myFunction returns \"CorrectValue\"", () => {
    //Run the function to be tested.
    const result: string = myFunction();

    //Check that the function's result matches what you are expecting.
    //This code will report the results back to Vitest.
    expect(result).toBe("CorrectValue");
});
```

Note that async tests are also supported:

```TypeScript
import { myFunction } from "@/MyFunction";
import { expect, test } from "vitest";

//Create a test against myFunction, verifying that it
//returns "CorrectValue" like it is meant to.
//Give a brief description of the test
//and then provide the test itself.
//You can optionally add a timeout as the third parameter.
test("myFunction returns \"CorrectValue\"", async () => {
    //Run the function to be tested and wait for it to complete.
    const result: string = await myFunction();

    //Check that the function's result matches what you are expecting.
    //This code will report the results back to Vitest.
    expect(result).toBe("CorrectValue");
});
```

# Path Aliases

Vitest's resolve property is set to look for the nearest
tsconfig file to resolve path aliases,
allowing you to use non-relative imports.

The tests folder has its own tsconfig file.

By default, the templated packages are set to support the following import aliases:

<table>
    <tr>
        <th>
            Alias
        </th>
        <th>
            Path
        </th>
        <th>
            Description
        </th>
    </tr>
    <tr>
        <td>
            @/*
        </td>
        <td>
            ../src
        </td>
        <td>
            Enables the unit tests to import package source code.
        </td>
    </tr>
    <tr>
        <td>
            @tests/*
        </td>
        <td>
            .
        </td>
        <td>
            Enables the unit tests to import test exclusive scripts.
        </td>
    </tr>
</table>

Here is an example of the path aliases in use:

```TypeScript
//This is importing a function from the package's main source scripts.
import { myFunction } from "@/MyFunction";
//This is importing a function from a non-test script inside of the tests folder.
import { myTestFunction } from "@tests/MyTestFunction";

import { expect, test } from "vitest";

//Create a test against myFunction, verifying that it
//returns "CorrectValue" like it is meant to.
//Give a brief description of the test
//and then provide the test itself.
//You can optionally add a timeout as the third parameter.
test("myFunction returns \"CorrectValue\"", async () => {
    //Run the source function to be tested and wait for it to complete.
    const result: string = await myFunction();

    //Run the test function to be tested and wait for it to complete.
    const testResult: string = await myTestFunction(result);

    //Check that the function's result matches what you are expecting.
    //This code will report the results back to Vitest.
    expect(testResult).toBe("CorrectValueTested");
});
```
