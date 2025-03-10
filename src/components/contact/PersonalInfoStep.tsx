
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PersonalInfoStepProps {
  getLocalizedText: (de: string, en: string) => string;
  nextStep: () => void;
  isStartup: boolean;
  isInvestment: boolean;
  isGermany: boolean;
  isNRW: boolean;
}

export const PersonalInfoStep = ({ 
  getLocalizedText, 
  nextStep, 
  isStartup, 
  isInvestment,
  isGermany,
  isNRW
}: PersonalInfoStepProps) => {
  const form = useFormContext();

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{getLocalizedText('Name', 'Name')}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{getLocalizedText('E-Mail', 'Email')}</FormLabel>
            <FormControl>
              <Input type="email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="company"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{getLocalizedText('Unternehmen', 'Company')}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="website"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{getLocalizedText('Website (optional)', 'Website (optional)')}</FormLabel>
            <FormControl>
              <Input {...field} value={field.value || ''} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="inquiryType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{getLocalizedText('Art der Anfrage', 'Inquiry Type')}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Startup">Startup</SelectItem>
                <SelectItem value="Investment">Investment</SelectItem>
                <SelectItem value="Zusammenarbeit / Partnerschaft">
                  {getLocalizedText('Zusammenarbeit / Partnerschaft', 'Collaboration / Partnership')}
                </SelectItem>
                <SelectItem value="Presseanfrage">
                  {getLocalizedText('Presseanfrage', 'Press Inquiry')}
                </SelectItem>
                <SelectItem value="Sonstiges">
                  {getLocalizedText('Sonstiges', 'Other')}
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{getLocalizedText('Standort', 'Location')}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Germany">
                  {getLocalizedText('Deutschland', 'Germany')}
                </SelectItem>
                <SelectItem value="Europe">
                  {getLocalizedText('Europa', 'Europe')}
                </SelectItem>
                <SelectItem value="International">
                  {getLocalizedText('International', 'International')}
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {isGermany && (
        <FormField
          control={form.control}
          name="germanState"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{getLocalizedText('Bundesland', 'German State')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={getLocalizedText('Bitte wählen', 'Please select')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="NRW">
                    {getLocalizedText('NRW', 'NRW')}
                  </SelectItem>
                  <SelectItem value="Andere Bundesländer">
                    {getLocalizedText('Andere Bundesländer', 'Other German States')}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {isGermany && isNRW && (
        <FormField
          control={form.control}
          name="nrwRegion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{getLocalizedText('Region in NRW', 'Region in NRW')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={getLocalizedText('Bitte wählen', 'Please select')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="MS/OS">MS/OS</SelectItem>
                  <SelectItem value="OWL">OWL</SelectItem>
                  <SelectItem value="Ruhrgebiet">
                    {getLocalizedText('Ruhrgebiet', 'Ruhr Area')}
                  </SelectItem>
                  <SelectItem value="Andere Regionen in NRW">
                    {getLocalizedText('Andere Regionen in NRW', 'Other Regions in NRW')}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {isStartup && (
        <FormField
          control={form.control}
          name="phase"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{getLocalizedText('Phase', 'Phase')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={getLocalizedText('Bitte wählen', 'Please select')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Pre-Seed">Pre-Seed</SelectItem>
                  <SelectItem value="Seed">Seed</SelectItem>
                  <SelectItem value="Series A oder später">
                    {getLocalizedText('Series A oder später', 'Series A or later')}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {isStartup && (
        <FormField
          control={form.control}
          name="techFocus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{getLocalizedText('Technologischer Fokus', 'Technology Focus')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={getLocalizedText('Bitte wählen', 'Please select')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Künstliche Intelligenz">
                    {getLocalizedText('Künstliche Intelligenz', 'Artificial Intelligence')}
                  </SelectItem>
                  <SelectItem value="Industrieinnovation (Robotik, Automatisierung, Digitalisierung)">
                    {getLocalizedText('Industrieinnovation (Robotik, Automatisierung, Digitalisierung)', 
                      'Industrial Innovation (Robotics, Automation, Digitalization)')}
                  </SelectItem>
                  <SelectItem value="Nachhaltigkeit & Klimawandel">
                    {getLocalizedText('Nachhaltigkeit & Klimawandel', 'Sustainability & Climate Change')}
                  </SelectItem>
                  <SelectItem value="KI-getriebene Transformation">
                    {getLocalizedText('KI-getriebene Transformation', 'AI-driven Transformation')}
                  </SelectItem>
                  <SelectItem value="Hyperpersonalisierung durch KI">
                    {getLocalizedText('Hyperpersonalisierung durch KI', 'AI Hyperpersonalization')}
                  </SelectItem>
                  <SelectItem value="Agentenökonomie (KI-Agenten)">
                    {getLocalizedText('Agentenökonomie (KI-Agenten)', 'Agent Economy (AI Agents)')}
                  </SelectItem>
                  <SelectItem value="Sichere KI (Governance & Compliance)">
                    {getLocalizedText('Sichere KI (Governance & Compliance)', 'Secure AI (Governance & Compliance)')}
                  </SelectItem>
                  <SelectItem value="Technologiekonvergenz (Biotech, Blockchain, Quantum)">
                    {getLocalizedText('Technologiekonvergenz (Biotech, Blockchain, Quantum)', 
                      'Technology Convergence (Biotech, Blockchain, Quantum)')}
                  </SelectItem>
                  <SelectItem value="KI Infrastruktur & Energie">
                    {getLocalizedText('KI Infrastruktur & Energie', 'AI Infrastructure & Energy')}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {isStartup && (
        <FormField
          control={form.control}
          name="fundingNeed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{getLocalizedText('Finanzierungsbedarf', 'Funding Need')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={getLocalizedText('Bitte wählen', 'Please select')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="<500k EUR">&lt;500k EUR</SelectItem>
                  <SelectItem value="500k–2M EUR">500k–2M EUR</SelectItem>
                  <SelectItem value="2M–5M EUR">2M–5M EUR</SelectItem>
                  <SelectItem value=">5M EUR">&gt;5M EUR</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {isInvestment && (
        <FormField
          control={form.control}
          name="investorType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{getLocalizedText('Investorentyp', 'Investor Type')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={getLocalizedText('Bitte wählen', 'Please select')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Privatinvestor">
                    {getLocalizedText('Privatinvestor', 'Private Investor')}
                  </SelectItem>
                  <SelectItem value="Corporate">
                    {getLocalizedText('Corporate', 'Corporate')}
                  </SelectItem>
                  <SelectItem value="Institutioneller Investor">
                    {getLocalizedText('Institutioneller Investor', 'Institutional Investor')}
                  </SelectItem>
                  <SelectItem value="Family Office">
                    {getLocalizedText('Family Office', 'Family Office')}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <div className="flex justify-end pt-4">
        <Button 
          type="button" 
          onClick={nextStep}
        >
          {getLocalizedText('Weiter', 'Next')}
        </Button>
      </div>
    </div>
  );
};
