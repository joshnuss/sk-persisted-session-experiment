import { sequence } from '@sveltejs/kit/hooks'
import { DiskStore } from '$lib/stores'
import { handleCookies } from '$lib/handlers/cookies'
import { handlePersistedSession } from '$lib/handlers/persistedSession'

const KEY = 'Cdc.j@Dpsr_QWtVGa.En.VTBhpdTLHqkXKvi.N4yDodbDn-w'

export const handle = sequence(
	handleCookies({key: KEY}),
	handlePersistedSession(DiskStore),
	// TODO: handleOauth()
)
