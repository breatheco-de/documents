import React, { useEffect } from "react"
import { Input } from "../../components/ui/form";
import Button from "../../components/ui/Button";
import Router from "next/router";
import { Alert } from "react-bootstrap";

const Find = () => {
    const [token, setToken] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [notify, setNotify] = React.useState({ msg: "", type: "" });
    const [show, setShow] = React.useState(true);

    const onSubmit = async (previewFormat) => {
        try {
            if(!token) return;
            setLoading(true)

            const res = await fetch(`${process.env.NEXT_PUBLIC_BC_HOST}/${token}`)
            const data = res.json()

            if(!res.ok || !data) throw new Error(data.detail)
            Router.push(`/${previewFormat}/${token}`)
        } catch (err) {
            console.error("Error fetching data:", err);
            setNotify({ msg: "An error occurred while fetching data", type: "error" });
        } finally {
            setLoading(false)
        }
    }

    return <div className="container">
        <div className="row text-center">
            <div className="col-12">
                <h1>Looking for a certificate?</h1>
            </div>
            <div className="row mx-auto">
                <Input type="text" required onChange={(e) => setToken(e.target.value)} placeholder="Certificate token" className="mr-1 ml-auto" />
                <Button disabled={loading} className="mr-1" type="submit" onClick={() => onSubmit("pdf")}>{loading ? "Loading" : "Get certificate"}</Button>
                <Button disabled={loading} type="submit" onClick={() => onSubmit("preview")} className="mr-auto">{loading ? "Loading" : "Get HTML"}</Button>
            </div>
        </div>
        {notify.type == "error" ? <Alert onClose={setTimeout(() => setShow(false), 3000)} show={show} variant={"danger"} className="shadow-one mt-4 alert-position">{notify.msg}</Alert> : ""}
    </div>
}
export default Find;