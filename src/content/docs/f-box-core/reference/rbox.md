---
title: RBox
description: Detailed API reference for the RBox abstraction in F-Box.
---

`RBox` is a reactive abstraction in F-Box. It encapsulates a single value, supports reactive updates, and provides a functional interface for transforming, combining, and chaining operations.

---

The `RBox` abstraction extends the functionality of `Box` by introducing reactivity. It allows you to subscribe to updates, propagate changes to derived `RBox` instances, and manage dependencies.

### Key Features

- **Reactivity**: Automatically updates derived `RBox` instances when the original value changes.
- **Encapsulation**: Wraps a value to provide a controlled interface for interactions.

---

## Creating an RBox

To create an `RBox`, use the static method `RBox.pack`. This method initializes an `RBox` instance with a given value. Additionally, you can subscribe to value changes to observe updates in real-time.

### Example

```typescript
import { RBox } from "f-box-core"

// Create an RBox with an initial value
const rbox = RBox.pack(42)
console.log(rbox.getValue()) // Outputs: 42

// Subscribe to changes
const subscriptionKey = rbox.subscribe((value) => {
  console.log(`Updated value: ${value}`)
})

// Update the value
rbox.setValue((x) => x + 10) // Logs: Updated value: 52

// Unsubscribe from updates
rbox.unsubscribe(subscriptionKey)
rbox.setValue((x) => x * 2) // No logs, as subscription is removed

// Get the current value
console.log(rbox.getValue()) // Outputs: 104
```

This demonstrates how to:
- Create an `RBox`.
- Subscribe to value changes.
- Update the value reactively.
- Unsubscribe from updates when no longer needed.

---

## Supported Operators

The `RBox` abstraction provides the following operators for working with its encapsulated value. Each operator is an alias for a corresponding method.

- `<$>`: Alias for `map`. Applies a transformation function to the value.
- `<*>`: Alias for `apply`. Combines a function in an `RBox` with a value in another `RBox`.
- `>>=`: Alias for `flatMap`. Chains computations that return new `RBox` instances.

