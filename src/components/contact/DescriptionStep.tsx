
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
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { useContactForm } from './ContactFormProvider';

interface DescriptionStepProps {
  getLocalizedText: (de: string, en: string) => string;
}

export const DescriptionStep = ({ getLocalizedText }: DescriptionStepProps) => {
  const form = useFormContext();
  const { setFormStep, isSubmitting } = useContactForm();

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="shortDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {getLocalizedText('Kurzbeschreibung', 'Short Description')}
            </FormLabel>
            <FormControl>
              <Textarea 
                {...field} 
                placeholder={
                  getLocalizedText(
                    'Beschreiben Sie kurz Ihr Anliegen (max. 500 Zeichen)', 
                    'Briefly describe your inquiry (max. 500 characters)'
                  )
                }
                disabled={isSubmitting}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex justify-between pt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => setFormStep(1)}
          disabled={isSubmitting}
        >
          {getLocalizedText('Zurück', 'Back')}
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {getLocalizedText('Wird gesendet...', 'Submitting...')}
            </>
          ) : (
            getLocalizedText('Absenden', 'Submit')
          )}
        </Button>
      </div>
    </div>
  );
};
