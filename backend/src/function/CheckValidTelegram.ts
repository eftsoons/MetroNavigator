import { createHmac } from "crypto";

const token = process.env.TELEGRAM_BOT!;

function CheckValidTelegram(initData: string | undefined) {
  try {
    const urlSearchParams = new URLSearchParams(initData);
    const data = Object.fromEntries(urlSearchParams.entries());

    const checkString = Object.keys(data)
      .filter((key) => key !== "hash")
      .map((key) => `${key}=${data[key]}`)
      .sort()
      .join("\n");

    const secretKey = createHmac("sha256", "WebAppData").update(token).digest();

    const signature = createHmac("sha256", secretKey)
      .update(checkString)
      .digest("hex");

    return data.hash === signature;
  } catch {
    return false;
  }
}

export default CheckValidTelegram;
