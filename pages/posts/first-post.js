import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
import Layout from "../../components/layout";

export default function FirstPost() {
    return (
        <Layout>
            <Head>
                <title>First Post</title>
            </Head>
            <h1>first post</h1>
            <h2>
                <Link href="/">
                    <a> back to home</a>
                </Link>
            </h2>
        </Layout>
    )
}