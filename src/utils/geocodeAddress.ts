export async function geocodeAddress(address: string) {
  if (!address) return null;

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`;

  const response = await fetch(url, {
    headers: {
      "User-Agent": "promo-app-vitor/1.0"
    }
  });

  const data = await response.json();

  if (!data || !data[0]) return null;

  return {
    address: data[0].display_name,
    latitude: parseFloat(data[0].lat),
    longitude: parseFloat(data[0].lon),
  };
}
