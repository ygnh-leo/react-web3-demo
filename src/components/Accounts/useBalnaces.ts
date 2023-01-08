import { BigNumber } from "@ethersproject/bignumber"
import { Web3ReactHooks } from "@web3-react/core"
import { useEffect, useState } from "react"

export default function useBalances(
	provider?: ReturnType<Web3ReactHooks["useProvider"]>,
	accounts?: string[]
) {
	const [balances, setBalances] = useState<BigNumber[] | undefined>()
	useEffect(() => {
		if (provider && accounts?.length) {
			let stale = false
			void Promise.all(
				accounts.map((account) => provider.getBalance(account))
			).then((balances) => {
				if (stale) return
				setBalances(balances)
			})

			return () => {
				stale = true
				setBalances(undefined)
			}
		}
	}, [accounts, provider])
	return balances
}
