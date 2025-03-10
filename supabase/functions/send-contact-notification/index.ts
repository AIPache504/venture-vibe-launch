
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

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
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Function invoked with method:", req.method);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();
    console.log("Received contact form data:", formData);

    // Log the API key status (without exposing the actual key)
    const hasApiKey = !!Deno.env.get("RESEND_API_KEY");
    console.log("RESEND_API_KEY available:", hasApiKey);
    if (!hasApiKey) {
      throw new Error("Missing RESEND_API_KEY environment variable");
    }

    // Always use onboarding@resend.dev as the "from" address for new Resend accounts
    // until your domain is verified
    const fromEmail = "onboarding@resend.dev";
    
    // For test emails, send to the verified email (which is the one you provided)
    const isTestEmail = formData.email === "test@example.com";
    const recipientEmail = isTestEmail ? "herrlule@gmail.com" : "Dominik@Mayventures.vc";
    
    console.log(`Sending email from ${fromEmail} to ${recipientEmail}`);

    const emailData = {
      from: `May Ventures <${fromEmail}>`,
      to: [recipientEmail],
      subject: `New Contact Form Submission: ${formData.name} from ${formData.company}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <h3>Basic Information:</h3>
        <ul>
          <li><strong>Name:</strong> ${formData.name}</li>
          <li><strong>Email:</strong> ${formData.email}</li>
          <li><strong>Company:</strong> ${formData.company}</li>
          ${formData.website ? `<li><strong>Website:</strong> ${formData.website}</li>` : ''}
          <li><strong>Inquiry Type:</strong> ${formData.inquiryType}</li>
        </ul>

        ${formData.inquiryType === 'Startup' ? `
          <h3>Startup Details:</h3>
          <ul>
            <li><strong>Phase:</strong> ${formData.phase || 'Not specified'}</li>
            <li><strong>Tech Focus:</strong> ${formData.techFocus || 'Not specified'}</li>
            <li><strong>Funding Need:</strong> ${formData.fundingNeed || 'Not specified'}</li>
          </ul>
        ` : ''}

        ${formData.inquiryType === 'Investment' ? `
          <h3>Investor Details:</h3>
          <ul>
            <li><strong>Investor Type:</strong> ${formData.investorType || 'Not specified'}</li>
          </ul>
        ` : ''}

        <h3>Location Information:</h3>
        <ul>
          <li><strong>Location:</strong> ${formData.location}</li>
          ${formData.germanState ? `<li><strong>German State:</strong> ${formData.germanState}</li>` : ''}
          ${formData.nrwRegion ? `<li><strong>NRW Region:</strong> ${formData.nrwRegion}</li>` : ''}
        </ul>

        <h3>Description:</h3>
        <p>${formData.shortDescription}</p>
      `,
    };
    
    console.log("Preparing to send email with data:", JSON.stringify(emailData, null, 2));

    try {
      const emailResponse = await resend.emails.send(emailData);
      console.log("Email sent successfully:", emailResponse);

      return new Response(JSON.stringify(emailResponse), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch (emailError) {
      console.error("Error from Resend API:", emailError);
      throw emailError;
    }
  } catch (error) {
    console.error("Error sending email:", error);
    console.error("Error details:", error.stack || "No stack trace available");
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack || "No additional details available"
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);
