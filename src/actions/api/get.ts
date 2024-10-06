"use server";

export async function transformUrlToAffiliate(
  url: string,
  country: string = "FR"
) {
  const apiKey = process.env.OPTIMHUB_API_KEY;
  const params = new URLSearchParams({ url, country });
  try {
    const response = await fetch(
      `https://api.optimhub.com/api/link-builder?${params}`,
      {
        method: "GET",
        headers: {
          "x-api-key": apiKey as string,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.url;
  } catch (e) {
    console.error("Error while transform url:", e);
    return undefined;
  }
}

export async function getCountry() {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    const userIP = data.ip;

    const countryResponse = await fetch(`https://ipapi.co/${userIP}/country/`);
    return await countryResponse.text();
  } catch (error) {
    console.error("Error fetching user country:", error);
  }
}
