// Imports
import './home.css';
import type { AppProps } from 'next/app';

// Redux
import { Provider } from "react-redux";
import store from "../store";

// Export
export default function App({ Component, pageProps }: AppProps) {
	return(
		<Provider store={ store }>
			<Component {...pageProps} />
		</Provider>
	);
};