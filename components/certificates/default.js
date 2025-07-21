import { stylesDefault, stylesDefaultPreview } from "../../auth/pdfStyles";
import * as dayjs from 'dayjs';
import 'dayjs/locale/es';

const Certificate = ({ data }) => {
    const setBackground = () =>{
        const {layout} = data;
        if(layout.background_url === undefined || layout.background_url === null) return "https://drive.google.com/uc?export=view&id=18gl9dv57tcuCpYcyyVjnCdOUuSVIparf"
        else return  layout.background_url
    }
    
    const styles = data.forPDF ? stylesDefault : stylesDefaultPreview;
    
    return (
        <div style={styles.body} id={data.html}>
            <div id="header" style={styles.header}>
                <p style={styles.certificate}>{data.strings["Certificate"].toUpperCase()}</p>
                <p style={styles.program}>{data.strings["Program"].toUpperCase()}</p>
                <p style={styles.fullStack}>{"</"}{data.specialty.name.toUpperCase() || data.strings["Full Stack Software Development"].toUpperCase()}{">"}</p>
            </div>
            <div id="to" style={styles.to}>
                <span style={styles.givenTo}>{data.strings["Recognizes that"]}:</span>
            </div>
            <div id="name" style={styles.name} >
                <span style={styles.firstName}>{"</"}{data.profile_academy?.first_name || data.user.first_name}</span>
                <span style={styles.lastName}> {data.profile_academy?.last_name || data.user.last_name}{">"}</span>
            </div>
            <div id="completion" style={styles.completion}>
                <p style={styles.completionDescription}>{data.strings["Has successfully completed"] + " " + data.specialty.name.toUpperCase()}</p>
                <p style={styles.completionDescription}>{data.cohort.syllabus_version.duration_in_hours}  {data.strings["Hours"] || "?"}</p>
                <p style={styles.completionDescription}>{data.academy.name}</p>
                <p style={styles.completionDescription}>{dayjs(data.issued_at || data.cohort.ending_date).locale(data.lang || "en").format("DD MMMM YYYY")}</p>
            </div>
            <div id="signature" style={styles.signature}>
                <p style={styles.sign}>{data.signed_by}</p>
                <p style={styles.signedBy}>{data.signed_by}</p>
                <p style={styles.role}>{data.signed_by_role}</p>
            </div>
            <div id="verify" style={styles.verify}>
                <span style={styles.at}>{data.layout?.foot_note ? `${data.layout.foot_note}` : ''} Verify this certificate at https://certificate.breatheco.de/{data.token}</span>
            </div>
            <img src={setBackground()} style={{width:"100%"}}/>
        </div>
    );
}

export default Certificate;
