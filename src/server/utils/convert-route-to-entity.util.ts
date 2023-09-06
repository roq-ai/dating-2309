const mapping: Record<string, string> = {
  'location-preferences': 'location_preference',
  matches: 'match',
  organizations: 'organization',
  'social-medias': 'social_media',
  users: 'user',
  verifications: 'verification',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
