const destinationSeeds = {
  'bali': 'bali-indonesia-tropical',
  'paris': 'paris-france-eiffel',
  'tokyo': 'tokyo-japan-city',
  'santorini': 'santorini-greece-island',
  'new york': 'new-york-usa-city',
  'dubai': 'dubai-uae-luxury',
  'london': 'london-uk-city',
  'rome': 'rome-italy-colosseum',
  'barcelona': 'barcelona-spain-city',
  'amsterdam': 'amsterdam-netherlands',
  'singapore': 'singapore-city-night',
  'maldives': 'maldives-ocean-beach',
  'switzerland': 'switzerland-alps-mountain',
  'thailand': 'thailand-temple-beach',
  'goa': 'goa-india-beach',
  'kerala': 'kerala-india-backwaters',
  'rajasthan': 'rajasthan-india-palace',
}

export const getDestinationPhoto = (destination) => {
  if (!destination) return 'https://picsum.photos/seed/travel/1200/800'
  const key = destination.toLowerCase().split(',')[0].trim()
  const seed = destinationSeeds[key] || key.replace(/\s+/g, '-')
  return `https://picsum.photos/seed/${seed}/1200/800`
}