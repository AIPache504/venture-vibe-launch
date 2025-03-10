import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name muss mindestens 2 Zeichen lang sein.',
  }),
  email: z.string().email({
    message: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
  }),
  company: z.string().min(1, {
    message: 'Bitte geben Sie einen Firmennamen ein.',
  }),
  website: z.union([
    z.string().url({
      message: 'Bitte geben Sie eine gültige URL ein.',
    }),
    z.string().length(0) // Allow empty string
  ]).optional(),
  inquiryType: z.enum([
    'Startup',
    'Investment',
    'Zusammenarbeit / Partnerschaft',
    'Presseanfrage',
    'Sonstiges'
  ]),
  phase: z.enum(['Seed', 'Pre-Seed', 'Series A oder später']).optional(),
  location: z.enum(['Germany', 'Europe', 'International']),
  shortDescription: z.string().max(500, {
    message: 'Die Beschreibung darf maximal 500 Zeichen lang sein.',
  }),
});

export const ContactForm = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      website: '',
      inquiryType: 'Startup',
      location: 'Germany',
      shortDescription: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Hier später die Logik für das Absenden des Formulars implementieren
    console.log(values);
    
    toast({
      title: language === 'de' 
        ? 'Vielen Dank für Ihre Anfrage!' 
        : 'Thank you for your inquiry!',
      description: language === 'de'
        ? 'Wir melden uns typischerweise innerhalb von 10 Tagen zurück.'
        : 'We typically respond within 10 days.',
    });
  };

  return (
    <div className="space-y-8">
      <div className="prose prose-gray max-w-none">
        <h1 className="text-3xl font-bold text-mayNavy mb-4">
          {language === 'de' ? 'Kontakt' : 'Contact'}
        </h1>
        <p className="text-mayNavy/80 mb-8">
          {language === 'de' 
            ? 'Dieses Kontaktformular dient der effizienten Einordnung eingehender Anfragen von Startups und anderen Stakeholdern unseres Fonds. Ziel ist es, die Bearbeitung zu beschleunigen und relevante Anfragen direkt priorisieren zu können.'
            : 'This contact form serves to efficiently categorize incoming inquiries from startups and other stakeholders of our fund. The goal is to accelerate processing and prioritize relevant inquiries directly.'}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{language === 'de' ? 'Name' : 'Name'}</FormLabel>
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
                <FormLabel>{language === 'de' ? 'E-Mail' : 'Email'}</FormLabel>
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
                <FormLabel>{language === 'de' ? 'Unternehmen' : 'Company'}</FormLabel>
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
                <FormLabel>{language === 'de' ? 'Website (optional)' : 'Website (optional)'}</FormLabel>
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
                <FormLabel>{language === 'de' ? 'Art der Anfrage' : 'Inquiry Type'}</FormLabel>
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
                      {language === 'de' ? 'Zusammenarbeit / Partnerschaft' : 'Collaboration / Partnership'}
                    </SelectItem>
                    <SelectItem value="Presseanfrage">
                      {language === 'de' ? 'Presseanfrage' : 'Press Inquiry'}
                    </SelectItem>
                    <SelectItem value="Sonstiges">
                      {language === 'de' ? 'Sonstiges' : 'Other'}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="shortDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {language === 'de' ? 'Kurzbeschreibung' : 'Short Description'}
                </FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder={
                      language === 'de' 
                        ? 'Beschreiben Sie kurz Ihr Anliegen (max. 500 Zeichen)' 
                        : 'Briefly describe your inquiry (max. 500 characters)'
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full md:w-auto">
            {language === 'de' ? 'Absenden' : 'Submit'}
          </Button>
        </form>
      </Form>
    </div>
  );
};
