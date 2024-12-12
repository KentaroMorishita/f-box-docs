---
title: Task
description: Detailed API reference for the Task abstraction in F-Box.
---

`Task` is an abstraction in F-Box that represents asynchronous computations. It encapsulates functions returning promises, enabling composable and error-safe asynchronous workflows.

---

The `Task` abstraction simplifies the management of asynchronous code, offering a functional interface for transforming, chaining, and handling errors in computations.

### Key Features

- **Encapsulation**: Wraps asynchronous computations into a `Task` object.
- **Composability**: Provides operators and methods (`map`, `flatMap`, `apply`) for chaining computations.
- **Error Handling**: Includes utilities like `tryCatch` and `tryTask` for managing errors.
- **Functional Interface**: Adheres to functional programming principles, ensuring immutability and composability.

---

## Creating a Task

The `Task` abstraction provides multiple ways to create tasks:

- **From a Promise**: Use `Task.from` to encapsulate a promise.
- **From a Value**: Use `Task.pack` to lift a value into a resolved `Task`.
- **Error Handling**: Use `Task.tryCatch` to create a `Task` with custom error recovery logic.

### Example

```typescript
import { Task } from "f-box-core"

// Create a Task from a Promise
const fetchData = Task.from(() => fetch("/data").then((res) => res.json()))

// Create a Task from a Value
const valueTask = Task.pack(42)

// Handle errors with tryCatch
const safeTask = Task.tryCatch(
  () => fetch("/data").then((res) => res.json()),
  (error) => ({ error: true, message: error.message })
)
```

---

## Supported Operators

The `Task` abstraction provides several operators for working with asynchronous computations:

- `<$>`: Alias for `map`. Transforms the result of a `Task`.
- `<*>`: Alias for `apply`. Applies a `Task` containing a function to a `Task` containing a value.
- `>>=`: Alias for `flatMap`. Chains computations that return new `Task` instances.

