---
title: ECMAScript Decorators. The Ones That are Real.
description: History of ECMAScript decorators, their implementation, and real-life examples of the decorator pattern in action.
date: 2023-10-19
tags:
  - JS
changelogs: []
stickersCount: 10
layout: article.njk
---

In 2015, ECMAScript 6 was introduced – a significant release of the JavaScript language. This release introduced many new features, such as `const`/`let`, arrow functions, classes, etc. Most of these features were aimed at eliminating JavaScript's quirks. For this reason, all these features were labeled as "Harmony." Some sources say that the entire ECMAScript 6 is called "ECMAScript Harmony." In addition to these features, the "Harmony" label highlights other features expected to become part of the specification soon. Decorators are one of such anticipated features.

Nearly 10 years have passed since the first mentions of decorators. The decorators’ specification has been rewritten several times almost from scratch but they have not become part of the specification yet. As JavaScript has long extended beyond just browser-based applications, authors of specifications must consider a wide range of platforms where JavaScript can be executed. This is precisely why progressing to [stage 3](https://exploringjs.com/impatient-js/ch_history.html#tc39-process) for this proposal has taken so much time.

## Something Completely New?

First of all, let's clarify what decorators are in the programming world.

> “_Decorator is a structural design pattern that lets you attach new behaviors to objects by placing these objects inside special wrapper objects that contain the behaviors._”
> © https://refactoring.guru/design-patterns/decorator

The key point here is that a decorator is a design pattern. This means that _typically_ it can be implemented in any programming language. If you have even a basic familiarity with JavaScript, chances are you have already used this pattern without even realizing it.

Sound interesting? Then try to guess what the most popular decorator in the world is... Meet the most famous decorator in the world, the higher-order function – `debounce`.

### Debounce

Before we delve into the details of the `debounce` function, let's remind ourselves what higher-order functions are. Higher-order functions are functions that take one or more functions as arguments or return a function as their result. The `debounce` function is a prominent example of a higher-order function and at the same time the most popular decorator for JS developers.

The _higher-order function_ `debounce` delays the invocation of another function until a certain amount of time has passed since the last invocation, without changing its behavior. The most common use case is to prevent sending multiple requests to the server when a user is inputting values into a search bar, such as loading autocomplete suggestions. Instead, it waits until the user has finished or paused input and only then sends the request to the server.

On most resources for learning JavaScript language in the section about timeouts, you will find exercises that involve writing this function. The simplest implementation looks like this:

```js
const debounce = (fn, delay) => {
  let lastTimeout = null

  return (...args) => {
    clearInterval(lastTimeout)

    lastTimeout = setTimeout(() => fn.call(null, ...args), delay)
  }
}
```

Using this function may look like the following:

```js
class SearchForm {
  constructor() {
    this.handleUserInput = debounce(this.handleUserInput, 300)
  }

  handleUserInput(evt) {
    console.log(evt.target.value)
  }
}
```

When using a special syntax for decorators which we will discuss in the next section, the implementation of the same behavior will look like this:

```js
class SearchForm {
  @debounce(300)
  handleUserInput(evt) {
    console.log(evt.target.value)
  }
}
```

All the boilerplate code is gone, leaving only the essentials. Looks nice and clean, doesn't it?

### Higher-Order Component (HOC)

The next example will come from the [React](https://react.dev/)-world. Although the use of Higher-Order Components (HOC) is becoming less common in applications built with this library, HOCs still serve as a good and well-known example of decorator usage.

Let's take a look at an example of the `withModal` HOC:

```jsx
const withModal = (Component) => {
  return (props) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleModalVisibilityToggle = () => setIsOpen(!isOpen)

    return (
      <Component
        {...props}
        isOpen={isOpen}
        onModalVisibilityToggle={handleModalVisibilityToggle}
      />
    )
  }
}
```

And now, let's see how it can be used:

```js
const AuthPopup = ({ onModalVisibilityToggle }) => {
  // Component
}

const WrappedAuthPopup = withModal(AuthPopup)

export { WrappedAuthPopup as AuthPopup }
```

Here is what using the HOC with the special decorator syntax would look like:

<!-- prettier-ignore -->
```js
@withModal()
const AuthPopup = ({ onModalVisibilityToggle }) => {
  // Component
}

export { AuthPopup }
```

**Important Note:** _Function decorators are not a part of the current proposal. However, they are on the list of things that could be considered for the future development of the decorators specification._

Once again, all the boilerplate code is gone, leaving only what truly matters.

Perhaps some of the readers did not see anything special in this. In the example above, only one decorator was used. Let's take a look at such an example:

```js
const AuthPopup = ({ onSubmit, onFocusTrapInit, onModalVisibilityToggle }) => {
  // Component
}

const WrappedAuthPopup = withForm(withFocusTrap(withModal(AuthPopup)), {
  mode: 'submit',
})

export { WrappedAuthPopup as AuthPopup }
```

See that hard-to-read nesting? How much time did it take you to understand what is happening in the code? Now, let's take a look at the same example but with the use of decorator syntax:

<!-- prettier-ignore -->
```js
@withForm({ mode: 'submit' })
@withFocusTrap()
@withModal()
const AuthPopup = ({
  onSubmit,
  onFocusTrapInit,
  onModalVisibilityToggle,
}) => {
  // Component
}

export { AuthPopup }
```

Would you not agree that the code that goes from top to bottom is much more readable than the previous example with nested function calls?

The higher-order function `debounce` and the higher-order component `withModal` are just a few examples of how the decorator pattern is applied in everyday life. This pattern can be found in many frameworks and libraries that we use regularly, although many of us may often not pay attention to it. Try analyzing the project you are working on and look for places where the decorator pattern is applied. You will likely discover more than one such example.

## JavaScript Implementations

Before we delve into the decorators proposal itself and its implementation, I would like us to take a look at this image:

![Screenshot of an old browser with an HTML form.](images/old-browser.png)

With this image, I would like to remind you of the primary purpose for which JavaScript language was originally created. I am not one of those people who like to complain, saying, "Oh, JavaScript is only good for highlighting form fields." Typically, I refer to such individuals as “dinosaurs”.

JavaScript primarily focuses on the end user for whom we write code. This is a crucial point to understand because every time new things are introduced in JavaScript language such as classes with implementations differing from what is found in other programming languages, the same complainers come and start lamenting that things are not done in a user-friendly manner. Quite the opposite, in JavaScript everything is designed with end users in mind, which is something that no other programming language can boast about.

Today, JavaScript is not just a browser language. It can be run in various environments, including on the server. The [TC39](https://exploringjs.com/impatient-js/ch_history.html#tc39-process) committee responsible for introducing new features to the language, faces the challenging task of meeting the needs of all platforms, frameworks, and libraries. However, the primary focus remains on end users in the browser.

### History of Decorators

To delve deeper into the history of this proposal, let's review a list of key events.

- **[2014-04 – Stage 0](https://github.com/tc39/notes/blob/main/meetings/2014-04/apr-10.md#decorators-for-es7)**. Decorators were proposed by Yehuda Katz and they were initially intended to become a part of the ECMAScript 7.

  ```ts
  type Decorator = (
    target: DecoratedClass,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) => PropertyDescriptor | void

  function debounce(delay: number): PropertyDescriptor {
    return (target, propertyKey, descriptor) => {
      let lastTimeout: number
      const method = descriptor.value

      descriptor.value = (...args: unknown[]) => {
        clearInterval(lastTimeout)

        lastTimeout = setTimeout(() => method.call(null, ...args), delay)
      }

      return descriptor
    }
  }
  ```

  Already at this stage, you can see one of the reasons why the decorators API underwent such significant changes later on. The first argument of the decorator was an entire class, even if you were decorating only one of its members. Moreover, it was assumed that developers could mutate this class. JavaScript engines always strive to optimize as much as possible, and in this case, the developer's call to mutate the entire class undermined a significant number of optimizations provided by the engine. Later, we will see that this was indeed a major reason why the decorators API was rewritten multiple times, almost from scratch.

- [**2015-03 – Stage 1**](https://github.com/tc39/notes/blob/main/meetings/2015-03/mar-24.md#62-decorators). Without significant changes, the proposal advanced to stage 2. However, an event occurred that significantly influenced the further development of this proposal: [TypeScript 1.5 was released](https://devblogs.microsoft.com/typescript/announcing-typescript-1-5/), which supported decorators. Despite decorators being marked as experimental (`--experimentalDecorators`), projects like Angular and MobX actively started using them. Furthermore, the overall workflow for these projects assumed the use of decorators exclusively. Due to the popularity of these projects, many developers mistakenly believed that decorators were already a part of the official JS standard.

  This created additional challenges for the TC39 committee because they had to consider the expectations and requirements of the developer community as well as optimization issues in language engines.

- **[2016-07 – Stage 2](https://github.com/tc39/notes/blob/main/meetings/2016-07/jul-28.md#9iiic-decorators)**. After the decorators proposal reached stage 2, its API began to undergo significant changes. Furthermore, at one point the proposal was referred to as "ESnext class features for JavaScript." During its development, there were numerous ideas about how decorators could be structured. To get a comprehensive view of the entire history of changes, I recommend [reviewing the commits](https://github.com/tc39/proposal-decorators) in the proposal's repository. Here is an example of what the decorators API used to look like:

  ```ts
  type Decorator = (args: {
    kind: 'method' | 'property' | 'field'
    key: string | symbol
    isStatic: boolean
    descriptor: PropertyDescriptor
  }) => {
    kind: 'method' | 'property' | 'field'
    key: string | symbol
    isStatic: boolean
    descriptor: PropertyDescriptor
    extras: unknown[]
  }
  ```

  By the end of stage 2, the decorator API looked as follows:

  ```ts
  type Decorator = (
    value: DecoratedValue,
    context: {
      kind: 'class' | 'method' | 'getter' | 'setter' | 'field' | 'accessor'
      name: string | symbol
      access?: {
        get?: () => unknown
        set?: (value: unknown) => void
      }
      private?: boolean
      static?: boolean
      addInitializer?: (initializer: () => void) => void
    },
  ) => UpdatedDecoratedValue | void

  function debounce(delay: number): UpdatedDecoratedValue {
    return (value, context) => {
      let lastTimeout = null

      return (...args) => {
        clearInterval(lastTimeout)

        lastTimeout = setTimeout(() => value.call(null, ...args), delay)
      }
    }
  }
  ```

  The entire stage 2 took 6 years, during which the decorator API underwent significant changes. However, as we can see from the code above, mutations were excluded. This made the proposal more acceptable for JS engines as well as for various platforms, frameworks, and libraries. But the development history of decorators is not over yet.

- **[2020-09 – Announcing MobX 6. Bye-bye Decorators](https://michel.codes/blogs/mobx6)**. Some libraries that relied exclusively on decorators started to move away from their old implementation because they understood that the way they were working with decorators would no longer be standardized.

  > ”_Using decorators is no longer the norm in MobX. This is good news to some of you, but others will hate it. Rightfully so, because I concur that the declarative syntax of decorators is still the best that can be offered. When MobX started, it was a TypeScript only project, so decorators were available. Still experimental, but obviously they were going to be standardized soon. That was my expectation at least (I did mostly Java and C# before). However, that moment still hasn't come yet, and two decorators proposals have been cancelled in the mean time. Although they still can be transpiled.”_
  > © Michel Weststrate, author of MobX

- [**2022-03 – Stage 3**](https://github.com/tc39/notes/blob/main/meetings/2022-03/mar-28.md#decorators-for-stage-3). After years of changes and refinements, decorators finally reached stage 3. Thanks to the extensive adjustments and refinements during the second stage, the third stage began without significant changes. A particular highlight is the creation of a new proposal called **[Decorator Metadata](https://github.com/tc39/proposal-decorator-metadata)**.

- [**2022-08 – SpiderMonkey Newsletter**](https://spidermonkey.dev/blog/2022/08/29/newsletter-firefox-104-105.html). SpiderMonkey, the browser engine used by Firefox, became the first engine to begin working on the implementation of decorators. Implementations like this indicate that the proposal is generally ready to become a full-fledged part of the specification.

- **[2022-09 – Babel 7.19.0. Stage 3 decorators](https://babeljs.io/blog/2022/09/05/7.19.0)**. Adding support in a compiler is a very significant update for any proposal. Most proposals have a similar item in their standardization plan and the decorators proposal [was no exception](https://github.com/tc39/proposal-decorators#standardization-plan).

- **[2022-11 – Announcing TypeScript 4.9](https://devblogs.microsoft.com/typescript/announcing-typescript-4-9/)**. ECMAScript decorators were listed in [TS 4.9 Iteration Plan](https://github.com/microsoft/TypeScript/issues/50457). However, after some time, the TS team decided to move decorators to the 5.0 release. Here is the [authors' comment](https://github.com/microsoft/TypeScript/issues/50457#issuecomment-1253100246):

  > “_While decorators have reached stage 3, we saw some behavior in the spec that needed to be discussed with the champions. Between addressing that and reviewing the changes, we expect decorators will be implemented in the next version.”_

  In general, this decision makes sense, as they did not want to risk incorporating a feature into TS prematurely, especially if it did not become part of the standard. There is always a chance of such situations happening. Although in this case, it might not be as significant as the first implementation.

  In TS 4.9, only a small part of decorators specification was included – [Class Auto-Accessors](https://github.com/tc39/proposal-decorators#class-auto-accessors). This addition to the decorators specification served as a correction for the mutations that were prevalent in the first stages of implementation. The reason behind this is that often there is a desire to make properties reactive, meaning that some effects should occur when the property changes, such as UI re-rendering, for example:

  ```ts
  class Dashboard extends HTMLElement {
    @reactive
    tab = DashboardTab.USERS
  }
  ```

  In the old implementation, with the `reactive` decorator, you had to mutate the `target` class by adding additional `set` and `get` accessors to achieve the desired behavior. With the use of auto-accessors, this behavior now occurs more explicitly, which in turn allows engines to optimize it better.

  ```ts
  class Dashboard extends HTMLElement {
    @reactive
    accessor tab = DashboardTab.USERS
  }
  ```

  Another interesting thing is how decorators were supposed to work. Since the TS team could not remove the old implementation that worked under the `--experimentalDecorators` flag, they decided on the following approach: if the `--experimentalDecorators` flag is present in the configuration, the old implementation will be used. If this flag is not present, then the new implementation will be used.

- **[2023-03 – Announcing TypeScript 5.0](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/)**. As promised, the TS team released the full version of decorators specification in TS 5.0.

- **[2023-03 – Deno 1.32](https://deno.com/blog/v1.32).** Although in version 1.32 Deno supported TS 5.0, they decided to postpone the functionality related to decorators.

  > “_Take note that ES decorators are not yet supported, but we will be working towards enabling them by default in a future version.”_

- **[2023-05 – Angular v16 is here.](https://blog.angular.io/angular-v16-is-here-4d7a28ec680d)** Angular 16 also added support for ECMAScript decorators. However, some other frameworks built around decorators (and which were inspired by Angular?) have stated that they will not make changes toward ECMAScript decorators for now. For many of them, [two important aspects](https://github.com/nestjs/nest/issues/11414) are Metadata and Parameter decorators.

  > ”_I don't think we'll support JS decorators till the metadata support & parameter decorators are implemented._”
  > © Kamil Mysliwiec, creator of NextJS

- **[2023-08 – Announcing TypeScript 5.2](https://devblogs.microsoft.com/typescript/announcing-typescript-5-2/).** In TS 5.2, another standard was added that complements the decorators specification – [Decorator Metadata](https://github.com/tc39/proposal-decorator-metadata). The primary idea behind this proposal is to simplify decorators' access to class metadata in which they are used. Another reason there were so many debates regarding syntax and usage was that the authors had to create a whole separate proposal for this purpose.

## Just Syntactic Sugar or Not?

After all the explanations and examples, you might have a question: "So, are decorators in JavaScript just higher-order functions with special syntax, and that is it?”.

It is not all that simple. In addition to what was mentioned earlier regarding how JavaScript primarily focuses on end-users, it is also worth adding that JS-engines always try to use the new syntax as a reference point to at least _attempt_ to make your JavaScript faster.

```ts
import { groupBy } from 'npm:lodash@4.17.21'

const getGroupedOffersByCity = (offers) => {
  return groupBy(offers, (it) => it.city.name)
}

// OR ?

const getGroupedOffersByCity = (offers) => {
  return Object.groupBy(offers, (it) => it.city.name)
}
```

It may seem like there is no difference, but there are distinctions for the engine. Only in the second case, when native functions are used, can the engine _attempt_ optimization.

Describing how optimizations work in JavaScript engines would require a separate article. Do not hesitate to explore browser source code or search for articles to gain a better understanding of this topic.

It is also important to remember that there are many JavaScript engines, and they all perform optimizations differently. However, if you assist the engine by using native syntax, your _application_ code will generally run faster in most cases.

### Possible Extensions

The new syntax in the specification also opens the door for additional features in the future. As an analogy, consider constructor functions and classes. When private fields were introduced in the specification, they were introduced as a feature for classes. For those who staunchly denied the usefulness of classes and claimed that constructor functions were equivalent, private fields became another reason to move away from constructor functions in favor of classes. Such features are likely to continue evolving.

While we can currently achieve many of the same effects as decorators using higher-order functions in many cases, they still do not cover all the potential functionality that will be added to the decorators specification in the future.

The "[possible extensions](https://github.com/tc39/proposal-decorators/blob/master/EXTENSIONS.md)" file in the decorators specification repository provides insights into how the decorators specification may evolve in the future. Some of the points were listed in the first stages but are not present in the current standard, such as parameter decorators. However, there are also entirely new concepts mentioned, like `const`/`let` decorators or block decorators. These potential extensions illustrate the ongoing development and expansion of the decorator functionality in JavaScript.

Indeed, numerous proposals and extensions are being considered to enhance the decorators specification further. Some of these proposals like the [Decorator Metadata](https://github.com/tc39/proposal-decorator-metadata), are already under consideration even though the core decorator specification has not yet been standardized. This underscores the idea that decorators have a promising future in the specification and we can hope to see them become a part of the standard in the near future.

## Conclusion

The lengthy consideration of the decorators proposal over 10 years may indeed seem like an extended period. It is true that the early adoption of decorators by leading frameworks and libraries played a role in uncovering the shortcomings of the initial implementation. However, this early adoption also served as an invaluable learning experience, highlighting the importance of harmonizing with web platforms and developing a solution that aligns with both platforms and the developer community, while preserving the essence of decorators. The time spent refining the proposal has ultimately contributed to making it a more robust and well-considered addition to the JavaScript language.

Indeed, decorators will bring significant changes to how we write applications today. Perhaps not immediately, as the current specification primarily focuses on classes, but with all the [additions and ongoing work](https://github.com/tc39/proposal-class-method-parameter-decorators) JavaScript code in many applications will soon look different. We are now closer than ever to the moment when we can finally see those _ones that are real_ decorators in the specification. It is an exciting development that promises to enhance the expressiveness and functionality of JavaScript applications.