For detailed usage, see [API Methods](#api-methods).

---

## API Methods

### RBox.pack

#### `RBox.pack(value: T): RBox<T>`

Creates a new `RBox` instance containing the provided value.

```typescript
const rbox = RBox.pack(42)
console.log(rbox.getValue()) // Outputs: 42
```

---

### RBox.isRBox

#### `RBox.isRBox(value: any): boolean`

Checks if a given value is an `RBox` instance.

```typescript
import { RBox } from "f-box-core"

const rbox = RBox.pack(10)
console.log(RBox.isRBox(rbox)) // Outputs: true
console.log(RBox.isRBox({})) // Outputs: false
```

---

### getValue

#### `getValue(): T`

Retrieves the value encapsulated in the `RBox`.

```typescript
const rbox = RBox.pack(10)
console.log(rbox.getValue()) // Outputs: 10
```

---

### setValue

#### `setValue(fn: (value: T) => T): void`

Updates the value inside the `RBox` and notifies all subscribers.

```typescript
const rbox = RBox.pack(10)
rbox.setValue((x) => x * 2)
console.log(rbox.getValue()) // Outputs: 20
```

---

### map

#### `map<U>(fn: (value: T) => U): RBox<U>`

Applies a transformation function to the encapsulated value, returning a new derived `RBox`.

**Alias**: `<$>`

```typescript
const rbox = RBox.pack(10)
const derivedRBox = rbox["<$>"]((x) => x * 2)
console.log(derivedRBox.getValue()) // Outputs: 20
```

```typescript
// Method call
const derivedRBox = rbox.map((x) => x * 2)
console.log(derivedRBox.getValue()) // Outputs: 20
```

---

### apply

#### `apply<A, B>(this: RBox<(a: A) => B>, boxValue: RBox<A>): RBox<B>`

Applies a function wrapped in one `RBox` to a value wrapped in another `RBox`.

**Alias**: `<*>`

```typescript
const rboxFn = RBox.pack((x: number) => x + 5)
const rboxValue = RBox.pack(10)
const resultRBox = rboxFn["<*>"](rboxValue)
console.log(resultRBox.getValue()) // Outputs: 15
```

```typescript
// Method call
const resultRBox = rboxFn.apply(rboxValue)
console.log(resultRBox.getValue()) // Outputs: 15
```

---

### flatMap

#### `flatMap<U>(fn: (value: T) => RBox<U>): RBox<U>`

Applies a function returning an `RBox` to the value inside this `RBox` and flattens the result.

**Alias**: `>>=`

```typescript
const rbox = RBox.pack(10)
const derivedRBox = rbox[">>="]((x) => RBox.pack(x * 2))
console.log(derivedRBox.getValue()) // Outputs: 20
```

```typescript
// Method call
const derivedRBox = rbox.flatMap((x) => RBox.pack(x * 2))
console.log(derivedRBox.getValue()) // Outputs: 20
```

---

### subscribe

#### `subscribe(observer: Observer<T>): string`

Subscribes to updates of the `RBox` value.

```typescript
const rbox = RBox.pack(10)
const key = rbox.subscribe((value) => {
  console.log(`Updated value: ${value}`)
})
rbox.setValue((x) => x + 5) // Logs: Updated value: 15
```

---

### unsubscribe

#### `unsubscribe(key: string): void`

Unsubscribes from updates using the subscription key.

```typescript
const rbox = RBox.pack(10)
const key = rbox.subscribe((value) => {
  console.log(`Updated value: ${value}`)
})
rbox.unsubscribe(key)
rbox.setValue((x) => x + 5) // No logs
```

---

### unsubscribeAll

#### `unsubscribeAll(): void`

Unsubscribes all observers from the `RBox`.

```typescript
const rbox = RBox.pack(10)
rbox.subscribe((value) => console.log(`Observer 1: ${value}`))
rbox.subscribe((value) => console.log(`Observer 2: ${value}`))
rbox.unsubscribeAll()
rbox.setValue((x) => x + 5) // No logs
```

---

### detach

#### `detach(): void`

Detaches the `RBox` from all dependencies and stops updates to derived `RBox` instances.

```typescript
const rbox = RBox.pack(10)
const derivedRBox = rbox.map((x) => x * 2)
rbox.detach()
rbox.setValue((x) => x + 5)
console.log(derivedRBox.getValue()) // Outputs: 20 (unchanged)
```

---

## Use Cases

### Reactive Transformations

Automatically update derived `RBox` values when the original changes:

```typescript
const rbox = RBox.pack(100)
const derivedRBox = rbox["<$>"]((x) => x / 2)
rbox.setValue((x) => x + 50)
console.log(derivedRBox.getValue()) // Outputs: 75
```

Learn more about how [`map`](#map) enables reactive transformations.

---

### Combining RBoxes

Combine multiple `RBox` instances using the `<*>` operator:

```typescript
const result = RBox.pack((a: number) => (b: number) => a + b)
  ["<*>"](RBox.pack(10))
  ["<*>"](RBox.pack(20))

console.log(result.getValue()) // Outputs: 30
```

Explore the [`apply`](#apply) method for combining `RBox` instances.

---

### Chaining Reactive Updates

Chain multiple reactive updates into a pipeline:

```typescript
const chainedRBox = RBox.pack(10)
  [">>="]((x) => RBox.pack(x * 2))
  [">>="]((x) => RBox.pack(x + 5))

console.log(chainedRBox.getValue()) // Outputs: 25
```

Discover how [`flatMap`](#flatmap) simplifies chaining reactive updates.

---

## Why Use RBox?

The `RBox` abstraction provides a robust way to manage reactive state with minimal boilerplate. Its reactivity and functional interface make it an ideal tool for scenarios requiring dynamic updates and efficient state propagation.

---

## Next Steps

Explore other abstractions built on `Box` and `RBox`:

- **[Box](/f-box-core/reference/box)**: The foundational abstraction for encapsulating values.
- **[Maybe](/f-box-core/reference/maybe)**: A container for optional values.
- **[Either](/f-box-core/reference/either)**: Encapsulates computations with success or failure.
- **[Task](/f-box-core/reference/task)**: Handles asynchronous workflows.
