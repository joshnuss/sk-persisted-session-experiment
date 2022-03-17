export function get({locals}) {
	if (!locals.session.counter) {
		locals.session.counter = 0
	}

	locals.session.counter++

	return {
		status: 200,
		body: {
			counter: locals.session.counter
		}
	}
}
