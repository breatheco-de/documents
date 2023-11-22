import React, { useState, useEffect } from "react";
import Button from "../components/ui/Button";
import SLink from "../components/ui/Link";
import * as dayjs from 'dayjs';
import 'dayjs/locale/es';
import { useRouter } from 'next/router';
import LanguageSwitcher from "../components/ui/LaguageSwitcher";
import translations from "../auth/strings";
import Head from "next/head";
import {Alert} from "react-bootstrap";
import Icon from "../components/ui/Icon";


const Share = ({ cert }) => {
    const router = useRouter();
    const { query } = router;
    const [strings,setStrings] = useState(translations[query.lang || "en"]);
    const [path, setPath] = useState("")
    useEffect(() => {
        setPath(window.location.href);
    },[])
    return (
        <>

        {(query.token !== "" && !cert.status_code) ? <>
            <Head>
                <title>{"4Geeks Academy's Student cert"}</title>
                <meta property="og:title" content={`${strings["Certificate of"]} ${cert.specialty.name} ${strings["to"]} ${cert.user.first_name} ${cert.user.last_name}`} />
                <meta property="og:description" content={cert.specialty.description} />
                <meta property="og:image" content={cert.preview_url}/>
                <meta property="og:url" content={path} />
                <meta name="twitter:title" content={`${strings["Certificate of"]} ${cert.specialty.name} ${strings["to"]} ${cert.user.first_name} ${cert.user.last_name}`} />
                <meta name="twitter:description" content={cert.specialty.description} />
                <meta name="twitter:image" content={cert.preview_url} />
                <meta name="twitter:image:alt" content={`${strings["Certificate of"]} ${cert.specialty.name} ${strings["to"]} ${cert.user.first_name} ${cert.user.last_name}`} />
                <meta name="twitter:site" content={cert.academy.twitter} />
                <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Mrs+Saint+Delafield&display=swap" rel="stylesheet" />
            </Head>
            <div className="container-fluid share">
                <div className="row">
                    <div className="col-md-12 col-lg-12 col-12 bg-dark">
                        <img src={cert.preview_url}alt="certificate img " className="certificate-preview img-fluid"/>
                    </div>
                </div>
                <div className="container">
                    <div className="row pt-4 pb-4">
                        <div className="col-md-auto">
                            <div className="row pb-2">
                                <div className="col-md-12 col-12">
                                    <Button className="w-100"
                                            icon="arrow"
                                            variant="primary"
                                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${path}`}
                                            target={"_blank"}>
                                        <Icon name="linked-in" size="md" />
                                        <Button.Label>{strings["Share on LinkedIn"]}</Button.Label>
                                    </Button>
                                </div>
                            </div>
                            <div className="row pb-2">
                                <div className="col-md-12 col-12">
                                    <Button className="w-100" icon="arrow" variant="primary" to={`/pdf/${query.token}`} target={"_blank"}>
                                        <Icon name="pdf" size="md" style={{float: "unset"}}/>
                                        <Button.Label >{strings["Download PDF"]}</Button.Label>
                                    </Button>
                                </div>
                            </div>
                            <div className="row pb-2">
                                <div className="col-md-12 col-12">
                                    <div className="card shadow-one mb-3 d-flex" >
                                        {cert.user.avatar_url ? <img src={cert.user.avatar_url} width="40px" height="40px" className="mr-3" /> : <Icon name="avatar" size="lg" color="black"/>}
                                        <div>
                                            <p>{cert && cert.user.first_name + " " + cert.user.last_name}</p>
                                            <SLink href="/#" >{strings["view all certificates"]}</SLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 col-12">
                                    <div className="card shadow-one mb-3" >
                                        <div className="card-body">
                                            <h5 className="card-title">{strings["Issuer"]}</h5>
                                            <p>{cert && cert.academy.name}</p>
                                            <SLink href={cert.academy.url || "https://4geeksacademy.com/"}>{strings["website"]}</SLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-12">
                            <div className="row pb-4">
                                <div className="col-md-12 col-12">
                                    <div className="card shadow-one mb-3 d-flex bg-success" >
                                        <Icon name="check-mark" size="lg" />
                                        <div>
                                            <p className="font-weight-bold">{strings["This certificate is valid."]}</p>
                                            <p>{strings["and it does not expires"]}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row pb-4">
                                <div className="col-sm-12 col-12 ">
                                    <h1>{cert.specialty.name || strings["Full Stack Web Development"]}</h1>
                                    <p>{cert.specialty.description}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-4 col-12 ">
                                    <h4>{strings["Total Hours"]}</h4>
                                    <p>{cert && cert.cohort.syllabus_version.duration_in_hours} {strings["Hours"]}</p>
                                </div>
                                <div className="col-sm-4 col-12 ">
                                    <h4>{strings["Issued On"]}</h4>
                                    <p>{cert && dayjs(cert.created_at).locale(query.lang || "en").format("DD MMMM YYYY")}</p>
                                </div>
                                <div className="col-12 col-sm-4">
                                    <h4>{strings["Expired On"]}</h4>
                                    <p>{cert && cert.expires_at == null ? strings["Does not expire"] : dayjs(cert.expires_at).locale(query.lang || "en").format("DD MMMM YYYY")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <LanguageSwitcher
                translations={["es", "en"]}
                current={query.lang || "en"}
                onClick={(lang) => {
                    router.push("/[token]?lang="+ lang, `/${query.token}?lang=${lang}`, { query: { lang: lang } })
                    setStrings(translations[lang])
                    }} />
            </div>
            </>: <div className="container">
                <Alert variant={"danger"} className="shadow-one mt-4 d-flex">Ooops... Certificate not found or something went wrong , <SLink to={"/find"} > go to the find page.</SLink></Alert>
            </div> }
        </>
    )
}

export async function getServerSideProps(context) {
    const { token } = context.query
    const res = await fetch(`${process.env.NEXT_PUBLIC_BC_HOST}/${token}`);
    const cert = await res.json();
    return {
        props: {
            cert
        }
    }
}

export default Share;
