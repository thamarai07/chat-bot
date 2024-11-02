import emailjs from 'emailjs-com';

export const sendEmail = async (formData) => {
  const serviceID = 'service_paq3v8f';
  const templateID = 'template_5qex0nm';
  const userID = 'Btg5hzDjcevKR4Coo';

  console.log("Send the email++++++");

  try {
    const response = await emailjs.send(serviceID, templateID, formData, userID);
    return response;
  } catch (error) {
    throw new Error('Error sending email: ' + error.message);
  }
};
