import {createTransport} from "nodemailer";
import {renderFile} from "ejs";
import path from "path";

class EmailService {
    constructor() {
        this.transporter = createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_POST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            }
        });
    }

    async sendMail(receivers = [], subject = '', template, templateParams) {
        await this.transporter.sendMail({
            from: '"Base Admin" <foo@example.com>',
            to: receivers.toString(),
            subject: subject,
            html: await renderFile(path.resolve('./views/' + template), templateParams),
        });
    }
}

export default EmailService;