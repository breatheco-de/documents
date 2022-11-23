import { stylesDefault } from "../../auth/pdfStyles";
import * as dayjs from 'dayjs';
import 'dayjs/locale/es';

const Certificate = ({ data }) => {
    const setBackground = () =>{
        const {layout} = data;
        if(layout.background_url === undefined || layout.background_url === null) return "https://drive.google.com/uc?export=view&id=18gl9dv57tcuCpYcyyVjnCdOUuSVIparf"
        else return  layout.background_url
    }
    return (
        <div style={stylesDefault.body} id={data.html}>
            <div id="header" style={stylesDefault.header}>
                <p style={stylesDefault.certificate}>{data.strings["Certificate"].toUpperCase()}</p>
                <p style={stylesDefault.program}>{data.strings["Program"].toUpperCase()}</p>
                <p style={stylesDefault.fullStack}>{"</"}{data.specialty.name.toUpperCase() || data.strings["Full Stack Software Development"].toUpperCase()}{">"}</p>
            </div>
            <div id="to" style={stylesDefault.to}>
                <span style={stylesDefault.givenTo}>{data.strings["Recognizes that"]}:</span>
            </div>
            <div id="name" style={stylesDefault.name} >
                <span style={stylesDefault.firstName}>{"</"}{data.profile_academy?.first_name || data.user.first_name}</span>
                <span style={stylesDefault.lastName}> {data.profile_academy?.last_name || data.user.last_name}{">"}</span>
            </div>
            <div id="completion" style={stylesDefault.completion}>
                <p style={stylesDefault.completionDescription}>{data.strings["Has successfully completed"] + " " + data.specialty.name.toUpperCase()}</p>
                <p style={stylesDefault.completionDescription}>{data.cohort.syllabus_version.duration_in_hours} {data.strings["Hours"] || "?"}</p>
                <p style={stylesDefault.completionDescription}>{data.academy.name}</p>
                <p style={stylesDefault.completionDescription}>{dayjs(data.issued_at || data.cohort.ending_date).locale(data.lang || "en").format("DD MMMM YYYY")}</p>
            </div>
            <div id="signature" style={stylesDefault.signature}>
                <p style={stylesDefault.sign}>{data.signed_by}</p>
                <p style={stylesDefault.signedBy}>{data.signed_by}</p>
                <p style={stylesDefault.role}>{data.signed_by_role}</p>
            </div>
            <div id="verify" style={stylesDefault.verify}>
                <span style={stylesDefault.at}>{data.layout?.foot_note ? `${data.layout.foot_note}` : ''} Verify this certificate at https://certificate.breatheco.de/{data.token}</span>
            </div>
            <img src={setBackground()} style={{width:"100%"}}/>
        </div>
    );
}

export default Certificate;
