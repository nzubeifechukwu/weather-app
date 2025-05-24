export async function getWeather(location) {
  const apiKey = "B2Q7QEGY8UGHP7KY4RLHXNEPR";
  const baseUrl =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

  try {
    const response = await fetch(`${baseUrl}${location}?key=${apiKey}`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    return {
      description: data.currentConditions.conditions,
      humidity: data.currentConditions.humidity,
      temperature: data.currentConditions.temp,
      location: data.resolvedAddress,
      timezone: data.timezone,
      icon: data.currentConditions.icon,
    };
  } catch (error) {
    console.error(error.message);
  }
}
