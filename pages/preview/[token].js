import React from "react";
import ModernCertificate from "../../components/certificates/modern";
import DefaultCertificate from "../../components/certificates/default";
import strings from "../../auth/strings";
import Head from "next/head";
import Link from "../../components/ui/Link";
import { Alert } from "react-bootstrap";
import { Spinner } from "react-bootstrap";

const Preview = ({ data, query, token }) => {
  if (!data) {
    return <Spinner animation="border" />;
  }
  return (
    <>
      {token !== "" && !data.status_code ? (
        <>
          <Head>
            <link
              href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap"
              rel="stylesheet"
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Mrs+Saint+Delafield&display=swap"
              rel="stylesheet"
            />
          </Head>
          {query.style === "modern" ? (
            <ModernCertificate
              data={{
                ...data,
                token: token,
                lang: query.lang || "en",
                strings: strings[query.lang || "en"],
                html: "html-body",
              }}
            />
          ) : (
            <DefaultCertificate
              data={{
                ...data,
                token: token,
                lang: query.lang || "en",
                strings: strings[query.lang || "en"],
                html: "html-body",
              }}
            />
          )}
        </>
      ) : (
        <div className="container">
          {data?.detail ? (
            <Alert variant="danger" className="shadow-one mt-4 d-flex">
              {data.detail}
            </Alert>
          ) : (
            <Alert variant="danger" className="shadow-one mt-4 d-flex">
              Ooops... Certificate not found or something went wrong ,{" "}
              <Link to="/find">go to the find page.</Link>
            </Alert>
          )}
        </div>
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  const { token } = context.query;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BC_HOST}/${token}`);
  const data = await res.json();
  return {
    props: {
      data: data,
      token: token,
      query: context.query,
    },
  };
}
export default Preview;
