import React, { useState, useEffect } from "react";
import SLink from "../components/ui/Link";
import * as dayjs from "dayjs";
import "dayjs/locale/es";
import { useRouter } from "next/router";
import LanguageSwitcher from "../components/ui/LaguageSwitcher";
import translations from "../auth/strings";
import Head from "next/head";
import { Alert } from "react-bootstrap";
import { SVGS } from "../assets/svgs";

const Share = ({ cert }) => {
  const router = useRouter();
  const { query } = router;
  const [strings, setStrings] = useState(translations[query.lang || "en"]);
  const [path, setPath] = useState("");

  useEffect(() => {
    setPath(window.location.href);
  }, []);

  const generateShareUrl = () => {
    const timestamp = new Date().getTime();
    return `${path}?cacheBuster=${timestamp}`;
  };

  return (
    <>
      {query.token !== "" && !cert.status_code ? (
        <>
          <Head>
            <title>{"4Geeks Academy's Student cert"}</title>
            <meta
              property="og:title"
              content={`${strings["Certificate of"]} ${cert.specialty.name} ${strings["to"]} ${cert.user.first_name} ${cert.user.last_name}`}
            />
            <meta
              property="og:description"
              content={cert.specialty.description}
            />
            <meta property="og:image" content={cert.preview_url} />
            <meta property="og:url" content={path} />
            <meta
              name="twitter:title"
              content={`${strings["Certificate of"]} ${cert.specialty.name} ${strings["to"]} ${cert.user.first_name} ${cert.user.last_name}`}
            />
            <meta
              name="twitter:description"
              content={cert.specialty.description}
            />
            <meta name="twitter:image" content={cert.preview_url} />
            <meta
              name="twitter:image:alt"
              content={`${strings["Certificate of"]} ${cert.specialty.name} ${strings["to"]} ${cert.user.first_name} ${cert.user.last_name}`}
            />
            <meta name="twitter:site" content={cert.academy.twitter} />
            <link
              href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap"
              rel="stylesheet"
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Mrs+Saint+Delafield&display=swap"
              rel="stylesheet"
            />
          </Head>
          <div
            className="container-fluid share"
            style={{ maxWidth: "1280px", margin: "0 auto" }}
          >
            <div className="row bg-light-blue">
              <div className="col-md-12 col-12">
                <div className=" mb-3 mt-3 d-flex bg-green-success rounded align-items-center">
                  {SVGS.doesNotExpire}
                  <div className="ml-2">
                    <p className="mb-0">{strings["valid-certificate"]}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-lg-12 col-12 ">
                <img
                  src={cert.preview_url}
                  alt="certificate img "
                  className="certificate-preview img-fluid"
                />
              </div>
            </div>
            <div className="container">
              <div className="row pt-4 pb-4 d-flex justify-content-between">
                <div className="col-md-7 col-12 p-0">
                  <div className="row ">
                    <div className="col-sm-12 col-12 p-0">
                      <h3>
                        {cert.specialty.name ||
                          strings["Full Stack Web Development"]}
                      </h3>
                      <p>{cert.specialty.description}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 col-12 p-0">
                      <div className="d-flex p-0 mb-3">
                        <div className="mr-2">
                          {cert.user.avatar_url ? (
                            <img
                              src={cert.user.avatar_url}
                              width="40px"
                              height="40px"
                            />
                          ) : (
                            SVGS.userIcon
                          )}
                        </div>
                        <div>
                          <p className="mb-0">
                            {cert &&
                              cert.user.first_name + " " + cert.user.last_name}
                          </p>
                          <a
                            className="color-4geeks"
                            target="__blank"
                            href="/#"
                          >
                            {strings["view all certificates"]} {SVGS.arrowRight}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-4 col-12 d-flex p-0">
                      <div className="mr-2">{SVGS.timeIcon}</div>
                      <div>
                        <p className="mb-0">
                          <strong>{strings["Total Hours"]}</strong>
                        </p>
                        <p>
                          {cert &&
                            cert.cohort.syllabus_version.duration_in_hours}{" "}
                          {strings["Hours"]}
                        </p>
                      </div>
                    </div>
                    <div className="col-sm-4 col-12 d-flex p-0">
                      <div className="mr-2">{SVGS.calendarIcon}</div>
                      <div>
                        <p className="mb-0">
                          <strong>{strings["Issued On"]}</strong>
                        </p>
                        <p>
                          {cert &&
                            dayjs(cert.created_at)
                              .locale(query.lang || "en")
                              .format("DD MMMM YYYY")}
                        </p>
                      </div>
                    </div>
                    <div className="col-sm-4 col-12 d-flex p-0">
                      <div className="mr-2">{SVGS.birrete}</div>
                      <div>
                        <p className="mb-0">
                          <strong>{strings["Issuer"]}</strong>
                        </p>
                        <a
                          target="__blank"
                          className="color-4geeks"
                          href={
                            cert.academy.url || "https://4geeksacademy.com/"
                          }
                        >
                          {strings["website"]}
                          {SVGS.arrowRight}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 p-0">
                  <div className="row pb-2">
                    <div className="col-12 mt-3 mt-sm-0 p-0">
                      <p>Share certificate</p>
                    </div>
                    <div
                      className="col-md-12 col-12 d-flex p-0"
                      style={{
                        gap: "50px",
                        width: "200px",
                        justifyContent: "center",
                      }}
                    >
                      <a
                        target="_blank"
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${generateShareUrl()}`}
                      >
                        {SVGS.linkedin}
                      </a>
                      <a
                        target="_blank"
                        href={`https://www.facebook.com/sharer/sharer.php?u=${generateShareUrl()}`}
                      >
                        {SVGS.facebook}
                      </a>
                      <a
                        target="_blank"
                        href={`https://twitter.com/intent/tweet?url=${generateShareUrl()}&text=Texto%20opcional`}
                      >
                        {SVGS.twitter}
                      </a>
                    </div>
                  </div>
                  <div className="separator">
                    <div></div>
                    <div>
                      <span>{strings["or"]}</span>
                    </div>
                    <div></div>
                  </div>
                  <div className="row pb-2">
                    <div className="col-md-12 col-12 d-flex justify-content-center">
                      <a
                        className="bg-4geeks button"
                        href={`/pdf/${query.token}`}
                        target="_blank"
                      >
                        {SVGS.download}
                        {strings["Download PDF"]}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <LanguageSwitcher
              translations={["es", "en"]}
              current={query.lang || "en"}
              onClick={(lang) => {
                router.push(
                  "/[token]?lang=" + lang,
                  `/${query.token}?lang=${lang}`,
                  { query: { lang: lang } }
                );
                setStrings(translations[lang]);
              }}
            />
          </div>
        </>
      ) : (
        <div className="container">
          {cert?.detail ? (
            <Alert variant="danger" className="shadow-one mt-4 d-flex">
              {cert.detail}
            </Alert>
          ) : (
            <Alert variant="danger" className="shadow-one mt-4 d-flex">
              Ooops... Certificate not found or something went wrong ,{" "}
              <SLink to="/find"> go to the find page.</SLink>
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
  const cert = await res.json();
  console.log(cert);
  return {
    props: {
      cert,
    },
  };
}

export default Share;
