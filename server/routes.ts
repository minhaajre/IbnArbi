import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { google } from "googleapis";

// Gmail Integration - See: google-mail blueprint
let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=google-mail',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('Gmail not connected');
  }
  return accessToken;
}

// WARNING: Never cache this client.
// Access tokens expire, so a new client must be created each time.
async function getUncachableGmailClient() {
  const accessToken = await getAccessToken();

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: accessToken
  });

  return google.gmail({ version: 'v1', auth: oauth2Client });
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Email endpoint for moment capture
  app.post("/api/send-moment-capture", async (req, res) => {
    try {
      const { email, momentData } = req.body;

      if (!email || !momentData) {
        return res.status(400).json({ error: "Email and moment data are required" });
      }

      // Get Gmail client
      const gmail = await getUncachableGmailClient();

      // Format the moment data into HTML email
      const htmlContent = formatMomentEmail(momentData);

      // Create RFC 2822 formatted email
      const utf8Subject = `=?utf-8?B?${Buffer.from(`Al-Falak Moment Capture - ${new Date().toLocaleString()}`).toString("base64")}?=`;
      const messageParts = [
        `From: me`,
        `To: ${email}`,
        `Subject: ${utf8Subject}`,
        `MIME-Version: 1.0`,
        `Content-Type: text/html; charset=utf-8`,
        `Content-Transfer-Encoding: quoted-printable`,
        ``,
        htmlContent,
      ];
      const message = messageParts.join("\n");
      const encodedMessage = Buffer.from(message).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

      await gmail.users.messages.send({
        userId: "me",
        requestBody: {
          raw: encodedMessage,
        },
      });

      res.json({ success: true, message: "Moment capture sent to your email" });
    } catch (error) {
      console.error("Email error:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  return httpServer;
}

function formatMomentEmail(data: any): string {
  const {
    currentTime,
    currentMansion,
    planetaryHour,
    dayRuler,
    location,
    moonPhase,
    planets,
    hijriDate,
    dominant_element,
  } = data;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px; margin-bottom: 20px; text-align: center; }
        .section { background: white; padding: 20px; margin-bottom: 15px; border-radius: 6px; border-left: 4px solid #667eea; }
        .section h3 { margin-top: 0; color: #667eea; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .item { padding: 10px; background: #f3f4f6; border-radius: 4px; }
        .label { font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; }
        .value { font-size: 16px; font-weight: 600; color: #111; margin-top: 5px; }
        .arabic { font-family: 'Amiri', serif; direction: rtl; text-align: right; }
        .footer { text-align: center; color: #9ca3af; font-size: 12px; margin-top: 30px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✨ Al-Falak Moment Capture ✨</h1>
          <p>Your celestial moment at a glance</p>
        </div>

        ${currentTime ? `
          <div class="section">
            <h3>⏰ Current Time</h3>
            <div class="item">
              <div class="label">Time</div>
              <div class="value">${new Date(currentTime).toLocaleString()}</div>
              ${hijriDate ? `<div class="value arabic" style="margin-top: 8px;">${hijriDate}</div>` : ''}
            </div>
          </div>
        ` : ''}

        ${location ? `
          <div class="section">
            <h3>📍 Location</h3>
            <div class="item">
              <div class="label">Place</div>
              <div class="value">${location.name}</div>
              <div style="font-size: 12px; color: #6b7280; margin-top: 5px;">${location.lat.toFixed(4)}°, ${location.lng.toFixed(4)}°</div>
            </div>
          </div>
        ` : ''}

        ${planetaryHour ? `
          <div class="section">
            <h3>⭐ Planetary Hour</h3>
            <div class="grid">
              <div class="item">
                <div class="label">Ruling Planet</div>
                <div class="value">${planetaryHour.planet}</div>
              </div>
              <div class="item">
                <div class="label">Hour Type</div>
                <div class="value">${planetaryHour.type}</div>
              </div>
              <div class="item">
                <div class="label">Start</div>
                <div class="value">${planetaryHour.start ? new Date(planetaryHour.start).toLocaleTimeString() : 'N/A'}</div>
              </div>
              <div class="item">
                <div class="label">End</div>
                <div class="value">${planetaryHour.end ? new Date(planetaryHour.end).toLocaleTimeString() : 'N/A'}</div>
              </div>
            </div>
          </div>
        ` : ''}

        ${dayRuler ? `
          <div class="section">
            <h3>☀️ Day Ruler</h3>
            <div class="item">
              <div class="label">Today's Ruling Planet</div>
              <div class="value">${dayRuler}</div>
            </div>
          </div>
        ` : ''}

        ${currentMansion ? `
          <div class="section">
            <h3>🌙 Lunar Mansion</h3>
            <div class="grid">
              <div class="item">
                <div class="label">Station</div>
                <div class="value">${currentMansion.number} - ${currentMansion.name}</div>
                <div class="value arabic" style="margin-top: 8px; font-size: 14px;">${currentMansion.arabic}</div>
              </div>
              <div class="item">
                <div class="label">Nature</div>
                <div class="value">${currentMansion.nature === 'blessed' ? '✓ Blessed' : '⚠ Challenging'}</div>
              </div>
            </div>
          </div>
        ` : ''}

        ${moonPhase ? `
          <div class="section">
            <h3>🌕 Moon Phase</h3>
            <div class="grid">
              <div class="item">
                <div class="label">Phase</div>
                <div class="value">${(moonPhase.illumination * 100).toFixed(1)}%</div>
              </div>
              <div class="item">
                <div class="label">Status</div>
                <div class="value">${moonPhase.waxing ? 'Waxing' : 'Waning'}</div>
              </div>
            </div>
          </div>
        ` : ''}

        ${dominant_element ? `
          <div class="section">
            <h3>🔥 Elemental Balance</h3>
            <div class="item">
              <div class="label">Dominant Element</div>
              <div class="value">${dominant_element}</div>
            </div>
          </div>
        ` : ''}

        ${planets && planets.length > 0 ? `
          <div class="section">
            <h3>🪐 Planetary Positions</h3>
            <div style="overflow-x: auto;">
              <table style="width: 100%; font-size: 12px;">
                <thead style="background: #f3f4f6;">
                  <tr>
                    <th style="text-align: left; padding: 8px;">Planet</th>
                    <th style="text-align: left; padding: 8px;">Sign</th>
                    <th style="text-align: left; padding: 8px;">Degree</th>
                    <th style="text-align: left; padding: 8px;">Dignity</th>
                  </tr>
                </thead>
                <tbody>
                  ${planets.slice(0, 7).map((p: any) => `
                    <tr style="border-bottom: 1px solid #e5e7eb;">
                      <td style="padding: 8px;">${p.planet}</td>
                      <td style="padding: 8px;">${p.zodiacSign}</td>
                      <td style="padding: 8px;">${p.longitude.toFixed(2)}°</td>
                      <td style="padding: 8px;">${p.dignity || 'Neutral'}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        ` : ''}

        <div class="footer">
          <p>Captured from Al-Falak: Lunar & Planetary Calendar</p>
          <p>Based on Ibn Arabi's Cosmology</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
