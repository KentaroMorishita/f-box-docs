---
title: Box
description: Detailed API reference for the Box abstraction in F-Box.
---

`Box` is a foundational abstraction in F-Box. It encapsulates a single value and provides a functional interface for transforming, combining, and chaining operations.

---

The `Box` abstraction simplifies handling values in a functional programming style. It ensures immutability and composability, making it ideal for scenarios requiring predictable and side-effect-free operations.

### Key Features

- **Encapsulation**: Wraps a value to provide a controlled interface for interactions.
- **Immutability**: Operations do not alter the original value but produce new `Box` instances.

---

## Creating a Box

To create a `Box`, use the static method `Box.pack`. This method initializes a `Box` instance with a given value.

```typescript
import { Box } from "f-box-core"

const box = Box.pack(42)
console.log(box.getValue()) // Outputs: 42
```

---

## Supported Operators

The `Box` abstraction provides the following operators for working with its encapsulated value. Each operator is an alias for a corresponding method.

- `<$>`: Alias for `map`. Applies a transformation function to the value.
- `<*>`: Alias for `apply`. Combines a function in a `Box` with a value in another `Box`.
- `>>=`: Alias for `flatMap`. Chains computations that return new `Box` instances.

For detailed usage, see [API Methods](#api-methods).

---

## API Methods

### Box.pack

#### `Box.pack(value: T): Box<T>`

Creates a new `Box` instance containing the provided value.

```typescript
const box = Box.pack(42)
console.log(box.getValue()) // Outputs: 42
```

---

### Box.isBox

#### `Box.isBox(value: any): boolean`

Checks if a given value is a `Box` instance.

```typescript
import { Box } from "f-box-core"

const box = Box.pack(10)
console.log(Box.isBox(box)) // Outputs: true
console.log(Box.isBox({})) // Outputs: false
```

---

### map

#### `map<U>(fn: (value: T) => U): Box<U>`

Applies a transformation function to the encapsulated value, returning a new `Box` with the result.

**Alias**: `<$>`

```typescript
const box = Box.pack(10)
const transformedBox = box["<$>"]((x) => x * 2)
console.log(transformedBox.getValue()) // Outputs: 20
```

```typescript
// Method call
const transformedBox = box.map((x) => x * 2)
console.log(transformedBox.getValue()) // Outputs: 20
```

---

### apply

#### `apply<A, B>(this: Box<(a: A) => B>, boxValue: Box<A>): Box<B>`

Applies a function wrapped in one `Box` to a value wrapped in another `Box`.

**Alias**: `<*>`

```typescript
const boxFn = Box.pack((x: number) => x + 5)
const boxValue = Box.pack(10)
const resultBox = boxFn["<*>"](boxValue)
console.log(resultBox.getValue()) // Outputs: 15
```

```typescript
// Method call
const resultBox = boxFn.apply(boxValue)
console.log(resultBox.getValue()) // Outputs: 15
```

---

### flatMap

#### `flatMap<U>(fn: (value: T) => Box<U>): Box<U>`

Applies a function returning a `Box` to the value inside this `Box` and flattens the result.

**Alias**: `>>=`

```typescript
const box = Box.pack(10)
const chainedBox = box[">>="]((x) => Box.pack(x * 2))
console.log(chainedBox.getValue()) // Outputs: 20
```

```typescript
// Method call
const chainedBox = box.flatMap((x) => Box.pack(x * 2))
console.log(chainedBox.getValue()) // Outputs: 20
```

---

### getValue

#### `getValue(): T`

Retrieves the value encapsulated in the `Box`.

```typescript
const box = Box.pack(10)
console.log(box.getValue()) // Outputs: 10
```

## Use Cases

### Transforming Values

Apply a series of transformations to encapsulated values:

```typescript
const box = Box.pack(100)
  ["<$>"]((x) => x / 2)
  ["<$>"]((x) => x + 10)

console.log(box.getValue()) // Outputs: 60
```

---

### Applicative Style

Combine multiple `Box` instances using the `<*>` operator. The function used in this example is curried to enable step-by-step application.

```typescript
// Pack a curried function
const box = Box.pack((a: number) => (b: number) => a + b)
  ["<*>"](Box.pack(10))
  ["<*>"](Box.pack(20))

console.log(box.getValue()) // Outputs: 30
```

---

### Composing Functions

Chain multiple operations into a pipeline:

```typescript
const box = Box.pack(10)
  [">>="]((x) => Box.pack(x * 2))
  [">>="]((x) => Box.pack(x + 5))

console.log(box.getValue()) // Outputs: 25
```

---

## Why Use Box?

The `Box` abstraction is a lightweight and intuitive tool for functional programming. Its operators and methods provide consistency across all of F-Box's abstractions, ensuring seamless integration and predictable behavior.

---

## Next Steps

Explore other abstractions built on `Box`:

- **[RBox](/f-box-core/reference/rbox)**: A reactive state container based on `Box`.
- **[Maybe](/f-box-core/reference/maybe)**: A container for optional values.
- **[Either](/f-box-core/reference/either)**: Encapsulates computations with success or failure.
- **[Task](/f-box-core/reference/task)**: Handles asynchronous workflows.
