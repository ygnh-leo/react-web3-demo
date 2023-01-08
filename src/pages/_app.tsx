import type { AppProps } from "next/app"
import { StyledEngineProvider } from "@mui/material/styles"
import "../styles/globals.css"
import { ThemeProvider, createTheme } from "@mui/material/styles"

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
})
export default function App({ Component, pageProps }: AppProps) {
	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={darkTheme}>
				<Component {...pageProps} />
			</ThemeProvider>
		</StyledEngineProvider>
	)
}
