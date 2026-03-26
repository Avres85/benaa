import { NextResponse } from "next/server";
import { google } from "googleapis";
import { z } from "zod";

const waitlistSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  companyPosition: z.string().trim().min(2).max(200),
});

type WaitlistSubmission = z.infer<typeof waitlistSchema>;

type GoogleConfig = {
  clientEmail: string;
  privateKey: string;
  spreadsheetId: string;
  range: string;
};

function getGoogleConfig(): GoogleConfig | null {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const range = process.env.GOOGLE_SHEETS_RANGE ?? "Waitlist!A:D";

  if (!clientEmail || !privateKey || !spreadsheetId) {
    return null;
  }

  return {
    clientEmail,
    privateKey,
    spreadsheetId,
    range,
  };
}

async function appendToSheet(data: WaitlistSubmission, config: GoogleConfig) {
  const auth = new google.auth.JWT({
    email: config.clientEmail,
    key: config.privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: config.spreadsheetId,
    range: config.range,
    valueInputOption: "RAW",
    requestBody: {
      values: [[new Date().toISOString(), data.name, data.email, data.companyPosition]],
    },
  });
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = waitlistSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please complete all fields with valid details." },
        { status: 400 }
      );
    }

    const config = getGoogleConfig();

    if (!config) {
      return NextResponse.json(
        { error: "Waitlist backend is not configured yet." },
        { status: 503 }
      );
    }

    await appendToSheet(parsed.data, config);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("waitlist-submit-error", error);
    return NextResponse.json(
      { error: "Unable to submit right now. Please try again." },
      { status: 500 }
    );
  }
}
