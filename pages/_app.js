import { GlobalStyles } from "../Componentes/GlobalStyles";
import "../scss/custom.scss";

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <GlobalStyles />
            <Component {...pageProps} />
        </>
    )
}