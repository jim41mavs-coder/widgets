# Trumpet Widgets – Technical Challenge

A lightweight web application allowing users to create, edit, autosave, and delete text widgets.  
Widgets persist between refreshes using a simple JSON-file backend.

This solution focuses on:

- Clean, minimal UX
- React Query for data-sync
- Debounced autosave
- API routes + filesystem persistence
- Full Jest + RTL test suite
- Clear, maintainable architecture

---

## 🚀 Tech Stack

### **Frontend**

- **Next.js (Pages Router)**
- **TypeScript**
- **React Query** for fetching, caching & optimistic mutations
- **Tailwind CSS** for minimal, clean styling

### **Backend**

- **Next.js API Routes**
- Simple **JSON file database** (`db.json`) for persistence  
  (permitted by challenge instructions)

### **Testing**

- **Jest**
- **React Testing Library**
- Full mocks for React Query + API functions

---

## 🎯 Features

### ✔ Add widgets

Click _Add Widget_ to create a new text widget.

### ✔ Edit widgets

Each widget has its own textarea, fully independent.

### ✔ **Debounced Autosave**

Typing triggers a debounced save to backend:

- Smooth UX
- Prevents spammy network calls
- No data loss

### ✔ Delete widgets

Includes fade-out animation + backend delete.

### ✔ Persisted on refresh

All widgets and text content survive reloads via `db.json`.

### ✔ Clean, minimal UI

Small Tailwind pass for alignment and clarity.

### ✔ Full unit test coverage

Tests for:

- Widget rendering
- Add widget
- Delete widget
- Debounced autosave
- API routes

---

## 📦 Installation

```bash
npm install
```

---

## 🏃 Running the App

### Development Mode

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## 🧪 Testing

Run all tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm test -- --watch
```

### Test Coverage

- **`WidgetItem.test.tsx`** – Tests rendering, editing, and deletion
- **`WidgetList.test.tsx`** – Tests widget list rendering and add functionality
- **`widgets-api.test.ts`** – Tests API route handlers (GET, POST, PUT, DELETE)

All components and API routes are fully covered with unit tests.

---

## 📁 Project Structure

```
trumpet-widgets/
├── src/
│   ├── components/          # React components
│   │   ├── WidgetItem.tsx   # Individual widget with textarea
│   │   └── WidgetList.tsx   # Main widget list container
│   ├── hooks/               # Custom React hooks
│   │   ├── useDebounce.ts   # Debounce hook for autosave
│   │   └── useWidgets.ts    # React Query hooks for widget CRUD
│   ├── pages/               # Next.js pages
│   │   ├── index.tsx        # Main app page
│   │   ├── _app.tsx         # App wrapper with React Query provider
│   │   └── api/
│   │       └── widgets/     # API routes
│   │           ├── index.ts # GET all, POST new widget
│   │           └── [id].ts  # GET, PUT, DELETE by ID
│   ├── styles/
│   │   └── globals.css      # Global styles (Tailwind)
│   ├── tests/               # Jest test files
│   │   ├── WidgetItem.test.tsx
│   │   ├── WidgetList.test.tsx
│   │   └── widgets-api.test.ts
│   └── utils/
│       └── db.ts            # Simple JSON file database helper
├── db.json                  # Persistent widget storage
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

---

## 🎨 Design Decisions

### **Why React Query?**

- Automatic caching and background refetching
- Optimistic updates for instant UI feedback
- Built-in loading/error states
- Reduces boilerplate compared to manual state management

### **Why Debounced Autosave?**

- Prevents network spam while typing
- Maintains smooth user experience
- Configurable delay (500ms by default)

### **Why JSON File Storage?**

- Challenge explicitly permits simple persistence
- No database setup required
- Easy to inspect and debug
- Perfect for this scope

### **Why Pages Router?**

- Simpler API routes setup
- Well-established patterns
- Sufficient for this use case

---

## 🔧 Configuration

### Debounce Delay

Edit the delay in `src/components/WidgetItem.tsx`:

```typescript
const debouncedContent = useDebounce(content, 500); // milliseconds
```

### Port

Change the port in `package.json` or via environment variable:

```bash
PORT=3001 npm run dev
```

---

## 🐛 Known Limitations

- Single JSON file for storage (not production-ready)
- No authentication/authorization
- No pagination (fine for small widget counts)
- No collaborative editing support

---

## 📝 Future Enhancements

- Add real database (PostgreSQL, MongoDB)
- Implement user authentication
- Add widget categories/tags
- Rich text editing support
- Drag-and-drop reordering
- Export/import functionality
- Dark mode

---

## 📄 License

MIT

---

## 👨‍💻 Author

Built as a technical challenge for Trumpet.

---

**Thank you for reviewing!** 🎺
