import fs from 'fs/promises'

export default DiskStore = {
	async get(sid) {
		const path = `.sessions/${sid}.json`

		const exists = await fs.stat(path)
			.then(() => true)
			.catch(() => false)

		if (!exists) {
			return {}
		}

		const data = await fs.readFile(path, 'utf8')

		return JSON.parse(data)
	},
	async set(sid, session) {
		const path = `.sessions/${sid}.json`
		const data = JSON.stringify(session)

		await fs.writeFile(path, data, 'utf8')
	},
	async del(sid) {
		const path = `.sessions/${sid}.json`

		await fs.rm(path)
	}
}

