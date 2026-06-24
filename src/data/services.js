export const SERVICES = [
  {
    id: 'transfer-of-equity',
    title: 'Transfer of Equity',
    desc: 'Add or remove a partner, spouse, or family member from your property title deeds.',
    gif: '/gifs/add_name.gif',
    price: 450,
    subtitle: 'Add or remove a partner, spouse, or family member from property deeds.'
  },
  {
    id: 'death-of-joint-proprietor',
    title: 'Death of a Joint Proprietor',
    desc: 'Remove a deceased joint owner from the land registry title with care and precision.',
    gif: '/gifs/death.gif',
    price: 400,
    subtitle: 'Remove a deceased joint owner from property deeds.'
  },
  {
    id: 'name-change',
    title: 'Name Change on Deeds',
    desc: 'Update your legal name on property records due to marriage, divorce, or deed poll.',
    gif: '/gifs/namechange.gif',
    price: 150,
    subtitle: 'Update your legal name on property records.'
  },
  {
    id: 'tenants-in-common',
    title: 'Tenants in Common',
    desc: 'Change your ownership structure to Tenants in Common to protect your specific share.',
    gif: '/gifs/tennant.gif',
    price: 350,
    subtitle: 'Change ownership structure to protect your specific share.'
  },
  {
    id: 'transfer-of-equity-wills-probate',
    title: 'Transfer of Equity (Wills / Probate)',
    desc: 'Transfer property ownership following probate, inheritance, or estate administration.',
    gif: '/gifs/add_name.gif',
    price: 450,
    subtitle: 'Transfer inherited property to executors or beneficiaries.'
  },
  {
    id: 'first-registration',
    title: 'First Registration',
    desc: 'Register unregistered historic deeds with HM Land Registry for modern legal security.',
    gif: '/gifs/first_registration.gif',
    price: 600,
    subtitle: 'Register unregistered historic deeds with HM Land Registry.'
  },
  {
    id: 'additional-services',
    title: 'Additional Services',
    desc: 'Need something more specific? Our conveyancers support a wide range of property and registry matters—tell us what you are trying to achieve.',
    gif: '/gifs/support.gif',
    price: null,
    subtitle: 'Tailored conveyancing for specific registry matters.'
  }
];

// Helper mapping object for key lookup (e.g. for wizard info)
export const SERVICES_MAP = SERVICES.reduce((acc, s) => {
  acc[s.id] = s;
  return acc;
}, {
  // Alias support for deceased-joint-proprietor route key
  'deceased-joint-proprietor': {
    id: 'deceased-joint-proprietor',
    title: 'Death of a Joint Proprietor',
    desc: 'Remove a deceased joint owner from property deeds.',
    price: 400,
    subtitle: 'Remove a deceased joint owner from property deeds.'
  }
});
