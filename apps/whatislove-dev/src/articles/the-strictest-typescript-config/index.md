---
title: The Strictest TypeScript Config
description: Boost TypeScript projects with strict typing and crucial config options for reliability and correctness. Optimize coding practices for robust, error-free codebases.
date: 2023-12-10
tags:
  - TS
changelogs: []
stickersCount: 10
layout: article.njk
---

Most people know that to make projects using TypeScript "strict" in terms of typing, you need to enable the `"strict": true` option in the `tsconfig`. What this option does is enable a multitude of other options, such as [alwaysStrict](https://www.typescriptlang.org/tsconfig#alwaysStrict), [strictNullChecks](https://www.typescriptlang.org/tsconfig#strictNullChecks), [strictBindCallApply](https://www.typescriptlang.org/tsconfig#strictBindCallApply), [strictFunctionTypes](https://www.typescriptlang.org/tsconfig#strictFunctionTypes), [strictPropertyInitialization](https://www.typescriptlang.org/tsconfig#strictPropertyInitialization), [noImplicitAny](https://www.typescriptlang.org/tsconfig#noImplicitAny), [noImplicitThis](https://www.typescriptlang.org/tsconfig#noImplicitThis), [useUnknownInCatchVariables](https://www.typescriptlang.org/tsconfig#useUnknownInCatchVariables). Indeed, all these options will undoubtedly make your TypeScript project stricter.

However, not everyone knows that in the TypeScript config, there are other options that can more reliably protect your project from type-related errors, which are _not yet_ automatically included by the `strict` option. Let's take a look at these options together to make our projects using TypeScript more robust.

## `noUncheckedIndexedAccess`

The first option we will explore is called [noUncheckedIndexedAccess](https://www.typescriptlang.org/tsconfig#noUncheckedIndexedAccess). Historically, TypeScript automatically _infers_ a type if it has grounds to do so. For example, if we manually specify the type of an array while leaving it empty or use an [index signature](https://www.typescriptlang.org/glossary#index-signatures) for objects. It might seem like TypeScript is doing us a favor, but very often, this can lead to unintended consequences.

This is where [noUncheckedIndexedAccess](https://www.typescriptlang.org/tsconfig#noUncheckedIndexedAccess) comes to the rescue. It adds `undefined` to any undeclared key of an object or index of an array, prompting additional checks to ensure that you are fully aware of what you are doing.

```ts
// noUncheckedIndexedAccess: false (default behavior)

const ids: number[] = []
const user: Record<string, string> = {}

const id0 = ids[0] // number
const username = user.username // string

id0.toFixed() // ✅ but 💥
username.trim() // ✅ but 💥

// noUncheckedIndexedAccess: true

const id0 = ids[0] // number | undefined
const username = user.username // string | undefined

id0.toFixed() // ❌ Error: 'id0' is possibly 'undefined'.
username.trim() // ❌ Error: 'username' is possibly 'undefined'.
```

## `exactOptionalPropertyTypes`

Next, we have the option [exactOptionalPropertyTypes](https://www.typescriptlang.org/tsconfig#exactOptionalPropertyTypes), which also addresses a long-standing pain point in TypeScript. Specifically, the issue that the `?` prefix in object keys serves two purposes – indicating that a field can be `undefined` and also signifying that the field might not exist in the object at all (yes, these are two different things).

With this option enabled, TypeScript retains only one behavior with the `?` prefix. Now, it signifies only the absence of a key, not that it could be `undefined`. If you need to allow the value to be `undefined`, you must specify it explicitly (e.g., `hasFriends: string | undefined`).

```ts
// exactOptionalPropertyTypes: false (default behavior)

type User = {
  name: string
  age: number
  hasFriends?: boolean
}

const user: User = {
  name: 'John',
  age: 18,
}

user.hasFriends = true // ✅
user.hasFriends = undefined // ✅

// exactOptionalPropertyTypes: true

user.hasFriends = true // ✅
user.hasFriends = undefined // ❌
```

## `noPropertyAccessFromIndexSignature`

Concluding the trio of significant options, which are not part of the `strict` option but play a crucial role in enforcing stricter typing in TypeScript projects, is the [noPropertyAccessFromIndexSignature](https://www.typescriptlang.org/tsconfig#noPropertyAccessFromIndexSignature) option.

There is often a temptation to either write your own [index signature](https://www.typescriptlang.org/glossary#index-signatures) for an object, even when it seems like there is nothing preventing you from explicitly describing all the keys of the object, or to use index signatures from libraries, as library authors often indulge in them. `noPropertyAccessFromIndexSignature` requires the use of bracket notation when accessing keys of objects described through index signatures.

The goal of this option is to make sure you are absolutely certain about what you are doing. Since nobody likes bracket notation where it can be avoided, this option _forces_ you to avoid index signatures as much as possible. Indeed, many problems arise from them, and this option aims to mitigate those issues.

```ts
// noPropertyAccessFromIndexSignature: false (default behavior)

type Settings = {
  mode: string
  [key: string]: string
}

const settings: Settings = {
  mode: 'MFA',
  kind: 'google',
}

settings.mode // ✅
settings.kind // ✅
settings.wat // ✅

// noPropertyAccessFromIndexSignature: true

settings.mode // ✅
settings.kind // ❌
settings.wat // ❌
settings['kind'] // ✅, but it's better to avoid index signatures and describe all type keys explicitly
settings['wat'] // ✅
```

By the way, the TypeScript ESLint plugin developers have thoughtfully provided the ability to use this and many other options from the TypeScript config, along with their rules. The [@typescript-eslint/dot-notation](https://typescript-eslint.io/rules/dot-notation/) rule syncs seamlessly with this option, once again emphasizing that using index signatures is not a good practice.

## Conclusion

There are also [other options improving typing](https://www.typescriptlang.org/tsconfig#Type_Checking_6248) in the TypeScript config that are not automatically enabled with the `strict` option, but they are not as crucial as the three mentioned above.

For all new projects where you will be using TypeScript, I recommend starting with a TypeScript config where the `strict` option is enabled along with the additional three options we discussed earlier: `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, and `noPropertyAccessFromIndexSignature`.

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noPropertyAccessFromIndexSignature": true
  }
}
```

Or try enabling them in an existing project, but be prepared to uncover many areas where you might have taken shortcuts 😉

All these options, by imposing additional constraints and promoting more correct coding practices, will help make your project more reliable. This simplifies both its maintenance in the long run and the quicker detection of incorrect behavior in your code.
