---
title: Maybe
description: Detailed API reference for the Maybe abstraction in F-Box.
---

`Maybe` is an abstraction in F-Box that encapsulates an optional value. It provides methods to handle presence (`Just`) and absence (`Nothing`) of values in a type-safe and composable manner.

---

The `Maybe` abstraction helps you handle values that might be absent (e.g., `null` or `undefined`). By distinguishing between `Just` (a value is present) and `Nothing` (no value), `Maybe` avoids common pitfalls associated with nullish values.

### Key Features

- **Encapsulation**: Wraps a value to provide a controlled interface for interactions.
- **Safety**: Ensures null-safe handling of optional values.
- **Composability**: Provides operators and methods for functional transformations.
- **Extended Operators**: Includes specialized operators like `<?>` and `<|>` for handling optional values.

---

## Just and Nothing

The `Maybe` type has two specific forms:

### `Just<T>`

Represents a `Maybe` with a present value. It provides methods and operators to manipulate the value safely.

#### Example

```typescript
const justValue = Maybe.just(42)
console.log(justValue.getValue()) // Outputs: 42
```

#### Key Characteristics

- Contains a value of type `T`.
- Allows transformations using methods like `map`, `flatMap`, and `apply`.

---

### `Nothing`

Represents a `Maybe` with no value. It provides a consistent interface, but its methods and operators return itself or default values.

#### Example

```typescript
const nothingValue = Maybe.nothing()
console.log(nothingValue.getValue()) // Outputs: null
```

#### Key Characteristics

- Encapsulates absence (`null`, `undefined`, or `void`).
- Safely propagates the absence through methods like `map`, `flatMap`, and `apply`.

---

## Creating a Maybe

To create a `Maybe`, use the static method `Maybe.pack`. Depending on the input, it will return either a `Just` or `Nothing`.

### Example

```typescript
import { Maybe } from "f-box-core"

// Create a Maybe with a present value
const justValue = Maybe.pack(42)
console.log(justValue.getValue()) // Outputs: 42

// Create a Maybe with an absent value
const nothingValue = Maybe.pack(null)
console.log(nothingValue.getValue()) // Outputs: null
```

This demonstrates how to:

- Create a `Just` when a value is present.
- Create a `Nothing` when a value is absent.

---

## Supported Operators

The `Maybe` abstraction provides the following operators for working with its encapsulated value. Each operator is an alias for a corresponding method.

- `<$>`: Alias for `map`. Applies a transformation function to the value.
- `<*>`: Alias for `apply`. Combines a function in a `Maybe` with a value in another `Maybe`.
- `>>=`: Alias for `flatMap`. Chains computations that return new `Maybe` instances.
- `<?>`: Alias for `orElse`. Returns the current `Maybe` if present, or a default `Maybe` if absent.
- `<|>`: Alias for `getOrElse`. Returns the encapsulated value if present, or a default value if absent.

