export function handlePersistedSession(store) {
	return async ({event, resolve}) => { 
		const { sessionId } = event.locals

		if (!sessionId) {
			throw 'Missing the sessionId. Did you configure the cookie handler?'
		}

		const data = await store.get(sessionId)
		event.locals.session = {...data || {}}

		const response = await resolve(event)

		if (JSON.stringify(data) != JSON.stringify(event.locals.session)) {
			store.set(sessionId, event.locals.session)
		}

		return response
	}
}

