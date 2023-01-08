import { useMemo } from "react"
import { hooks } from "~/components/utils/metaMask"

export default function useStatus(error?: Error | undefined) {
	const isActivating = hooks.useIsActivating()
	const isActive = hooks.useIsActive()

	return useMemo(() => {
		if (error) {
			return `🔴 ${error.name ?? "Error"}${
				error.message ? `: ${error.message}` : ""
			}`
		}
		if (isActivating) {
			return "🟡️ Activating..."
		}
		if (isActive) {
			return "🟢 Active"
		}
		return "⚪️ Disconnected"
	}, [error, isActivating, isActive])
}
