import nodemailer from 'nodemailer';
const email = useSelector((state: RootState) => state.user.email);

const sendEmailNotification = (userEmail, formData) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
      user: 'carinrent@mail.ru', // Замените на свой адрес электронной почты
      pass: '03031963mama', // Замените на свой пароль от почты
    },
  });

  const mailOptions = {
    from: {email},
    to: userEmail,
    subject: 'Уведомление о аренде',
    html: `
      <h1>Уведомление о аренде</h1>
      <p>Город: ${formData.city}</p>
      <p>Дата аренды: ${formData.rentalDate}</p>
      <p>Номер телефона: ${formData.phoneNumber}</p>
      <p>Способ оплаты: ${formData.paymentMethod}</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error(error);
    }
    console.log('Email sent: ' + info.response);
  });
};

export default sendEmailNotification;
