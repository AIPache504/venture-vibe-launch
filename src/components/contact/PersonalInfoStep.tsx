
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
}

export const PersonalInfoStep = ({ getLocalizedText, nextStep, isStartup }: PersonalInfoStepProps) => {
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
                    <SelectValue />
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
