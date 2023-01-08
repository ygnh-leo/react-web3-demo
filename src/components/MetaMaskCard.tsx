import { metaMask } from "~/components/utils/metaMask"
import { useEffect, useState } from "react"
import cn from "classnames"
import { getName } from "~/components/utils/getName"
import Status from "~/components/Status"
import Accounts from "~/components/Accounts"
import ConnectWithSelect from "~/components/ConnectWithSelect"

export default function MetaMaskCard() {
	const [error, setError] = useState<Error | undefined>(undefined)

	useEffect(() => {
		metaMask.connectEagerly().catch((err) => {
			console.error(err || "MetaMask is not installed")
		})
	}, [])

	return (
		<div
			className={cn(
				"rounded-2xl border-8 border-solid border-amber-500",
				"mt-8 h-80 w-80 p-6",
				"flex flex-col gap-2"
			)}
		>
			<p className={"text-xl font-bold"}>{getName(metaMask)}</p>
			<Status error={error} />
			<Accounts />
			<ConnectWithSelect
				error={error}
				setError={setError}
				connector={metaMask}
			/>
		</div>
	)
}
