import emailjs from 'emailjs-com';

export default function sendEmail(articleUrl) {
  const templateParams = {
    to_name: 'Wrytte Admin',
    message: `https://wrytte.netlify.app${articleUrl}`,
  };

  emailjs.send(
    process.env.REACT_APP_EMAIL_SERVICE_ID,
    process.env.REACT_APP_EMAIL_TEMPLATE_ID,
    templateParams,
    process.env.REACT_APP_EMAIL_USER_ID,
  )
    .then(() => console.log('Email sent succesfully.'))
    .catch((err) => console.log(err));
}
