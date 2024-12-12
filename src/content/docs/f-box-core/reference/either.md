---
title: Either
description: Detailed API reference for the Either abstraction in F-Box.
---

`Either` is an abstraction in F-Box that encapsulates a value that can represent one of two cases: a valid result (`Right`) or an error/invalid state (`Left`). It is commonly used to handle computations that can succeed or fail in a type-safe manner.

---

The `Either` abstraction simplifies error handling and branching logic. By distinguishing between `Right` (success) and `Left` (failure), it enables composability, error propagation, and concise handling of complex scenarios.

### Key Features

- **Encapsulation**: Wraps values to represent success (`Right`) or failure (`Left`).
- **Error Safety**: Propagates errors through computations without manual checks.
- **Composability**: Provides operators and methods for chaining computations.
- **Functional Design**: Adheres to functional programming principles with immutability and predictability.

---

## Left and Right

The `Either` type has two specific forms:

### `Left<L>`

Represents an `Either` with an invalid result or error. Operations like `map`, `flatMap`, and `apply` propagate the `Left` instance without executing their logic.

#### Example

```typescript
const leftValue = Either.left("Error")
console.log(leftValue.getValue()) // Outputs: "Error"
```

#### Key Characteristics

- Contains an error or invalid value of type `L`.
- Propagates itself through transformations without invoking their logic.

---

### `Right<L, R>`

Represents an `Either` with a valid result. Operations like `map`, `flatMap`, and `apply` execute their logic and produce a new `Either`.

#### Example

```typescript
const rightValue = Either.right(42)
console.log(rightValue.getValue()) // Outputs: 42
```

#### Key Characteristics

- Contains a valid value of type `R`.
- Executes transformations and returns new `Right` or `Left` instances.

---

## Creating an Either

To create an `Either`, use the static method `Either.pack` (alias for `Either.right`). Alternatively, you can use `Either.left` to create a `Left` directly.

### Example

```typescript
import { Either } from "f-box-core"

// Create a Right
const rightValue = Either.pack(42)
console.log(rightValue.getValue()) // Outputs: 42

// Create a Left
const leftValue = Either.left("Error")
console.log(leftValue.getValue()) // Outputs: "Error"
```

This demonstrates how to:

- Create a `Right` for valid results.
- Create a `Left` for errors or invalid states.

---

## Supported Operators

The `Either` abstraction provides the following operators for working with its encapsulated value. Each operator is an alias for a corresponding method.

- `<$>`: Alias for `map`. Applies a transformation function to the value in a `Right`.
- `<*>`: Alias for `apply`. Combines a function in a `Right` with a value in another `Right`.
- `>>=`: Alias for `flatMap`. Chains computations that return new `Either` instances.
- `<?>`: Alias for `orElse`. Returns the current `Either` if it is a `Right`, or a default `Either` if it is a `Left`.
- `<|>`: Alias for `getOrElse`. Returns the encapsulated value if it is a `Right`, or a default value if it is a `Left`.

