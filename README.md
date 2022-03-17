# Experiment with SvelteKit + persisted sessions

- Each request is assigned a `sessionId`
- The `sessionId` is encrypted and stored in a cookie
- The cookie is used to access the session store
- Session stores are persisted using a store, the inteface looks like this:

```typescript
interface Store<T> {
  get(sessionId: string): T
  set(sessionId: string, T data): void
  del(sessionId: string): void
}
```

- The store format is compatible with Grant
