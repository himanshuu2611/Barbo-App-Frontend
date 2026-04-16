import emailjs from "emailjs-com";

export const sendBookingEmail = async ({
  date,
  time,
  service,
  barber
}) => {
  const email = localStorage.getItem("email");
  const name = email?.split("@")[0];

  if (!email) {
    console.log("No email found ❌");
    return;
  }

  try {
    const res = await emailjs.send(
      "service_6g2r1qb",
      "template_vmu2x1d",
      {
        user_name: name || "Customer",
        date: date,
        time: time,
        barber: barber || "Barber",
        service: service,
        shop: "Barbo Salon",
        to_email: email
      },
      "cb_78zpRzSCzib8_d"
    );

    console.log("Email Sent ✅", res);
  } catch (err) {
    console.log("Email Error ❌", err);
  }
};