For detailed usage, see [API Methods](#api-methods).

---

## API Methods

### Maybe.pack

#### `Maybe.pack<T>(value: T | None): Maybe<T>`

Creates a new `Maybe` instance based on the given value. Returns a `Just` for present values or `Nothing` for nullish values.

```typescript
const justValue = Maybe.pack(42)
console.log(justValue.getValue()) // Outputs: 42

const nothingValue = Maybe.pack(null)
console.log(nothingValue.getValue()) // Outputs: null
```

---

### Maybe.just

#### `Maybe.just<T>(value: T): Just<T>`

Creates a `Just` instance encapsulating the given value.

```typescript
const justValue = Maybe.just(42)
console.log(justValue.getValue()) // Outputs: 42
```

---

### Maybe.nothing

#### `Maybe.nothing(): Nothing`

Returns the singleton instance representing a `Nothing` value.

```typescript
const nothingValue = Maybe.nothing()
console.log(nothingValue.getValue()) // Outputs: null
```

---

### Maybe.isNone

#### `Maybe.isNone(value: any): boolean`

Checks if a given value is `None` (i.e., `null`, `undefined`, or `void`).

```typescript
console.log(Maybe.isNone(null)) // Outputs: true
console.log(Maybe.isNone(42)) // Outputs: false
```

---

### Maybe.isMaybe

#### `Maybe.isMaybe(value: any): boolean`

Checks if a given value is a `Maybe`.

```typescript
const maybeValue = Maybe.pack(42)
console.log(Maybe.isMaybe(maybeValue)) // Outputs: true
console.log(Maybe.isMaybe(42)) // Outputs: false
```

---

### Maybe.isNothing

#### `Maybe.isNothing(value: Maybe<T>): boolean`

Checks if a given `Maybe` is a `Nothing`.

```typescript
const nothingValue = Maybe.nothing()
console.log(Maybe.isNothing(nothingValue)) // Outputs: true
```

---

### Maybe.isJust

#### `Maybe.isJust(value: Maybe<T>): boolean`

Checks if a given `Maybe` is a `Just`.

```typescript
const justValue = Maybe.just(42)
console.log(Maybe.isJust(justValue)) // Outputs: true
```

### map

#### `map<U>(fn: (value: T) => U): Maybe<U>`

Applies a transformation function to the encapsulated value, returning a new `Maybe`.

**Alias**: `<$>`

```typescript
const justValue = Maybe.just(10)
const transformed = justValue["<$>"]((x) => x * 2)
console.log(transformed.getValue()) // Outputs: 20
```

```typescript
// Method call
const transformed = justValue.map((x) => x * 2)
console.log(transformed.getValue()) // Outputs: 20
```

---

### apply

#### `apply<A, B>(this: Maybe<(a: A) => B>, boxValue: Maybe<A>): Maybe<B>`

Applies a function wrapped in one `Maybe` to a value wrapped in another `Maybe`.

**Alias**: `<*>`

```typescript
const maybeFn = Maybe.just((x: number) => x + 5)
const maybeValue = Maybe.just(10)
const result = maybeFn["<*>"](maybeValue)
console.log(result.getValue()) // Outputs: 15
```

```typescript
// Method call
const result = maybeFn.apply(maybeValue)
console.log(result.getValue()) // Outputs: 15
```

---

### flatMap

#### `flatMap<U>(fn: (value: T) => Maybe<U>): Maybe<U>`

Applies a function returning a `Maybe` to the value inside this `Maybe` and flattens the result.

**Alias**: `>>=`

```typescript
const justValue = Maybe.just(10)
const transformed = justValue[">>="]((x) => Maybe.just(x * 2))
console.log(transformed.getValue()) // Outputs: 20
```

```typescript
// Method call
const transformed = justValue.flatMap((x) => Maybe.just(x * 2))
console.log(transformed.getValue()) // Outputs: 20
```

---

### orElse

#### `orElse(defaultValue: Maybe<T>): Maybe<T>`

Returns the current `Maybe` if it is a `Just`, or the given default `Maybe` if it is a `Nothing`.

**Alias**: `<?>`

```typescript
const justValue = Maybe.just(10)
const result = justValue["<?>"](Maybe.just(20))
console.log(result.getValue()) // Outputs: 10

const nothingValue = Maybe.nothing()
const fallback = nothingValue["<?>"](Maybe.just(20))
console.log(fallback.getValue()) // Outputs: 20
```

```typescript
// Method call
const justValue = Maybe.just(10)
const result = justValue.orElse(Maybe.just(20))
console.log(result.getValue()) // Outputs: 10

const nothingValue = Maybe.nothing()
const fallback = nothingValue.orElse(Maybe.just(20))
console.log(fallback.getValue()) // Outputs: 20
```

---

### getOrElse

#### `getOrElse(defaultValue: T): T`

Returns the value inside the `Maybe` if present, or the provided default value if it is a `Nothing`.

**Alias**: `<|>`

```typescript
const justValue = Maybe.just(10)
const result = justValue["<|>"](20)
console.log(result.getValue()) // Outputs: 10

const nothingValue = Maybe.nothing()
const fallback = nothingValue["<|>"](20)
console.log(fallback.getValue()) // Outputs: 20
```

```typescript
// Method call
const justValue = Maybe.just(10)
const result = justValue.getOrElse(20)
console.log(result.getValue()) // Outputs: 10

const nothingValue = Maybe.nothing()
const fallback = nothingValue.getOrElse(20)
console.log(fallback.getValue()) // Outputs: 20
```

### match

#### `match<U>(onJust: (value: T) => U, onNothing: () => U): U`

Matches the current `Maybe` instance against the `Just` or `Nothing` cases and applies the corresponding function.

```typescript
const justValue = Maybe.just(42)
const result = justValue.match(
  (value) => `Value is ${value}`,
  () => "No value"
)
console.log(result) // Outputs: Value is 42

const nothingValue = Maybe.nothing()
const fallback = nothingValue.match(
  (value) => `Value is ${value}`,
  () => "No value"
)
console.log(fallback) // Outputs: No value
```

---

### Just and Nothing Types

`Maybe` is a discriminated union type composed of two specific variants: `Just` and `Nothing`. These types are used to encapsulate values or represent the absence of a value in a functional and type-safe way.

#### Just

A `Just` represents a `Maybe` instance that encapsulates a present, non-null value. It provides methods for mapping, chaining, and safely accessing the encapsulated value.

#### Nothing

A `Nothing` represents a `Maybe` instance that encapsulates the absence of a value. All operations on a `Nothing` result in a `Nothing`, ensuring safe handling of optional values.

```typescript
const justValue = Maybe.just(42)
console.log(justValue.getValue()) // Outputs: 42

const nothingValue = Maybe.nothing()
console.log(nothingValue.getOrElse(0)) // Outputs: 0
```

---

## Use Cases

### Transforming Optional Values

Apply a series of transformations to encapsulated values:

```typescript
const justValue = Maybe.pack(100)
  ["<$>"]((x) => x / 2)
  ["<$>"]((x) => x + 10)

console.log(justValue.getValue()) // Outputs: 60
```

---

### Fallback for Missing Values

Provide a default value when a value is missing:

```typescript
const nothingValue = Maybe.nothing()
const fallback = nothingValue["<?>"](Maybe.just(50))

console.log(fallback.getValue()) // Outputs: 50
```

---

### Combining Optional Values

Combine multiple `Maybe` instances using the `<*>` operator:

```typescript
const result = Maybe.just((a: number) => (b: number) => a + b)
  ["<*>"](Maybe.just(10))
  ["<*>"](Maybe.just(20))

console.log(result.getValue()) // Outputs: 30
```

---

### Matching on Presence and Absence

Handle `Just` and `Nothing` cases explicitly with `match`:

```typescript
const justValue = Maybe.just(42)
const result = justValue.match(
  (value) => `Value is ${value}`,
  () => "No value"
)
console.log(result) // Outputs: Value is 42

const nothingValue = Maybe.nothing()
const fallback = nothingValue.match(
  (value) => `Value is ${value}`,
  () => "No value"
)
console.log(fallback) // Outputs: No value
```

---

## Why Use Maybe?

The `Maybe` abstraction provides a consistent and type-safe way to handle optional values, avoiding pitfalls like `null` dereferencing. Its functional interface and composable methods make it ideal for working with uncertain data.

---

## Next Steps

Explore other abstractions built on `Maybe`:

- **[Box](./box)**: A foundational abstraction for encapsulating values.
- **[RBox](./rbox)**: A reactive extension of `Box`.
- **[Either](./either)**: Represents computations with success or failure.
- **[Task](./task)**: Manages asynchronous workflows.
