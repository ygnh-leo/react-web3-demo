import { memo } from "react"
import useStatus from "~/components/Status/useSataus"

function Status({ error }: { error: Error | undefined }) {
	const status = useStatus(error)
	return <p>{status}</p>
}

export default memo(Status)
