
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

interface LocationFieldsProps {
  getLocalizedText: (de: string, en: string) => string;
  isGermany: boolean;
  isNRW: boolean;
}

export const LocationFields = ({ getLocalizedText, isGermany, isNRW }: LocationFieldsProps) => {
  const form = useFormContext();

  return (
    <>
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
    </>
  );
};
