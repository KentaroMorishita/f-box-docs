---
title: Installation Guide
description: Step-by-step guide to installing F-Box.
---

F-Box is designed with TypeScript as its primary language, offering robust type safety and developer productivity. While it can be used in plain JavaScript projects, TypeScript is the recommended way to harness its full potential.

## Prerequisites

Before you start, ensure your development environment meets the following requirements:

- **Node.js**: Version 14 or later.
- **npm** or **yarn**: A package manager for JavaScript.
- **TypeScript**: Version 4.0 or later.

If TypeScript is not already installed in your project, add it with the following command:

```bash
npm install typescript --save-dev
```

## Installation Steps

### 1. Install the F-Box Package

To install F-Box, run the following command:

```bash
# Using npm
npm install f-box-core

# Or using yarn
yarn add f-box-core
```

### 2. Configure TypeScript (if needed)

If you don't already have a `tsconfig.json` file, create one using:

```bash
npx tsc --init
```

This file allows you to customize TypeScript's behavior. F-Box works out-of-the-box with the default configuration.

### 3. Verify Installation

To verify the package is installed correctly, run:

```bash
npm list f-box-core
```

You should see the installed version of F-Box listed.

### 4. Start Using F-Box

Here's an example of using F-Box in TypeScript:

```typescript
import { Box } from 'f-box-core';

const boxA = Box.pack<number>(10);
const boxB = boxA["<$>"]((x) => x * 2);
console.log(boxA.getValue()); // 10
console.log(boxB.getValue()); // 20
```

## What's Next?

- **[Key Concepts](./concepts)**: Learn about the core abstractions provided by F-Box.
- **[API Reference](../reference/box)**: Explore the detailed documentation for `Box` and other modules.

With these steps, you're ready to start building robust and maintainable applications using F-Box!
