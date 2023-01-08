import { hooks } from "~/components/utils/metaMask"
import useBalances from "./useBalnaces"
import { formatEther } from "@ethersproject/units"

export default function Accounts() {
	const accounts = hooks.useAccounts()
	const provider = hooks.useProvider()
	const ENSNames = hooks.useENSNames(provider)

	const balances = useBalances(provider, accounts)

	if (accounts === undefined) return <div>no accounts</div>

	const accountsElements = accounts?.map((account, index) => (
		<span key={account}>
			{ENSNames?.[index] ?? account}
			{balances?.[index] ? ` (Ξ${formatEther(balances[index])})` : null}
		</span>
	))

	return (
		<div>
			<span>Accounts:</span>
			{accountsElements}
		</div>
	)
}
