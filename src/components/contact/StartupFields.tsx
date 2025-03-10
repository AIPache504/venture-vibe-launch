
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
import { Input } from '@/components/ui/input';

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
                <SelectItem value="Künstliche Intelligenz (KI)">
                  {getLocalizedText('Künstliche Intelligenz (KI)', 'Artificial Intelligence (AI)')}
                </SelectItem>
                <SelectItem value="Industrieinnovation">
                  {getLocalizedText('Industrieinnovation', 'Industrial Innovation')}
                </SelectItem>
                <SelectItem value="Nachhaltigkeit & Klimatechnologie">
                  {getLocalizedText('Nachhaltigkeit & Klimatechnologie', 'Sustainability & Climate Tech')}
                </SelectItem>
                <SelectItem value="Deep Tech">Deep Tech</SelectItem>
                <SelectItem value="Andere">
                  {getLocalizedText('Andere', 'Other')}
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
