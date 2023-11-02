// import { useContext } from "react";
import { useContext } from "react";
import { CoinOpContext, CoinOpProvider } from "coinopreact";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Authorization, AuthorizationContext } from "coinopreact/auth.context";

const App = () => {
	return (
		<>
			<CoinOpProvider GAME_SLUG="DCF" API_URL="https://example.com">
				{/* The API is will not work in this case, you should be given an approved API URL. */}
				<Demo />
			</CoinOpProvider>
		</>
	);
};

const Demo = () => {
	const CoinOp = useContext(CoinOpContext);
	const { signIn, signOut, auth } = useContext(AuthorizationContext);

	const runAndLog = async (func: unknown) => {
		console.log(await func);
	};

	return (
		<>
			<WalletMultiButton />
			<button onClick={() => console.log(CoinOp)}>Log Op</button>
			<button onClick={() => signIn(CoinOp.wallet, "")}>Sign In</button>
			<button onClick={() => signOut()}>Sign Out</button>
			<button onClick={() => console.log(auth)}>Log Auth</button>
			<button
				onClick={() =>
					runAndLog(CoinOp.initCoinOp(0.05, "H", auth as Authorization))
				}
			>
				Init CoinOp
			</button>
			<button
				onClick={() =>
					runAndLog(
						CoinOp.processCoinOp(
							CoinOp.currentCoinOp?.payload.coinOp.id ??
								prompt("CoinOpId") ??
								"",
							auth as Authorization
						)
					)
				}
			>
				Process CoinOp
			</button>
			<button
				onClick={() =>
					runAndLog(
						CoinOp.finalizeCoinOp(
							CoinOp.currentCoinOp?.payload.coinOp.id ??
								prompt("CoinOpId") ??
								"",
							auth as Authorization
						)
					)
				}
			>
				Finalize CoinOp
			</button>
			<button
				onClick={() => runAndLog(CoinOp.recoverCoinOp(auth as Authorization))}
			>
				Recover CoinOp
			</button>
		</>
	);
};

export default App;
