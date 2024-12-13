---
title: Installation Guide
description: Step-by-step guide to installing F-Box React.
---

F-Box React extends F-Box with powerful tools for managing state and reactivity in React applications. It integrates seamlessly with TypeScript for robust type safety and developer productivity.

## Prerequisites

Before you start, ensure your development environment meets the following requirements:

- **Node.js**: Version 16.8.0 or later.
- **npm** or **yarn**: A package manager for JavaScript.
- **React**: Version 18.0.0 or later.
- **TypeScript**: Version 4.0 or later.

If TypeScript is not already installed in your project, add it with the following command:

```bash
npm install typescript --save-dev
```

## Installation Steps

### Install the F-Box React Package

To install F-Box React and its core dependency, run the following command:

```bash
# Using npm
npm install f-box-react f-box-core

# Or using yarn
yarn add f-box-react f-box-core
```

### Start Using F-Box React

Here's an example of using `useRBox` to manage state in a React component:

```tsx
import React from "react"
import { useRBox, set } from "f-box-react"

const Counter = () => {
  const [count, countBox] = useRBox(0)
  const setCount = set(countBox)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}

export default Counter
```

## What's Next?

- **[Key Concepts](/f-box-react/introduction/concepts)**: Learn about the React-specific abstractions provided by F-Box React.
- **[API Reference](/f-box-react/reference/use-box)**: Explore the detailed documentation for hooks like `useBox` and `useRBox`.

With these steps, you're ready to start building reactive and maintainable applications using F-Box React!