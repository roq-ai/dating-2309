interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: [],
  tenantRoles: ['End User', 'Business Owner'],
  tenantName: 'Organization',
  applicationName: 'dating',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: [
    "Manage organization's profile",
    'Customize match criteria based on preferences and location',
    'Utilize real-time messaging functionality',
    'Express interest in potential matches through a swiping or liking system',
  ],
};