For detailed usage, see [API Methods](#api-methods).

---

## API Methods

### Task.from

#### `Task.from<T>(fn: () => Promise<T>): Task<T>`

Creates a `Task` from a promise-returning function.

```typescript
const fetchTask = Task.from(() => fetch("/data").then((res) => res.json()))
```

---

### Task.pack

#### `Task.pack<T>(value: T): Task<T>`

Creates a `Task` that resolves immediately with the given value.

`Task.pack` is a shorthand for `Task.from(() => Promise.resolve(value))`. It provides a quick way to lift a value into a `Task` for immediate resolution.

```typescript
const valueTask = Task.pack(42)
// Equivalent to:
const equivalentTask = Task.from(() => Promise.resolve(42))

valueTask.run().then(console.log) // Outputs: 42
```

---

### Task.tryCatch

#### `Task.tryCatch<T>(fn: () => T | Promise<T>, onError: (error: any) => T | Promise<T>): Task<T>`

Creates a `Task` that handles errors using a recovery function.

```typescript
const safeTask = Task.tryCatch(
  () => fetch("/data").then((res) => res.json()),
  (error) => ({ error: true, message: error.message })
)
safeTask.run().then(console.log)
```

---

### Task.tryTask

#### `Task.tryTask<T>(fn: () => T | Promise<T>): Task<T>`

Creates a `Task` that propagates any errors that occur.

```typescript
const riskyTask = Task.tryTask(() => {
  if (Math.random() > 0.5) throw new Error("Random error")
  return "Success"
})
```

---

### map

#### `map<U>(fn: (value: T) => U): Task<U>`

Transforms the result of a `Task` using the provided function.

**Alias**: `<$>`

```typescript
const task = Task.pack(10)
const transformed = task["<$>"]((x) => x * 2)
transformed.run().then(console.log) // Outputs: 20
```

```typescript
// Method call
const transformed = task.map((x) => x * 2)
transformed.run().then(console.log) // Outputs: 20
```

---

### flatMap

#### `flatMap<U>(fn: (value: T) => Task<U>): Task<U>`

Chains another `Task` based on the result of this `Task` and flattens the result.

**Alias**: `>>=`

```typescript
const fetchTask = Task.pack(10)
const chainTask = fetchTask[">>="]((x) => Task.pack(x * 2))
chainTask.run().then(console.log) // Outputs: 20
```

```typescript
// Method call
const chainTask = fetchTask.flatMap((x) => Task.pack(x * 2))
chainTask.run().then(console.log) // Outputs: 20
```

---

### apply

#### `apply<U, V>(this: Task<(value: U) => V>, taskValue: Task<U>): Task<V>`

Applies a `Task` containing a function to a `Task` containing a value and returns a new `Task`.

**Alias**: `<*>`

```typescript
const taskFn = Task.pack((x: number) => x * 2)
const taskValue = Task.pack(10)
const resultTask = taskFn["<*>"](taskValue)
resultTask.run().then(console.log) // Outputs: 20
```

```typescript
// Method call
const resultTask = taskFn.apply(taskValue)
resultTask.run().then(console.log) // Outputs: 20
```

---

### run

#### `run(): Promise<T>`

Executes the asynchronous computation and returns a `Promise` resolving with the result.

```typescript
const task = Task.pack(42)
task.run().then(console.log) // Outputs: 42
```

---

## Helper Methods

### Task.isTask

#### `Task.isTask(value: any): boolean`

Checks if a given value is a `Task`.

```typescript
const task = Task.pack(42)
console.log(Task.isTask(task)) // Outputs: true
console.log(Task.isTask(42)) // Outputs: false
```

---

## Use Cases

### Transforming Asynchronous Results

Transform the result of an asynchronous computation:

```typescript
const task = Task.pack(10)
  ["<$>"]((x) => x * 2)
  ["<$>"]((x) => x + 5)

task.run().then(console.log) // Outputs: 25
```

This demonstrates how to:

1. Use `Task.pack` to wrap an initial value.
2. Apply successive transformations to the value using `["<$>"]`.

---

### Error Recovery

Handle errors with recovery logic:

```typescript
const task = Task.tryCatch(
  () => {
    throw new Error("Oops!") // Simulate an exception
  },
  (error) => `Recovered from: ${error.message}` // Recovery logic
)

task.run().then(console.log) // Outputs: Recovered from: Oops!
```

This demonstrates how to:

1. Use `Task.tryCatch` to execute a computation that might fail.
2. Provide a fallback recovery function to handle errors gracefully.

---

### Chaining Asynchronous Computations

Chain multiple asynchronous operations, starting from a context value using `Task.pack`:

```typescript
const fetchUser = (id: number): Task<{ id: number; name: string }> =>
  Task.tryCatch(
    () =>
      fetch(`/user/${id}`).then((res) => {
        if (!res.ok) throw new Error("User not found")
        return res.json()
      }),
    (error) => ({ id: -1, name: `Error: ${error.message}` })
  )

const fetchOrders = (userId: number): Task<{ orders: string[] }> =>
  Task.tryCatch(
    () =>
      fetch(`/orders?userId=${userId}`).then((res) => {
        if (!res.ok) throw new Error("Failed to fetch orders")
        return res.json()
      }),
    () => ({ orders: [] }) // Fallback: Return an empty order list
  )

const userTask = Task.pack(1) // Start with a user ID
  [">>="](fetchUser) // Fetch user details
  [">>="]((user) => fetchOrders(user.id)) // Fetch orders for the user

userTask.run().then(console.log)
```

This demonstrates how to:

1. Start with a context value using `Task.pack`.
2. Chain asynchronous operations using `["">>="]` to handle sequential dependencies.
3. Use `Task.tryCatch` to ensure resilience in each step.

---

### Running Parallel Asynchronous Tasks

Execute multiple asynchronous operations in parallel and combine their results:

```typescript
const fetchUsers = Task.from<User[]>(() =>
  fetch("/users").then((res) => res.json())
)
const fetchPosts = Task.from<Post[]>(() =>
  fetch("/posts").then((res) => res.json())
)

const combinedTask = Task.pack((users: User[]) => (posts: Post[]) => ({
  users,
  posts,
}))
  ["<*>"](fetchUsers)
  ["<*>"](fetchPosts)

combinedTask.run().then(console.log)
```

This demonstrates how to:

1. Use `Task.from` to encapsulate multiple asynchronous operations.
2. Combine the results of parallel computations using `["<*>"]`.
3. Run the resulting `Task` to execute all operations concurrently and retrieve the combined results.

---

## Why Use Task?

The `Task` abstraction provides a powerful framework for managing asynchronous workflows. Its composable interface simplifies error handling, transformation, and chaining, making it an essential tool for modern JavaScript applications.

---

## Next Steps

Explore other abstractions in F-Box:

- **[Box](./box)**: A foundational abstraction for encapsulating values.
- **[RBox](./rbox)**: A reactive extension of `Box`.
- **[Maybe](./maybe)**: Represents optional values.
- **[Either](./either)**: Represents computations with success or failure.