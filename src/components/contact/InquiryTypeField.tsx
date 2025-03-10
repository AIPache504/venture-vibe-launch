
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

interface InquiryTypeFieldProps {
  getLocalizedText: (de: string, en: string) => string;
}

export const InquiryTypeField = ({ getLocalizedText }: InquiryTypeFieldProps) => {
  const form = useFormContext();

  return (
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
  );
};
