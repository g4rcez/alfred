import mailer from "nodemailer";

const transporter = mailer.createTransport({
    service: "gmail"
});