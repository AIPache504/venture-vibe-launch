import * as z from 'zod';

// Helper function to add https:// to URLs if missing
const normalizeUrl = (url: string): string => {
  if (!url) return '';
  if (url.match(/^https?:\/\//)) return url;
  return `https://${url}`;
};

export const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name muss mindestens 2 Zeichen lang sein.',
  }),
  email: z.string().email({
    message: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
  }),
  company: z.string().min(1, {
    message: 'Bitte geben Sie einen Firmennamen ein.',
  }),
  website: z.string().optional().transform((val) => val ? normalizeUrl(val) : val),
  inquiryType: z.enum([
    'Startup',
    'Investment',
    'Zusammenarbeit / Partnerschaft',
    'Presseanfrage',
    'Sonstiges'
  ]),
  // Startup fields
  phase: z.enum(['Pre-Seed', 'Seed', 'Series A oder später']).optional(),
  location: z.enum(['Germany', 'Europe', 'International']),
  germanState: z.enum(['NRW', 'Andere Bundesländer']).optional(),
  nrwRegion: z.enum(['MS/OS', 'OWL', 'Ruhrgebiet', 'Andere Regionen in NRW']).optional(),
  techFocus: z.enum([
    'Künstliche Intelligenz (KI)',
    'Industrieinnovation',
    'Nachhaltigkeit & Klimatechnologie',
    'Deep Tech',
    'Andere'
  ]).optional(),
  fundingNeed: z.enum(['<500k EUR', '500k–2M EUR', '2M–5M EUR', '>5M EUR']).optional(),
  // Investor fields
  investorType: z.enum([
    'Privatinvestor',
    'Corporate',
    'Institutioneller Investor', 
    'Family Office'
  ]).optional(),
  shortDescription: z.string().max(500, {
    message: 'Die Beschreibung darf maximal 500 Zeichen lang sein.',
  }),
});

export type FormValues = z.infer<typeof formSchema>;
