---
title: Key Concepts
description: Learn about the core concepts of F-Box, focusing on operators like <$>, <*>, and >>=.
---

F-Box is designed around a consistent and powerful set of operators that simplify working with functional abstractions. These operators (`<$>`, `<*>`, `>>=`) form the foundation of F-Box's API, enabling composability and predictability across all its data types.

This section introduces these operators using `Box` as an example.

---

## Functional Operators in F-Box

F-Box defines three primary operators that are common to all its abstractions. These operators allow you to transform, combine, and chain computations in a functional and type-safe manner.

### 1. `<$>` (Map)

The `<$>` operator applies a function to the value inside a container, producing a new container with the transformed value. It is equivalent to the `map` function in many functional programming libraries.

#### Example

```typescript
import { Box } from 'f-box-core';

const box = Box.pack<number>(10);
const transformedBox = box["<$>"]((x) => x * 2);

console.log(box.getValue());         // 10
console.log(transformedBox.getValue()); // 20
```

#### Key Points

- Does not modify the original container.
- Returns a new container with the transformed value.

---

### 2. `<*>` (Apply)

The `<*>` operator combines a container holding a function with another container holding a value, applying the function to the value.

#### Example

```typescript
import { Box } from 'f-box-core';

const boxFn = Box.pack<(x: number) => number>((x) => x * 2);
const boxValue = Box.pack<number>(10);
const resultBox = boxFn["<*>"](boxValue);

console.log(resultBox.getValue()); // 20
```

#### Key Points

- Enables applying a function stored in one container to the value of another.
- Useful for computations involving multiple containers.

---

### 3. `>>=` (FlatMap)

The `>>=` operator, also known as `FlatMap`, chains computations that return new containers. It is essential for composing nested operations in a functional style.

#### Example

```typescript
import { Box } from 'f-box-core';

const box = Box.pack<number>(10);
const chainedBox = box[">>="]((x) => Box.pack(x * 2));

console.log(chainedBox.getValue()); // 20
```

#### Key Points

- Chains multiple operations that return containers.
- Useful for flattening nested structures and composing workflows.

---

## Why These Operators Matter

F-Box is built around these operators to ensure consistency and predictability across all its abstractions. Whether you're working with `Box`, `RBox`, `Maybe`, `Either`, or `Task`, you can rely on `<$>`, `<*>`, and `>>=` to interact with the values they encapsulate.

### Advantages of F-Box's Design

1. **Composability**: Easily combine operations on values without breaking the functional paradigm.
2. **Consistency**: A unified API across all abstractions simplifies learning and usage.
3. **Type Safety**: Strong TypeScript support ensures correctness at compile time.

---

## What's Next?

Now that you understand the core operators of F-Box, explore their specific implementations in different abstractions:

- **[Box](../reference/box/)**: The simplest and most commonly used container.
- **[RBox](../reference/rbox/)**: Reactive state management built on `Box`.
- **[Maybe](../reference/maybe/)**: Handling optional values with safety.
- **[Either](../reference/either/)**: Representing success or failure explicitly.
- **[Task](../reference/task/)**: Managing asynchronous workflows with ease.
