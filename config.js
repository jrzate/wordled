/* ===================================================================
   WORDLED SETTINGS: edit this file, nothing else needs to change.
   =================================================================== */
const CONFIG = {
  title: "Wordled",
  wordLength: 5,
  maxGuesses: 6,

  // Word pool. Every word must have exactly `wordLength` letters.
  words: ["SPARK","DREAM","LIGHT","CROWN","MAGIC","PETAL","BLOOM", "FIFTY"],

  // "random" = each player gets a random word from the pool
  // "daily"  = everyone gets the same word, changing each day
  wordMode: "random",

  winMessages: ["Brilliant!","Wonderful!","Splendid!","Great!","Nice!","Phew!"],

  // ---- Prize draw ----
  // Paste your Google Apps Script web app URL here (see README.md, Part 1).
  // Leave it empty and the entry form shows "not set up yet".
  entryEndpoint: "https://script.google.com/macros/s/AKfycbzvBC9XsVxKm3EUYn0MC_lYvHXyGLsG2hR8KugVrUoRrroaEokKMztgontIA7UfC1ELDQ/exec",

  entryTabLabel: "Lantern Draw",
  entryTitle: "You found the light!",
  entryIntro: "Leave your details to enter the lantern draw. One entry per email.",
  consent: "By entering, you agree to be contacted if you win.",
  // Keys name, email and contact are saved to the sheet's columns.
  entryFields: [
    {key:"name",    label:"Name",  type:"text",  required:true},
    {key:"email",   label:"UP Mail", type:"email", required:true},
    {key:"contact", label:"Phone or social handle (optional)", type:"text", required:false}
  ]
};
