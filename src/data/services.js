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
    id: 'removal-of-restriction',
    title: 'Removal of a Restriction',
    desc: 'Clear outdated charges, restrictions, or cautions from your property title.',
    gif: '/gifs/tennant.gif',
    price: 350,
    subtitle: 'Clear outdated charges, cautions, or restrictions.'
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
    id: 'applying-for-restriction',
    title: 'Applying for a Restriction',
    desc: 'Protect your interest or trust ownership to prevent unauthorized property sale.',
    gif: '/gifs/tennant.gif',
    price: 350,
    subtitle: 'Protect your trust or financial interest on property titles.'
  },
  {
    id: 'first-registration',
    title: 'First Registration',
    desc: 'Register unregistered historic deeds with HM Land Registry for modern legal security.',
    gif: '/gifs/first_registration.gif',
    price: 600,
    subtitle: 'Register unregistered historic deeds with HM Land Registry.'
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
