import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE || "",
  host: process.env.MAIL_HOST || "",
  port: Number(process.env.MAIL_PORT || 465),
  secure: process.env.MAIL_SECURE === 'true',
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  }
});

export async function sendEmail(to: string, subject: string, html: string) {
  const mailOptions = {
    from: process.env.MAIL_FROM_ADDRESS,
    to,
    subject,
    html: emailTemplate(html)
  };

  return transporter.sendMail(mailOptions);
}

function emailTemplate(content: string) {
  return (
    `
    <!DOCTYPE html>
      <html lang="pt-br">

      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Scheduler</title>
        <style type="text/css" rel="stylesheet" media="all">
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

          * {
            color: #74787E;
            font-family: "Inter", sans-serif;
            font-optical-sizing: auto;
          }

          body {
            display: flex;
            flex-direction: column;
            height: 100%;
            margin: 0;
            background-color: #f1f4f6;
          }

          header {
            display: flex;
            justify-content: center;
            padding: 20px 0;
          }
          
          header span {
            color: #2F3133;
            font-weight: 700;
          }

          main {
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: #fff;
            padding: 20px 20%;
          }

          h1 {
            color: #2F3133;
            font-size: 20px;
          }

          footer {
            display: flex;
            justify-content: center;
            padding: 20px 0;
            font-size: 14px;
          }
        </style>

        <style type="text/css" media="only screen and (max-width: 480px)">
          /* Mobile styles */
          h1 {
            margin: 4px 0;
          }

          main {
            align-items: flex-start;
            padding: 30px;
          }
          
        </style>
      </head>

      <body>
        <header>
          <span>Scheduler</span>
        </header>
        <main>
          ${content}
        </main>
      </body>

      </html>
    `
  )
}