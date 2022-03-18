import { encryptString, decryptString } from 'string-cipher';
import { randomBytes } from 'crypto'

function parseSessionId(event) {
	const cookieString = event.request.headers.get('cookie')

	if (!cookieString) return

	const cookies = Object.fromEntries(cookieString
		.split(';')
		.map(s => s.trim().split('=')))

	return cookies['sid']
}

function generateSessionId() {
	return randomBytes(48).toString('hex')
}

export function handleCookies(options = {}) {
	if (!options.key) {
		throw 'A key is required'
	}

	return async ({event, resolve}) => {
		const encrypted = parseSessionId(event)
		let sessionId = null

		if (encrypted) {
			sessionId = await decryptString(encrypted, options.key)
			console.log('cookie found')
		} else {
			console.log('cookie not found, generating sessionId...')
		}

		event.locals.sessionId = sessionId || generateSessionId()

		const response = await resolve(event)

		if (event.locals.sessionId != sessionId) {
			const cookieValue = await encryptString(event.locals.sessionId, options.key)
			// TODO: Add expiration or max-age and possibly domain
			response.headers.append('set-cookie', `sid=${cookieValue}; Secure; HttpOnly; Expires=2025-01-01`)
		}

		return response
	}
}

