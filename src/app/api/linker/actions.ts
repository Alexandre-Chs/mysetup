"use server";

export async function transformUrlToAffiliate(url: string, lang: string) {
  const apiKey = process.env.OPTIMHUB_API_KEY;
  const params = new URLSearchParams({ url, country: lang });
  try {
    const response = await fetch(`https://api.optimhub.com/api/link-builder?${params}`, {
      method: "GET",
      headers: {
        "x-api-key": apiKey as string,
      },
    });
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
