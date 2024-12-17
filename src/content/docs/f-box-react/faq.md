---
title: F-Box React FAQ
description: Frequently Asked Questions about F-Box React, focusing on useBox, useRBox, and useRBoxForm.
---

### Using `useBox`

#### Q: Why is my `useBox` value not updating?

A: `useBox` is designed for **static state management**. If you need reactive or frequently changing values, switch to `useRBox`.

---

#### Q: How can I share a `Box` instance across multiple components?

A: Define the `Box` outside of your components and import it where needed. This ensures a single `Box` instance is shared:

```tsx
// sharedBox.ts
import { Box } from "f-box-core"

export const sharedBox = Box.pack(10)
```

```tsx
// ComponentA.tsx
import { useBox } from "f-box-react"
import { sharedBox } from "./sharedBox"

function ComponentA() {
  const [value] = useBox(sharedBox)
  return <p>Value in Component A: {value}</p>
}
```

```tsx
// ComponentB.tsx
import { useBox } from "f-box-react"
import { sharedBox } from "./sharedBox"

function ComponentB() {
  const [value] = useBox(sharedBox)
  return <p>Value in Component B: {value}</p>
}
```

---

### Using `useRBox`

#### Q: Why is my `useRBox` value not updating?

A: Ensure you are using the `set` function to update the `RBox` value:

```tsx
import { useRBox, set } from "f-box-react"

function Counter() {
  const [count, countBox] = useRBox(0)
  const setCount = set(countBox)

  return <button onClick={() => setCount(count + 1)}>Increment</button>
}
```

---

#### Q: How can I debug unexpected changes in a global `RBox`?

A: Use the `subscribe` method with `console.trace()` to track where updates are coming from:

```tsx
import { RBox } from "f-box-core"

const globalBox = RBox.pack(0)

globalBox.subscribe((newValue) => {
  console.log(`Update globalBox: ${newValue}`)
  console.trace()
})
```

This will log the new value and a trace showing where the change originated.

---

#### Q: How do I combine multiple `RBox` values into a single derived state?

A: Use the `<*>` operator to combine multiple `RBox` values:

```tsx
import { RBox } from "f-box-core"
import { useRBox } from "f-box-react"

function CombinedState() {
  const [x, xBox] = useRBox(5)
  const [y, yBox] = useRBox(10)

  const [sum] = useRBox(() =>
    RBox.pack((a: number) => (b: number) => a + b)
      ["<*>"](xBox)
      ["<*>"](yBox)
  )

  return <p>Sum: {sum}</p>
}
```

---

#### Q: How can I store asynchronous data results into an `RBox`?

A: Use `Task.tryCatch` to fetch data and update the `RBox` with the result:

```tsx
import { useRBox, set } from "f-box-react"
import { Task, Either } from "f-box-core"

const fetchDataTask = Task.tryCatch<Either<string, string>>(
  () => fetch("https://api.example.com/data").then((res) => Either.right(res.json() as string)),
  (error) => Either.left(`Error: ${error.message}`)
)

function DataFetcher() {
  const [data, dataBox] = useRBox<Either<string, string>>(() => Either.left("Loading..."))
  const setData = set(dataBox)

  const loadData = () => fetchDataTask.run().then(setData)

  return (
    <div>
      <button onClick={loadData}>Fetch Data</button>
      {data.match(
        (error) => (
          <p>{error}</p>
        ),
        (value) => (
          <p>Data: {JSON.stringify(value)}</p>
        )
      )}
    </div>
  )
}
```

---

### Using `useRBoxForm`

#### Q: Why aren’t my validation errors showing up in `useRBoxForm`?

A: Make sure your validation function returns the correct structure and that `renderErrorMessages` is used properly:

```tsx
import { useRBoxForm } from "f-box-react"

type Form = { username: string }

const validate = (form: Form) => ({
  username: [() => form.username.length >= 3],
})

function MyForm() {
  const { form, handleChange, renderErrorMessages } = useRBoxForm(
    { username: "" },
    validate
  )

  return (
    <div>
      <input
        value={form.username}
        onChange={(e) => handleChange("username", e.target.value)}
      />
      {renderErrorMessages("username", [
        "Username must be at least 3 characters long.",
      ])}
    </div>
  )
}
```

---

#### Q: How can I debug form state changes in `useRBoxForm`?

A: Use `console.log` to inspect the current form state or validation results. You can also subscribe to changes in the form's underlying `RBox` for advanced debugging.

```tsx
const { form } = useRBoxForm(initialValues, validate)
console.log(form)
```
