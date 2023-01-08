import { CHAINS } from "~/constants/chains"
import { MenuItem, Select } from "@mui/material"

function ChainSelect({
	chainId,
	switchChain,
	displayDefault,
	chainIds,
}: {
	chainId: number
	switchChain: (chainId: number) => void | undefined
	displayDefault: boolean
	chainIds: number[]
}) {
	return (
		<Select
			value={chainId}
			onChange={(event) => {
				switchChain?.(Number(event.target.value))
			}}
			disabled={switchChain === undefined}
		>
			{displayDefault ? <option value={-1}>Default Chain</option> : null}
			{chainIds.map((chainId) => (
				<MenuItem key={chainId} value={chainId}>
					{CHAINS[chainId]?.name ?? chainId}
				</MenuItem>
			))}
		</Select>
	)
}

export default ChainSelect
