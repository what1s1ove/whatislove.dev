---
title: JS and everyday data structures
description: Explore the role of data structures in JavaScript, optimizing code, enhancing readability, and simplifying problem-solving. Discover the vital connection between algorithms and data structures, ensuring efficient and maintainable coding for developers of all levels.
date: 2021-08-04
tags:
  - JS
changelogs: []
layout: article.njk
---

In the ever-evolving landscape of JavaScript programming, where code efficiency and maintainability are paramount, the significance of data structures cannot be overstated. In this article, we delve into the world of JavaScript data structures and explore how they play a pivotal role in optimizing your code, enhancing its readability, and streamlining problem-solving.

Let's start with a quote that once changed my life. I am sure that this quote and its understanding will also change yours if you have not heard it yet.

> Bad programmers worry about the code. Good programmers worry about data structures and their relationships. © [Linus Torvalds](https://en.wikipedia.org/wiki/Linus_Torvalds)

We will talk about data structures, but first, it is impossible to talk about them without mentioning algorithms.

Algorithms are the steps we need to take to solve a problem. Data structures are organized data with efficient and convenient access to them.

**Programming is always = algorithms ➕ data structures.**

_When solving a problem, it should be kept in mind that choosing the right data structure may be a solution for the problem (no need to write any code)_

## Data structures in JS

JS has two basic data-structures that can be reused in different ways depending on the requirements. Therefore, they support a large number of methods of different structures which would be separate in other program languages.

- Object (Enum, Map, Graph, etc);
- Array (List, Stack, Queue, etc).

### The Task

We will use this user type for further examples:

```tsx
type User = {
  name: string
  gender: string
}
```

Do not worry if you are not familiar with [TypeScript](https://www.typescriptlang.org/). The example of the type is given so that you understand the approximate structure of the user.

Let's imagine that we have a task — we need to display a list of users using the appropriate emoji by the user's gender. For now we have only two options — `male` and `female`.

It might look like this:

```jsx
// src/components/common/users-list/users-list.jsx

<ul>
  {users.map((it) => (
    <li>
      <h3>{it.name}</h3>
      <p>{it.gender === 'male' ? '👨' : '👩'}</p>
    </li>
  ))}
</ul>
```

That's it. The task is done. Buuut... we can do it _better_.

Let's imagine that in our code there will be or there already are places where we check something by the user's gender. We duplicate the code. It is not good. Also if we use _just a string_ all the time, sooner or later, we will make a mistake. In fact, such errors are not very easy to find.

Let's solve this task too. We will protect ourselves from this. We will use a _single source of truth_ — **`CONSTANT`**'s.

### CONSTANT

`CONSTANT`s are used to describe data that is known _before the start_ of the program and that _should not be changed_ during the execution of the program.

> When associated with an identifier, a constant is said to be "named," although the terms "constant" and "named constant" are often used interchangeably. Wikipedia

The constant can be declared with any keyword for variables (`var`, `let` or `const`), but `const` is commonly used.

Constants are a very important and popular approach to organize program code. And there are several conventions among developers for them:

- Constant must be declared at the top of the program/module (after imports, if any);
- Constant must have a name in capital letters;
- Constant must not be redefined anywhere in the program.

<details>
  <summary>Examples</summary>

    ```jsx
    // bad

    // src/common/constants/earth/index.js

    const earthRadius = 6371

    // src/components/common/user-item/user-item.jsx

    const UserItem = ({ user }) => {
      const USER_ROLE = getUserRole(user)

      return (
        <li>
          {user.name}, {USER_ROLE}
        </li>
      )
    }

    // src/components/dashboard/dashboard.jsx

    let USER_TYPE = 'user'

    if (checkIsAdmin(user)) {
      USER_TYPE = 'admin'
    }

    // good

    // src/common/constants/earth/index.js

    const EARTH_RADIUS = 6371

    // src/components/common/user-item/user-item.jsx

    const UserItem = ({ user }) => {
      const userRole = getUserRole(user)

      return (
        <li>
          {user.name}, {userRole}
        </li>
      )
    }

    // src/components/dashboard/dashboard.jsx

    let userType = 'user'

    if (checkIsAdmin(user)) {
      userType = 'admin'
    }

    ```

</details>

Here is an improved solution for our task:

```jsx
// src/common/constants/user/index.js

const MALE_GENDER_TYPE = 'male'
const FEMALE_GENDER_TYPE = 'female'
```

```jsx
// src/components/common/users-list/users-list.jsx

<ul>
  {users.map((it) => (
    <li>
      <h3>{it.name}</h3>
      <p>{it.gender === MALE_GENDER_TYPE ? '👨' : '👩'}</p>
    </li>
  ))}
</ul>
```

Much better, but we can improve it even more.

Have you noticed that we duplicate `GENDER_TYPE` in the name? It is not critical, but annoying. Also if we needed some values, we would have to import each constant separately.

It would be cool if there was a data structure that would help us with this as well. And there is such a structure — **`Enum`**.

### Enum

`Enum` (enumeration) — a data structure that is used to enumerate a set of fixed values (set of constants).

Other programming languages have a separate data type for Enum. But JS does not have this type of data (at least for now, more on that below). The regular object is usually used to imitate Enum in JS.

For this structure, JavaScript also has conventions among developers:

- Enum must start with a capital letter;
- Enum must be singular;
- Enum must have uppercase keys;
- Enum must not be changed anywhere in the program.

<details>
  <summary>Examples</summary>

    ```jsx
    // bad

    // src/common/enum/user/user-role-enum.enum.js

    const userRoleEnum = {
      user: 1,
      viewer: 2,
    }

    // or

    const userRoles = {
      user: 1,
      viewer: 2,
    }

    // or

    const UserRoles = {
      user: 1,
      viewer: 2,
    }

    if (checkHasAdminRole()) {
      UserRoles.admin = 3
    }

    // good

    // src/common/enum/user/user-role.enum.js

    const UserRole = {
      USER: 1,
      VIEWER: 2,
      ADMIN: 3,
    }
    ```

</details>

This is how the solution using the `Enum` might look like:

```jsx
// src/common/enums/user/gender-type.enum.js

const GenderType = {
  MALE: 'male',
  FEMALE: 'female',
}
```

```jsx
// src/components/common/users-list/users-list.jsx

<ul>
  {users.map((it) => (
    <li>
      <h3>{it.name}</h3>
      <p>{it.gender === GenderType.MALE ? '👨' : '👩'}</p>
    </li>
  ))}
</ul>
```

We could keep using constants but it is much better and more correct to use structures that are better suited for this.

Also if we do the task with TypeScript, we can also change the type of user a little bit. This is _many times better_ than using just strings.

```tsx
type User = {
  name: string
  gender: (typeof GenderType)[keyof typeof GenderType]
}
```

Let's now imagine that a business comes to us and says that they want us to add a new type for the user's gender — 'non-binary'. We could do something like this:

```jsx
// src/components/common/users-list/users-list.jsx

<ul>
  {users.map((it) => (
    <li>
      <h3>{it.name}</h3>
      <p>
        {it.gender === GenderType.MALE
          ? '👨'
          : it.gender === GenderType.FEMALE
            ? '👩'
            : '🧑'}
      </p>
    </li>
  ))}
</ul>
```

But it looks very ugly. We could replace this with a `switch` statement, or a helper function that does it itself. This is a significant improvement, but we can also use special structures for this. We can use a **`Map`** data structure to make the solution more flexible and readable.

### Map

`Map` (dictionary, associative array, map) — a data structure that is used to map one value to another.

JS has a `[new Map` constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) out of the box. The key difference from a common object is the ability to use any data type (even an object) as a key.

Usually, using the JS Map constructor is overkill. If you need the functionality that the JS Map provides, you have to use it. But usually a common object is used to imitate this structure.

There are some conventions how to configure this structure:

- Maps must have a name by one of these patterns — `xToY` or `xMap` (`userToPerson` or `userMap`). The first pattern is used more often.

<details>
  <summary>Examples</summary>

    ```jsx
    // bad

    // src/common/maps/user/user-roles.map.js

    const userRoles = {
      user: 'Default User',
      viewer: 'Checker',
      admin: 'Administrator',
    }

    // good

    // src/common/maps/user/user-role-to-readable.map.js

    const userRoleToReadable = {
      user: 'Default User',
      viewer: 'Checker',
      admin: 'Administrator',
    }

    // src/common/maps/user/user-role-map.map.js

    const userRoleMap = {
      user: 'Default User',
      viewer: 'Checker',
      admin: 'Administrator',
    }
    ```

</details>

Here is how the solution might look like using the `Map`:

```jsx
// src/common/enums/gender-type.enum.js

const GenderType = {
  MALE: 'male',
  FEMALE: 'female',
  NON_BINARY: 'non-binary',
}

// src/common/maps/gender-type-to-emoji.map.js

const genderTypeToEmoji = {
  [GenderType.MALE]: '👨',
  [GenderType.FEMALE]: '👩',
  [GenderType.NON_BINARY]: '🧑',
}
```

```jsx
// src/components/common/users-list/users-list.jsx

<ul>
  {users.map((it) => (
    <li>
      <h3>{it.name}</h3>
      <p>{genderTypeToEmoji[it.gender]}</p>
    </li>
  ))}
</ul>
```

Have you noticed how we reused all the structures we have just learned about?

The choice of suitable data structures saved us from writing additional code. Using data structures and their combinations is a very _powerful_ tool that is very much _appreciated_ among developers.

Here are some more examples where using data structures helps a lot:

<details>
  <summary>Select Control</summary>

```jsx
// src/common/maps/gender-type-to-readable.map.js

const genderTypeToReadable = {
  [GenderType.MALE]: 'Male',
  [GenderType.FEMALE]: 'Female',
  [GenderType.NON_BINARY]: 'Non Binary (NB)',
}

// src/components/sign-up/components/register-form/register-form.jsx

const genderOptions = getOptions(Object.values(GenderType), (gender) => ({
  label: genderTypeToReadable[gender],
  value: gender,
}))

const UserForm = () => {
  return (
    <form>
      {/* ... */}

      <Select label="Gender:" options={genderOptions} />
      {/* ... */}
    </form>
  )
}
```

</details>

<details>
  <summary>Tabs</summary>

```jsx
// src/components/dashboard/common/enums/tab-name.enum.js

const TabName = {
  USERS: 'Users',
  FORM: 'Register Form',
  PERMISSIONS: 'User Permissions',
}

// src/components/dashboard/dashboard.jsx

const tabOptions = getOptions(Object.keys(TabName))

const Dashboard = () => {
  const [currentTab, setCurrentTab] = React.useState(TabName.USERS)

  const getScreen = (tabName) => {
    switch (tabName) {
      case TabName.USERS: {
        return <User />
      }
      case TabName.FORM: {
        return <RegisterForm />
      }
      case TabName.PERMISSIONS: {
        return <Permissions />
      }
    }

    return null
  }

  return (
    <>
      <TabList options={tabOptions} onChange={setCurrentTab} />
      <div className="screen-wrapper">{getScreen(currentTab)}</div>
    </>
  )
}
```

</details>

<details>
  <summary>getFilteredOffers</summary>

```jsx
// src/components/dashboard/common/maps/user-offer-to-validation-cb.map.js

const userOfferToValidationCb = {
  checkHasCurrentType() {
    /* checking... */
  },
  checkHasCurrentPrice() {
    /* checking... */
  },
  checkHasCurrentRooms() {
    /* checking... */
  },
}

// src/components/dashboard/helpers/get-filtered-offers/get-filtered-offers.helper.js

const getFilteredOffers = (offers) => {
  return offers.filter((offer) => {
    const isSuitable = Object.keys(userOfferToValidationCb).every((key) => {
      const validationFn = userOfferToValidationCb[key]

      return validationFn(offer)
    })

    return isSuitable
  })
}
```

</details>

Here is an example of the `getOptions` helper:

<details>
  <summary>Example</summary>

    ```jsx
    // src/helpers/options/get-default-option/get-default-option.helper.js

    const getDefaultOption = (value) => ({
      value,
      label: value,
    })

    // src/helpers/options/get-options/get-options.helper.js

    const getOptions = (values, cb = getDefaultOption) => values.map(cb)
    ```

</details>

## TypeScript Enum

TypeScript has a keyword for the `Enum`'s. The key difference from an object-enum is that with the TypeScript enum we can read values in two ways.

```tsx
// src/common/enums/gender-type.enum.ts

enum GenderType {
  MALE = 'male',
  FEMALE = 'female',
  NON_BINARY = 'non-binary',
}

console.log(GenderType.MALE) // male
console.log(GenderType['male']) // MALE
```

Cool! But I have almost never seen this used in production code. Therefore, I use and recommend that you use `Enum` in TypeScript in this way:

```tsx
// src/common/enums/gender-type.enum.ts

const GenderType = {
  MALE: 'male',
  FEMALE: 'female',
  NON_BINARY: 'non-binary',
} as const
```

With [const assertions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) we still use a regular object, but now it's on steroids.

Moreover, `enum` is [always a reserved word](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#future_reserved_keywords) in JavaScript, which means that maybe someday we will have a construct that the language itself will offer us.

Also, programs that compress the JS code cannot compress TS `enum`s. The same cannot be said about the objects that pure JavaScript offers us.

### Enum TC39 proposals

As I said above, that `Enum` may appear in vanilla JavaScript someday. You can view the proposals that we have at the moment:

- https://github.com/rwaldron/proposal-enum-definitions
- https://github.com/rbuckton/proposal-enum
- https://es.discourse.group/t/enumerations-syntactic-sugar/144

Usually, the solution that the language itself can offer is many times more effective than any third-party library can offer.

Do not forget to check the [proposals](https://github.com/tc39/proposals) that may appear in JavaScript language, and vote for the most interesting for you.

## Conclusions

Data structures are awesome! They help us solve tasks in a neat and convenient way. With the right data structures, it's easier to build algorithms or not write code at all. The data structure may already be the solution to the task.

A huge plus is that if you do them according to the conventions that are present in the JavaScript language, most developers will understand your code much faster than coming up with something 'new.'

Most things are already invented for us!

Do not forget to put the constants of the same type into `Enum`s, then map them into the format you need, and enjoy the beauty of the data structures.
