✅ Features Covered
✅ Add/Modify key-value pairs with nested key support

✅ Handle array values (with tab)

✅ Auto-detect and parse string input like hello or 123

✅ Paste full JSON and preview merge

✅ Toggle for paste section

✅ JSON validation

✅ Copy to clipboard

✅ Clear all data

✅ Styled using Backstage’s <Page themeId="tool">

###

# JSON Modifier Tool (React + Backstage)

A React-based UI component that allows users to dynamically build, modify, and validate a JSON object. This tool is designed to be embedded in a [Backstage](https://backstage.io/) plugin using the `<Page themeId="tool">` layout.

---

## ✨ Features

- 🔑 Add/Modify JSON object entries using dot-notated keys (e.g. `user.profile.name`)
- 📚 Support for primitive values (`"hello"`, `123`, `true`, etc.) without requiring JSON quoting
- 📦 Add/modify JSON values that are arrays (e.g. `["dev", "ops"]`)
- 🔁 Merge full JSON input using paste functionality (with preview & confirm)
- ✅ Validate full JSON structure
- 📋 Copy final JSON output to clipboard
- ❌ Clear all input/state with one button
- 🎨 Uses Material UI + Backstage components

---

## 🧪 Example Use Cases

- Quickly prototype JSON configuration objects
- Build IAM roles, permissions, or Terraform variable objects interactively
- Safely validate nested JSON before syncing to Git/GitOps pipeline
- Enable product/non-engineering teams to generate JSON configs via UI

---

## 🧰 Requirements

- Backstage plugin environment
- React 17+ or 18+
- Material UI (`@mui/material`)
- Backstage core components (`@backstage/core-components`)

---

## 🚀 How to Use

### 1. Embed the Component

```tsx
import { ExampleComponent } from './components/ExampleComponent';

export const MyCustomPage = () => {
  return <ExampleComponent />;
};
```

### 💡 Tips
Nested keys like foo.bar.baz are supported — objects will be created dynamically.

Raw strings like hello will be automatically converted to "hello" internally.

Merge preview ensures that full JSON pastes don’t overwrite accidentally.

Validation checks if current JSON can be safely serialized.

Clipboard copy works in most modern browsers.

### 📂 Folder Structure Suggestion
css
Copy
Edit
your-plugin/
  └── src/
      └── components/
          └── ExampleComponent.tsx
      └── README.md