For detailed usage, see [API Methods](#api-methods).

---

## API Methods

### Either.pack

#### `Either.pack<R>(value: R): Right<L, R>`

Creates a `Right` instance containing the given value.

```typescript
const rightValue = Either.pack(42)
console.log(rightValue.getValue()) // Outputs: 42
```

---

### Either.left

#### `Either.left<L>(value: L): Left<L>`

Creates a `Left` instance encapsulating the given value.

```typescript
const leftValue = Either.left("Error")
console.log(leftValue.getValue()) // Outputs: "Error"
```

---

### map

#### `map<U>(fn: (value: R) => U): Either<L, U>`

Applies a transformation function to the value inside a `Right` and returns a new `Either`. If the instance is a `Left`, it propagates the `Left`.

**Alias**: `<$>`

```typescript
const rightValue = Either.right(10)
const transformed = rightValue["<$>"]((x) => x * 2)
console.log(transformed.getValue()) // Outputs: 20

const leftValue = Either.left("Error")
const unchanged = leftValue["<$>"]((x) => x * 2)
console.log(unchanged.getValue()) // Outputs: "Error"
```

```typescript
// Method call
const transformed = rightValue.map((x) => x * 2)
console.log(transformed.getValue()) // Outputs: 20
```

---

### apply

#### `apply<A, B>(this: Either<L, (a: A) => B>, boxValue: Either<L, A>): Either<L, B>`

Applies a function wrapped in a `Right` to a value wrapped in another `Right`, returning a new `Right`. If either instance is a `Left`, it propagates the `Left`.

**Alias**: `<*>`

```typescript
const rightFn = Either.right((x: number) => x + 5)
const rightValue = Either.right(10)
const result = rightFn["<*>"](rightValue)
console.log(result.getValue()) // Outputs: 15

const leftFn = Either.left("Error")
const unchanged = leftFn["<*>"](rightValue)
console.log(unchanged.getValue()) // Outputs: "Error"
```

```typescript
// Method call
const result = rightFn.apply(rightValue)
console.log(result.getValue()) // Outputs: 15
```

---

### flatMap

#### `flatMap<U>(fn: (value: R) => Either<L, U>): Either<L, U>`

Applies a function returning an `Either` to the value inside a `Right` and flattens the result. If the instance is a `Left`, it propagates the `Left`.

**Alias**: `>>=`

```typescript
const rightValue = Either.right(10)
const transformed = rightValue[">>="]((x) =>
  x > 5 ? Either.right(x * 2) : Either.left("Value too small")
)
console.log(transformed.getValue()) // Outputs: 20
```

```typescript
// Method call
const transformed = rightValue.flatMap((x) =>
  x > 5 ? Either.right(x * 2) : Either.left("Value too small")
)
console.log(transformed.getValue()) // Outputs: 20
```

---

### orElse

#### `orElse<U>(defaultValue: Either<L, U>): Either<L, U>`

Returns the current `Either` if it is a `Right`, or the given default `Either` if it is a `Left`.

**Alias**: `<?>`

```typescript
const rightValue = Either.right(10)
const result = rightValue["<?>"](Either.right(20))
console.log(result.getValue()) // Outputs: 10

const leftValue = Either.left("Error")
const fallback = leftValue["<?>"](Either.right(20))
console.log(fallback.getValue()) // Outputs: 20
```

```typescript
// Method call
const result = rightValue.orElse(Either.right(20))
console.log(result.getValue()) // Outputs: 10

const fallback = leftValue.orElse(Either.right(20))
console.log(fallback.getValue()) // Outputs: 20
```

---

### getOrElse

#### `getOrElse(defaultValue: R): R`

Returns the value inside a `Right`, or the provided default value if it is a `Left`.

**Alias**: `<|>`

```typescript
const result = rightValue["<|>"](20)
console.log(result) // Outputs: 10

const fallback = leftValue["<|>"](20)
console.log(fallback) // Outputs: 20
```

```typescript
// Method call
const result = rightValue.getOrElse(20)
console.log(result) // Outputs: 10

const fallback = leftValue.getOrElse(20)
console.log(fallback) // Outputs: 20
```

---

### match

#### `match<U>(onLeft: (value: L) => U, onRight: (value: R) => U): U`

Matches the current `Either` instance against the `Left` or `Right` cases and applies the corresponding function.

```typescript
const rightValue = Either.right(42)
const result = rightValue.match(
  (error) => `Error: ${error}`,
  (value) => `Success: ${value}`
)
console.log(result) // Outputs: Success: 42

const leftValue = Either.left("Error")
const fallback = leftValue.match(
  (error) => `Error: ${error}`,
  (value) => `Success: ${value}`
)
console.log(fallback) // Outputs: Error: Error
```

---

## Helper Methods

### Either.isLeft

#### `Either.isLeft(value: Either<L, R>): boolean`

Checks if a given `Either` is a `Left`.

```typescript
const leftValue = Either.left("Error")
console.log(Either.isLeft(leftValue)) // Outputs: true

const rightValue = Either.right(42)
console.log(Either.isLeft(rightValue)) // Outputs: false
```

---

### Either.isRight

#### `Either.isRight(value: Either<L, R>): boolean`

Checks if a given `Either` is a `Right`.

```typescript
const rightValue = Either.right(42)
console.log(Either.isRight(rightValue)) // Outputs: true

const leftValue = Either.left("Error")
console.log(Either.isRight(leftValue)) // Outputs: false
```

---

### Either.isEither

#### `Either.isEither(value: any): boolean`

Checks if a given value is an `Either`.

```typescript
const eitherValue = Either.right(42)
console.log(Either.isEither(eitherValue)) // Outputs: true

const nonEitherValue = { notEither: true }
console.log(Either.isEither(nonEitherValue)) // Outputs: false
```

---

## Use Cases

### Handling Success and Failure

Explicitly handle `Right` (success) and `Left` (failure) cases:

```typescript
const value = Either.right(42)
const result = value.match(
  (error) => `Error: ${error}`,
  (success) => `Success: ${success}`
)
console.log(result) // Outputs: Success: 42
```

---

### Chaining Computations

Chain multiple computations, stopping at the first failure:

```typescript
const f = (x: number): Either<string, number> =>
  x > 5 ? Either.right(x * 2) : Either.left("Too small")
const g = (x: number): Either<string, number> => Either.right(x + 5)

const result = Either.right(10) // Start with an initial Right value of 10
  [">>="](f) // Apply f, which doubles the value if it's greater than 5
  [">>="](g) // Apply g, which increments the value by 5

console.log(result.getValue()) // Outputs: 25
```

---

### Providing Fallbacks

Provide fallback values or computations:

```typescript
const leftValue = Either.left("Error")
const fallback = leftValue["<?>"](Either.right(42))
console.log(fallback.getValue()) // Outputs: 42
```

---

## Why Use Either?

The `Either` abstraction offers a robust framework for handling computations that can succeed or fail. By leveraging `Right` and `Left` to represent valid and invalid results, it enables predictable, composable, and error-safe programming.

---

## Next Steps

Explore other abstractions in F-Box:

- **[Box](./box)**: A foundational abstraction for encapsulating values.
- **[RBox](./rbox)**: A reactive extension of `Box`.
- **[Maybe](./maybe)**: Represents optional values.
- **[Task](./task)**: Manages asynchronous workflows.
