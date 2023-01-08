import { Dispatch, SetStateAction, useCallback, useState } from "react"
import { hooks } from "~/components/utils/metaMask"
import { MetaMask } from "@web3-react/metamask"
import { WalletConnect } from "@web3-react/walletconnect"
import { CHAINS, getAddChainParameters, URLS } from "~/constants/chains"
import ChainSelect from "~/components/ConnectWithSelect/ChainSelect"
import { Button } from "@mui/material"

function ConnectWithSelect({ error, setError, connector }: Props) {
	const isActivating = hooks.useIsActivating()
	const isActive = hooks.useIsActive()
	const chainId = hooks.useChainId()

	const isNetwork = false
	const displayDefault = false
	const chainIds = (isNetwork ? Object.keys(URLS) : Object.keys(CHAINS)).map(
		(chainId) => Number(chainId)
	)

	const [desiredChainId, setDesiredChainId] = useState<number>(
		isNetwork ? 1 : -1
	)

	const switchChain = useCallback(
		(desiredChainId: number) => {
			setDesiredChainId(desiredChainId)
			// if we're already connected to the desired chain, return
			if (desiredChainId === chainId) {
				setError(undefined)
				return
			}

			// if they want to connect to the default chain and we're already connected, return
			if (desiredChainId === -1 && chainId !== undefined) {
				setError(undefined)
				return
			}

			if (connector instanceof WalletConnect) {
				connector
					.activate(desiredChainId === -1 ? undefined : desiredChainId)
					.then(() => setError(undefined))
					.catch(setError)
			} else {
				connector
					.activate(
						desiredChainId === -1
							? undefined
							: getAddChainParameters(desiredChainId)
					)
					.then(() => setError(undefined))
					.catch(setError)
			}
		},
		[connector, chainId, setError]
	)

	const onClick = useCallback((): void => {
		setError(undefined)
		if (connector instanceof WalletConnect) {
			connector
				.activate(desiredChainId === -1 ? undefined : desiredChainId)
				.then(() => setError(undefined))
				.catch(setError)
		} else {
			connector
				.activate(
					desiredChainId === -1
						? undefined
						: getAddChainParameters(desiredChainId)
				)
				.then(() => setError(undefined))
				.catch(setError)
		}
	}, [connector, desiredChainId, setError])

	if (error) {
		return (
			<div className={"flex flex-col gap-6"}>
				<ChainSelect
					chainId={desiredChainId}
					switchChain={switchChain}
					displayDefault={displayDefault}
					chainIds={chainIds}
				/>
				<Button variant="contained" onClick={onClick}>
					Try Again?
				</Button>
			</div>
		)
	}

	if (isActive) {
		return (
			<div className={"flex flex-col gap-6"}>
				<ChainSelect
					chainId={desiredChainId === -1 ? -1 : chainId ?? -1}
					switchChain={switchChain}
					displayDefault={displayDefault}
					chainIds={chainIds}
				/>

				<div style={{ marginBottom: "1rem" }} />
				<Button
					variant="contained"
					onClick={() => {
						if (connector?.deactivate) {
							void connector.deactivate()
						} else {
							void connector.resetState()
						}
					}}
				>
					Disconnect
				</Button>
			</div>
		)
	}

	return (
		<div className={"flex flex-col gap-6"}>
			<ChainSelect
				chainId={desiredChainId}
				switchChain={isActivating ? () => {} : switchChain}
				displayDefault={displayDefault}
				chainIds={chainIds}
			/>
			<div style={{ marginBottom: "1rem" }} />
			<Button
				variant="contained"
				onClick={
					isActivating
						? undefined
						: () =>
								connector instanceof WalletConnect
									? connector
											.activate(
												desiredChainId === -1 ? undefined : desiredChainId
											)
											.then(() => setError(undefined))
											.catch(setError)
									: connector
											.activate(
												desiredChainId === -1
													? undefined
													: getAddChainParameters(desiredChainId)
											)
											.then(() => setError(undefined))
											.catch(setError)
				}
				disabled={isActivating}
			>
				Connect
			</Button>
		</div>
	)
}

export default ConnectWithSelect

type Props = {
	error: Error | undefined
	setError: Dispatch<SetStateAction<Error | undefined>>
	connector: MetaMask | WalletConnect
}
