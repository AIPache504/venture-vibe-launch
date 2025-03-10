
import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface BasicInfoFieldsProps {
  getLocalizedText: (de: string, en: string) => string;
}

export const BasicInfoFields = ({ getLocalizedText }: BasicInfoFieldsProps) => {
  const form = useFormContext();

  return (
    <>
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
              <Input {...field} value={field.value || ''} placeholder="example.com" />
            </FormControl>
            <FormDescription>
              {getLocalizedText(
                'Einfach Domain eingeben, https:// wird automatisch hinzugefügt.',
                'Simply enter domain, https:// will be added automatically.'
              )}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
