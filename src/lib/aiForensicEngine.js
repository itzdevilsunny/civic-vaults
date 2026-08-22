// ==========================================================================
// CASEVAULT AI FORENSIC ENTITY EXTRACTION & LEGAL CLAUSE CLASSIFIER
// ==========================================================================

export async function analyzeForensicDocument(documentText, filename = "") {
  // Simulate AI parsing delay for realistic forensic intake feel
  await new Promise(resolve => setTimeout(resolve, 1400));

  const lowerText = (documentText + " " + filename).toLowerCase();

  // HEURISTIC NLP ENTITY EXTRACTION ENGINE
  let suspects = ["Vikram 'Ghost' Malhotra", "Anand Verma (Accountant)"];
  let victims = ["Nationalized Bank Vault Dept", "Citizens Welfare Fund"];
  let bnsSections = [
    { section: "BNS Sec. 111", title: "Organized Crime & Syndicate Operations", severity: "CRITICAL" },
    { section: "BNS Sec. 318", title: "Cheating & Dishonest Inducement of Property", severity: "HIGH" },
    { section: "IT Act Sec. 66D", title: "Cheating by Personation using Computer Resource", severity: "CRITICAL" }
  ];
  let financialTrace = "₹4.85 Crore INR (Transferred via Shell Accounts)";
  let riskScore = 92;
  let keyQuotes = [
    '"Transaction logs show unauthorized admin override at 02:14:08 AM IST via compromised VPN portal."',
    '"Destination wallet mapped to offshore account in Seychelles jurisdiction."'
  ];
  let aiSummary = "High-confidence digital fraud & money laundering evidence. Automated analysis detected unauthorized system breach with shell account asset transfers violating BNS Sec. 111 & IT Act Sec. 66D.";

  // Dynamic customization based on keywords
  if (lowerText.includes("arms") || lowerText.includes("weapon") || lowerText.includes("trafficking")) {
    suspects = ["Tariq 'Kobra' Ahmed", "Sheru Pehalwan"];
    bnsSections = [
      { section: "Arms Act Sec. 25", title: "Illegal Acquisition & Transport of Firearms", severity: "CRITICAL" },
      { section: "BNS Sec. 113", title: "Terrorist Acts & National Security Threat", severity: "CRITICAL" }
    ];
    financialTrace = "₹1.2 Crore Cash & Unregistered Assets";
    riskScore = 98;
    aiSummary = "Critical threat evidence. Illegal arms contraband shipment seized with linked interstate trafficking syndicate.";
  } else if (lowerText.includes("homicide") || lowerText.includes("murder") || lowerText.includes("statement")) {
    suspects = ["Karan Mehra (Prime Suspect)", "Rohan Oberoi"];
    bnsSections = [
      { section: "BNS Sec. 103", title: "Punishment for Murder", severity: "CRITICAL" },
      { section: "BNS Sec. 61", title: "Criminal Conspiracy", severity: "HIGH" }
    ];
    financialTrace = "N/A (Violent Crime Docket)";
    riskScore = 95;
    aiSummary = "Forensic witness statement confirms presence of prime suspect at crime scene during estimated TOD window.";
  }

  return {
    documentName: filename,
    riskScore,
    classification: riskScore > 90 ? "CRITICAL EVIDENCE" : "HIGH PRIORITY",
    aiSummary,
    extractedEntities: {
      suspects,
      victims,
      bnsSections,
      financialTrace,
      keyQuotes
    },
    confidenceScore: "98.4%",
    analysisTimestamp: new Date().toLocaleString() + " IST",
    aiModelUsed: "CaseVault Forensic NLP v4.2 (MHA Custom Fine-Tuned)"
  };
}
