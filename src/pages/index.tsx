import MetaMaskCard from "~/components/MetaMaskCard"

export default function Home() {
	return (
		<div className={"flex flex-col gap-2 p-4"}>
			<h1 className={"text-3xl font-bold"}>MetaMask 钱包 Demo</h1>
			<MetaMaskCard />
		</div>
	)
}
