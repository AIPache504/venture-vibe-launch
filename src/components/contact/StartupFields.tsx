
import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface StartupFieldsProps {
  getLocalizedText: (de: string, en: string) => string;
}

export const StartupFields = ({ getLocalizedText }: StartupFieldsProps) => {
  const form = useFormContext();

  return (
    <>
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
    </>
  );
};
