export const OFFICIAL_LINKS = {
  website: 'https://jimkoto.my.id',
  bio: '/bio',
  chat: 'https://chat.jimkoto.my.id',
  whatsapp: 'https://wa.me/6281324412025',
  whatsappDisplay: '0813-2441-2025',
  whatsappInternational: '+62 813-2441-2025',
  email: 'mailto:contact@jimkoto.my.id',
  emailDisplay: 'contact@jimkoto.my.id',
  facebook: 'https://www.facebook.com/100020275965619',
  instagram: 'https://www.instagram.com/james_ssos',
  threads: 'https://www.threads.com/@james_ssos',
  youtube: 'https://www.youtube.com/@akomodanetwork',
  github: 'https://github.com/jimkoto',
  linkedin: 'https://www.linkedin.com/in/jamesisa',
  akomoda: 'https://akomodanetwork.com',
  kotobatuah: 'https://kotobatuah.com',
  aiholistic: 'https://aiholistic.xyz',
  hostinger: 'https://www.hostinger.com/id?REFERRALCODE=akomodanetwork',
} as const;

export interface SocialAccountItem {
  id: string;
  label: string;
  shortCode: string;
  handle: string;
  href: string;
  badgeBg: string;
  badgeText: string;
}

export const OFFICIAL_SOCIAL_ACCOUNTS: SocialAccountItem[] = [
  {
    id: 'facebook',
    label: 'Facebook',
    shortCode: 'FB',
    handle: 'Jim Koto (James Isa)',
    href: OFFICIAL_LINKS.facebook,
    badgeBg: 'bg-[#1877F2]/15 border-[#1877F2]/35 hover:bg-[#1877F2]/25',
    badgeText: 'text-[#60a5fa]',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    shortCode: 'IG',
    handle: '@james_ssos',
    href: OFFICIAL_LINKS.instagram,
    badgeBg: 'bg-[#E1306C]/15 border-[#E1306C]/35 hover:bg-[#E1306C]/25',
    badgeText: 'text-[#f472b6]',
  },
  {
    id: 'threads',
    label: 'Threads',
    shortCode: 'TH',
    handle: '@james_ssos',
    href: OFFICIAL_LINKS.threads,
    badgeBg: 'bg-white/10 border-white/20 hover:bg-white/15',
    badgeText: 'text-slate-100',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    shortCode: 'YT',
    handle: '@akomodanetwork',
    href: OFFICIAL_LINKS.youtube,
    badgeBg: 'bg-[#FF0000]/15 border-[#FF0000]/35 hover:bg-[#FF0000]/25',
    badgeText: 'text-[#f87171]',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    shortCode: 'WA',
    handle: '0813-2441-2025',
    href: OFFICIAL_LINKS.whatsapp,
    badgeBg: 'bg-emerald-500/15 border-emerald-500/35 hover:bg-emerald-500/25',
    badgeText: 'text-emerald-300',
  },
  {
    id: 'chat',
    label: 'Live Chat',
    shortCode: 'CH',
    handle: 'chat.jimkoto.my.id',
    href: OFFICIAL_LINKS.chat,
    badgeBg: 'bg-amber-400/15 border-amber-400/35 hover:bg-amber-400/25',
    badgeText: 'text-amber-300',
  },
  {
    id: 'github',
    label: 'GitHub',
    shortCode: 'GH',
    handle: 'github.com/jimkoto',
    href: OFFICIAL_LINKS.github,
    badgeBg: 'bg-white/10 border-white/20 hover:bg-white/15',
    badgeText: 'text-slate-200',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    shortCode: 'IN',
    handle: 'in/jamesisa',
    href: OFFICIAL_LINKS.linkedin,
    badgeBg: 'bg-[#0A66C2]/15 border-[#0A66C2]/35 hover:bg-[#0A66C2]/25',
    badgeText: 'text-[#60a5fa]',
  },
];
