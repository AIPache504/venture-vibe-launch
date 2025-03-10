
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.24.0";

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  website?: string;
  inquiryType: string;
  phase?: string;
  location: string;
  germanState?: string;
  nrwRegion?: string;
  techFocus?: string;
  fundingNeed?: string;
  investorType?: string;
  shortDescription: string;
  createdAt?: string;
}

interface RequestBody {
  formData: ContactFormData;
  recipients: string[];
}

serve(async (req) => {
  try {
    // Get environment variables
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const resendApiKey = Deno.env.get("RESEND_API_KEY") || "";

    if (!resendApiKey) {
      return new Response(
        JSON.stringify({ error: "Resend API key is not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Create a Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Parse request body
    const { formData, recipients }: RequestBody = await req.json();

    // Format form data for the email
    const formattedData = Object.entries(formData)
      .filter(([key, value]) => value !== undefined && key !== 'createdAt')
      .map(([key, value]) => `<strong>${key}:</strong> ${value}`)
      .join('<br>');

    // Build the email payload
    const payload = {
      from: "contact@mayventures.vc",
      to: recipients,
      subject: `New Contact Form Submission from ${formData.name}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p>A new contact form has been submitted by ${formData.name} (${formData.email}) from ${formData.company}.</p>
        <h2>Form Details:</h2>
        <p>${formattedData}</p>
      `,
    };

    // Send the email using Resend API
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error("Email sending failed:", responseData);
      return new Response(
        JSON.stringify({ error: "Failed to send email notification" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: responseData }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in edge function:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
