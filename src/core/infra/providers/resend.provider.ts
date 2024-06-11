import { Resend } from 'resend';
import { EnvConfigKeys } from '../../../utils/constants';

interface ResendApiResponse {
  data: CreateEmailResponseSuccess | null;
  error: string | null;
}

interface CreateEmailResponseSuccess {
  /** The ID of the newly created email. */
  id: string;
}

const resend = new Resend(process.env[EnvConfigKeys.RESEND_API_KEY]);

/**
 * Sends an email using Resend to the specified email addresses.
 * The email contains the subject and body, the body can be in HTML format.
 *
 * @param emailTo [string] - Array of emails to send the message to.
 * @param subject string - Subject of the email.
 * @param body string - Body of the email.
 * @warining There's a max of 50 emails per request and 100 emails per day.
 * @returns data - The data returned from the email provider.
 */
async function sendEmail(emailTo: string[], subject: string, body: string): Promise<ResendApiResponse> {
  try {
    const emailsFormatted = emailTo.map(email => `${email}`);
    const { data, error } = await resend.emails.send({
      from: `Link Bridge <${process.env[EnvConfigKeys.RESEND_EMAIL_FROM]}>`,
      to: emailsFormatted,
      subject,
      html: body,
    });

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error: unknown) {
    return { data: null, error: 'An unexpected error occurred' };
  }
}

export const EmailProvider = { sendEmail };
