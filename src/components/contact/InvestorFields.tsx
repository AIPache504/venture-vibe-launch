
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

interface InvestorFieldsProps {
  getLocalizedText: (de: string, en: string) => string;
}

export const InvestorFields = ({ getLocalizedText }: InvestorFieldsProps) => {
  const form = useFormContext();

  return (
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
  );
};
