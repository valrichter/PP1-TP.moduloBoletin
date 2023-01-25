const { response } = require("express");
const { sendMail } = require("../helpers/sendMail");
const { enviarTelegram } = require("../helpers/telegram");

const enviarTeleg = async (req, res = response) => {
  try {
    await enviarTelegram(req.body);
    return res.status(200).json({
      ok: true,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
    });
  }
};

const enviarMail = async (req, res = response) => {
  const result = await sendMail(req.body);

  if (result.accepted) {
    return res.status(200).json({
      ok: true,
    });
  }
  return res.status(500).json({
    ok: false,
  });
};

module.exports = {
  enviarMail,
  enviarTeleg,
};
