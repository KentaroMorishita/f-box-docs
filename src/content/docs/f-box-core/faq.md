---
title: F-Box FAQ
description: Frequently Asked Questions about F-Box.
---

### Using `Box`

#### Q: How can I chain multiple transformations with `Box`?

A: You can use the `map` method or the `<$>` operator to chain transformations on a `Box`.

```typescript
const box = Box.pack(10)
  ["<$>"]((x) => x * 2)
  ["<$>"]((x) => x + 5)

console.log(box.getValue()) // Outputs: 25
```

#### Q: Can `Box` handle `null` or `undefined` values?

A: No, `Box` is not designed to handle `null` or `undefined`. For optional values, use `Maybe`.

---

### Using `Maybe`

#### Q: What is the difference between `Maybe.pack` and `Maybe.just`?

A: `Maybe.pack` creates a `None` if the value is `null` or `undefined`, while `Maybe.just` always creates a `Just`, but it requires a non-nullable value.

```typescript
const maybeValue1 = Maybe.pack(null) // None
const maybeValue2 = Maybe.just(42) // Just(42)
const maybeValue3 = Maybe.just(null) // Compilation error
```

#### Q: How do I extract a value from a `Maybe`?

A: Use `getOrElse` to provide a default value in case the `Maybe` is `None`.

```typescript
const maybeValue = Maybe.pack(null)
const result = maybeValue.getOrElse(42) // Outputs: 42
```

---

### Using `Either`

#### Q: When should I use `Either` instead of `Maybe`?

A: Use `Either` when you need to distinguish between two states, such as success (`Right`) and failure (`Left`). `Maybe` is more suitable for optional values without specific failure reasons.

#### Q: How can I chain computations with `Either`?

A: Use the `flatMap` method or the `>>=` operator to chain computations that return new `Either` instances.

```typescript
const result = Either.right(10)
  [">>="]((x) => (x > 5 ? Either.right(x * 2) : Either.left("Too small")))
  [">>="]((x) => Either.right(x + 5))

console.log(result.getValue()) // Outputs: 25
```

---

### Using `Task`

#### Q: How do I combine two `Task` instances?

A: Use the `apply` method or the `<*>` operator to combine `Task` instances.

```typescript
const taskA = Task.pack(1)
const taskB = Task.pack(2)

const combinedTask = Task.pack((a: number) => (b: number) => a + b)
  ["<*>"](taskA)
  ["<*>"](taskB)

combinedTask.run().then(console.log) // Outputs: 3
```

#### Q: Can `Task` handle errors during execution?

A: Yes, use `Task.tryCatch` to handle errors gracefully.

```typescript
const task = Task.tryCatch(
  () => {
    throw new Error("Oops!")
  },
  (error) => `Recovered: ${error.message}`
)

task.run().then(console.log) // Outputs: Recovered: Oops!
```

---

### Using `RBox`

#### Q: How can I subscribe to changes in an `RBox`?

A: Use the `subscribe` method to listen for changes.

```typescript
const rbox = RBox.pack(0)
rbox.subscribe((value) => console.log("New value:", value))

rbox.set(10) // Logs: New value: 10
```

#### Q: Can `RBox` be used in server-side environments?

A: Yes, `RBox` can be used in server-side environments. While `RBox` is optimized for reactive state management in client-side applications, its `subscribe` and `unsubscribe` methods allow you to manage reactive state changes effectively on the server as well.

Example:

```typescript
import { RBox } from "f-box-core";

// Create an RBox instance
const rbox = RBox.create(10);

// Subscribe to state changes
const key = rbox.subscribe((newValue) => {
  console.log("State updated:", newValue);
});

// Update state
rbox.setValue(20);

// Unsubscribe when done
rbox.unsubscribe(key);
```

This demonstrates how `RBox` can be used for reactive state management in server-side logic. Its `subscribe` mechanism works seamlessly in non-browser environments, making it a versatile tool for various scenarios.

---

### General Questions

#### Q: Can I mix F-Box abstractions in the same workflow?

A: Yes, F-Box abstractions like `Box`, `Maybe`, `Either`, and `Task` are designed to work together. For example, you can use `Task` to handle asynchronous flows and wrap the result in `Either` for error handling.
