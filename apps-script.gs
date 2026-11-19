/* Paste this whole file into Extensions > Apps Script in your Google Sheet.
   See README.md, Part 1. */
const SHEET_NAME = "Entries";
const COLUMNS = ["timestamp", "name", "email", "contact", "word"];

function sheet_() {
  const ss = SpreadsheetApp.getActive();
  let sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) sh.appendRow(COLUMNS);
  return sh;
}
function clean_(v) {
  v = String(v == null ? "" : v).trim().slice(0, 200);
  return /^[=+\-@]/.test(v) ? "'" + v : v;   // stops spreadsheet formula injection
}
function reply_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);
    const email = clean_(d.email).toLowerCase();
    if (!d.name || !email) return reply_({ok: false, error: "missing"});
    const sh = sheet_();
    const last = sh.getLastRow();
    if (last > 1) {
      const emails = sh.getRange(2, 3, last - 1, 1).getValues().flat().map(x => String(x).toLowerCase());
      if (emails.indexOf(email) !== -1) return reply_({ok: false, duplicate: true});
    }
    sh.appendRow([new Date(), clean_(d.name), email, clean_(d.contact), clean_(d.word)]);
    return reply_({ok: true});
  } catch (err) {
    return reply_({ok: false, error: String(err)});
  } finally {
    lock.releaseLock();
  }
}

/* Adds a "Lantern Draw" menu to the sheet with a one-click winner draw. */
function onOpen() {
  SpreadsheetApp.getUi().createMenu("Lantern Draw").addItem("Draw a winner", "drawWinner").addToUi();
}
function drawWinner() {
  const sh = sheet_(), last = sh.getLastRow();
  if (last < 2) { SpreadsheetApp.getUi().alert("No entries yet."); return; }
  const rows = sh.getRange(2, 1, last - 1, COLUMNS.length).getValues();
  const w = rows[Math.floor(Math.random() * rows.length)];
  SpreadsheetApp.getUi().alert("Winner", "Name: " + w[1] + "\nEmail: " + w[2] + "\nContact: " + w[3], SpreadsheetApp.getUi().ButtonSet.OK);
}
