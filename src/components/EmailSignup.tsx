import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from '@/contexts/LanguageContext';

export const EmailSignup = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t('toastTitle'),
      description: t('toastDescription'),
    });
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm gap-2">
      <Input
        type="email"
        placeholder={t('emailPlaceholder')}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-white/90"
        required
      />
      <Button type="submit" className="bg-mayNavy hover:bg-mayNavy/90">
        {t('notifyMe')}
      </Button>
    </form>
  );
};