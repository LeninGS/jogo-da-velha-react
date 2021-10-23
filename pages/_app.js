import { GlobalStyles } from "../Componentes/GlobalStyles";

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <GlobalStyles />
            <Component {...pageProps} />
        </>
    )
}