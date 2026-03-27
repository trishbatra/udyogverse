// Udyogverse - All predefined game data

export const STAGES = [
  { id: 'idea', name: 'Idea', nameHindi: 'Shuruaat', tileRange: [1, 5], color: '#FFF3E0', borderColor: '#FFB74D', customerTarget: 5, repMin: 1, maxBurn: 3, reward: 5000 },
  { id: 'fff', name: 'FFF', nameHindi: 'Parivaar', tileRange: [6, 12], color: '#FFF8E1', borderColor: '#FFD54F', customerTarget: 15, repMin: 2, maxBurn: 3, reward: 10000 },
  { id: 'angels', name: 'Angels', nameHindi: 'Farishte', tileRange: [13, 20], color: '#FBE9E7', borderColor: '#FF8A65', customerTarget: 30, repMin: 2, maxBurn: 3, reward: 20000 },
  { id: 'preseed', name: 'Pre-Seed', nameHindi: 'Beej', tileRange: [21, 30], color: '#E8F5E9', borderColor: '#66BB6A', customerTarget: 60, repMin: 2, maxBurn: 2, reward: 40000 },
  { id: 'seed', name: 'Seed', nameHindi: 'Unkurna', tileRange: [31, 40], color: '#E0F7FA', borderColor: '#4DD0E1', customerTarget: 120, repMin: 2, maxBurn: 2, reward: 80000 },
  { id: 'seriesa', name: 'Series A', nameHindi: 'Udaan', tileRange: [41, 47], color: '#E8EAF6', borderColor: '#7986CB', customerTarget: 250, repMin: 3, maxBurn: 2, reward: 150000 },
  { id: 'ipo', name: 'IPO / Exit', nameHindi: 'Safal Udyam', tileRange: [48, 50], color: '#FFF9C4', borderColor: '#F9A825', customerTarget: 500, repMin: 3, maxBurn: 1, reward: 0 },
];

export function getStageForTile(tile) {
  return STAGES.find(s => tile >= s.tileRange[0] && tile <= s.tileRange[1]) || STAGES[0];
}

export const SNAKES = {
  47: { tail: 26, name: 'Investor Trust Lost', nameHindi: 'निवेशक का भरोसा टूटा', description: 'Board meeting mein investors ne trust khoya. Series A se wapas Pre-Seed tak girna pada.' },
  38: { tail: 18, name: 'Broken Supply Chain', nameHindi: 'सप्लाई चेन टूटी', description: 'Supply chain toot gayi — raw material ki shortage ne sab bigaad diya.' },
  35: { tail: 6, name: 'Co-founder Left', nameHindi: 'Co-founder ne chhoda', description: 'Co-founder ne company chhod di. Major setback, back to basics.' },
  29: { tail: 9, name: 'Over-expansion', nameHindi: 'ज़्यादा फैलाव', description: 'Bahut jaldi expand kar diya, cash flow crisis aa gayi.' },
  22: { tail: 3, name: 'Quality Storm', nameHindi: 'क्वालिटी का तूफ़ान', description: 'Quality complaints ka toofaan aaya — customers ka trust toota.' },
  16: { tail: 4, name: 'Compliance Issue', nameHindi: 'कम्प्लायंस इश्यू', description: 'GST compliance issue — operations ruk gayi, penalty lagi.' },
};

export const LADDERS = {
  2: { top: 14, name: 'Word of Mouth', nameHindi: 'मुँह की बात', description: 'Pehla grahak bahut khush! Usne apne doston ko bataya aur customers aane lage.' },
  7: { top: 21, name: 'Mentor Found', nameHindi: 'मेंटर मिल गया', description: 'Ek experienced mentor ne raasta dikhaya — game changer moment!' },
  11: { top: 25, name: 'Product-Market Fit', nameHindi: 'प्रोडक्ट-मार्केट फिट', description: 'Product-market fit mil gaya! Ab customers khud aa rahe hain.' },
  15: { top: 34, name: 'Government Scheme', nameHindi: 'सरकारी योजना', description: 'Government scheme ka fayda mila — subsidy aur support dono!' },
  19: { top: 37, name: 'Strategic Partnership', nameHindi: 'रणनीतिक साझेदारी', description: 'Ek badi company ke saath partnership ban gayi — growth rocket!' },
  28: { top: 43, name: 'Gone Viral!', nameHindi: 'वायरल हो गया!', description: 'Product social media pe viral ho gaya — orders ki baarish!' },
};

export const ACTION_CARDS = [
  // Marketing
  { id: 'm1', name: 'Mohalley mein pamphlet', nameHindi: 'मोहल्ले में पम्फलेट', category: 'marketing', cost: 1000, effects: { customers: 3 }, description: 'Distribute pamphlets in your neighborhood', minTile: 1, maxTile: 15, icon: 'Megaphone' },
  { id: 'm2', name: 'WhatsApp status laga', nameHindi: 'व्हाट्सएप स्टेटस', category: 'marketing', cost: 500, effects: { customers: 2 }, description: 'Put WhatsApp status about your business', minTile: 1, maxTile: 20, icon: 'Megaphone' },
  { id: 'm3', name: 'Social media dhamaal', nameHindi: 'सोशल मीडिया धमाल', category: 'marketing', cost: 2000, effects: { customers: 5, bugMeter: 1 }, description: 'Big social media campaign — but watch for bugs!', minTile: 6, maxTile: 25, icon: 'Megaphone' },
  { id: 'm4', name: 'Kirana partnership', nameHindi: 'किराना पार्टनरशिप', category: 'marketing', cost: 3000, effects: { customers: 8 }, description: 'Tie up with local kirana stores for distribution', minTile: 10, maxTile: 30, icon: 'Megaphone' },
  { id: 'm5', name: 'Online ads chala', nameHindi: 'ऑनलाइन एड्स', category: 'marketing', cost: 5000, effects: { customers: 12, bugMeter: 1 }, description: 'Run Facebook & Google ads — rapid growth!', minTile: 15, maxTile: 40, icon: 'Megaphone' },
  { id: 'm6', name: 'Influencer se baat', nameHindi: 'इन्फ्लुएंसर', category: 'marketing', cost: 8000, effects: { customers: 20 }, description: 'Collaborate with a popular influencer', minTile: 25, maxTile: 47, icon: 'Megaphone' },
  { id: 'm7', name: 'TV ad campaign', nameHindi: 'टीवी एड कैम्पेन', category: 'marketing', cost: 15000, effects: { customers: 35, bugMeter: 1 }, description: 'National TV ad — massive reach but risky!', minTile: 35, maxTile: 50, icon: 'Megaphone' },
  { id: 'm8', name: 'Referral program', nameHindi: 'रेफरल प्रोग्राम', category: 'marketing', cost: 3000, effects: { customers: 10 }, description: 'Happy customers refer more customers', minTile: 15, maxTile: 50, icon: 'Megaphone', condition: { metric: 'reputation', op: '>=', val: 2 } },

  // Product
  { id: 'p1', name: 'Packaging sudhaaro', nameHindi: 'पैकेजिंग सुधारो', category: 'product', cost: 2000, effects: { bugMeter: -1 }, description: 'Improve product packaging quality', minTile: 1, maxTile: 20, icon: 'Package' },
  { id: 'p2', name: 'Quality testing karo', nameHindi: 'क्वालिटी टेस्टिंग', category: 'product', cost: 3000, effects: { bugMeter: -1, reputation: 1 }, description: 'Run thorough quality tests on your product', minTile: 5, maxTile: 30, icon: 'Package' },
  { id: 'p3', name: 'Naya product launch', nameHindi: 'नया प्रोडक्ट लॉन्च', category: 'product', cost: 5000, effects: { customers: 5, bugMeter: 1 }, description: 'Launch a new product variant', minTile: 10, maxTile: 35, icon: 'Package' },
  { id: 'p4', name: 'Process automation', nameHindi: 'प्रोसेस ऑटोमेशन', category: 'product', cost: 8000, effects: { burn: -1 }, description: 'Automate production to reduce burn', minTile: 20, maxTile: 45, icon: 'Package' },
  { id: 'p5', name: 'R&D mein invest', nameHindi: 'R&D में इन्वेस्ट', category: 'product', cost: 10000, effects: { bugMeter: -2 }, description: 'Invest in research & development', minTile: 25, maxTile: 50, icon: 'Package' },
  { id: 'p6', name: 'Patent file karo', nameHindi: 'पेटेंट फाइल', category: 'product', cost: 12000, effects: { reputation: 1 }, description: 'File a patent for your innovation', minTile: 35, maxTile: 50, icon: 'Package' },
  { id: 'p7', name: 'Customer feedback loop', nameHindi: 'फीडबैक लूप', category: 'product', cost: 2000, effects: { bugMeter: -1, customers: 2 }, description: 'Set up customer feedback system', minTile: 5, maxTile: 40, icon: 'Package' },

  // Team
  { id: 't1', name: 'Helper rakho', nameHindi: 'हेल्पर रखो', category: 'team', cost: 2000, effects: { burn: 1, customers: 1 }, description: 'Hire a helper for daily operations', minTile: 1, maxTile: 15, icon: 'Users' },
  { id: 't2', name: 'Salesperson lagao', nameHindi: 'सेल्सपर्सन लगाओ', category: 'team', cost: 4000, effects: { customers: 5, burn: 1 }, description: 'Hire a dedicated salesperson', minTile: 5, maxTile: 25, icon: 'Users' },
  { id: 't3', name: 'Manager hire karo', nameHindi: 'मैनेजर हायर', category: 'team', cost: 6000, effects: { burn: -1 }, description: 'Hire an operations manager', minTile: 12, maxTile: 35, icon: 'Users' },
  { id: 't4', name: 'Team training do', nameHindi: 'टीम ट्रेनिंग', category: 'team', cost: 5000, effects: { bugMeter: -1, reputation: 1 }, description: 'Invest in team training program', minTile: 15, maxTile: 40, icon: 'Users' },
  { id: 't5', name: 'CTO hire karo', nameHindi: 'CTO हायर करो', category: 'team', cost: 10000, effects: { bugMeter: -2 }, description: 'Hire a Chief Technology Officer', minTile: 25, maxTile: 50, icon: 'Users' },
  { id: 't6', name: 'Advisory board banao', nameHindi: 'एडवाइजरी बोर्ड', category: 'team', cost: 8000, effects: { reputation: 1 }, description: 'Form an advisory board of experts', minTile: 30, maxTile: 50, icon: 'Users' },

  // Bug Fix
  { id: 'b1', name: 'Complaints fix karo', nameHindi: 'शिकायतें ठीक करो', category: 'bugfix', cost: 1000, effects: { bugMeter: -2 }, description: 'Address customer complaints directly', minTile: 1, maxTile: 50, icon: 'Wrench' },
  { id: 'b2', name: 'Quality audit', nameHindi: 'क्वालिटी ऑडिट', category: 'bugfix', cost: 3000, effects: { bugMeter: -2, reputation: 1 }, description: 'Complete quality audit of all operations', minTile: 6, maxTile: 50, icon: 'Wrench' },
  { id: 'b3', name: 'Process overhaul', nameHindi: 'प्रोसेस ओवरहॉल', category: 'bugfix', cost: 5000, effects: { bugMeter: -3 }, description: 'Complete overhaul of broken processes', minTile: 12, maxTile: 50, icon: 'Wrench' },
  { id: 'b4', name: 'Support setup karo', nameHindi: 'सपोर्ट सेटअप', category: 'bugfix', cost: 4000, effects: { bugMeter: -1, customers: 2 }, description: 'Set up dedicated customer support', minTile: 15, maxTile: 50, icon: 'Wrench' },

  // Fundraise
  { id: 'f1', name: 'Family se paisa', nameHindi: 'फैमिली से पैसा', category: 'fundraise', cost: 0, effects: { funds: 20000, ownership: -10 }, description: 'Family & friends pitch in Rs.20,000 for 10%', minTile: 1, maxTile: 12, icon: 'IndianRupee' },
  { id: 'f2', name: 'Angel investor', nameHindi: 'एंजेल इन्वेस्टर', category: 'fundraise', cost: 0, effects: { funds: 50000, ownership: -15 }, description: 'Angel offers Rs.50,000 for 15%', minTile: 10, maxTile: 20, icon: 'IndianRupee', condition: { metric: 'reputation', op: '>=', val: 2 } },
  { id: 'f3', name: 'Pre-seed round', nameHindi: 'प्री-सीड राउंड', category: 'fundraise', cost: 0, effects: { funds: 100000, ownership: -18 }, description: 'Pre-seed: Rs.1,00,000 for 18%', minTile: 18, maxTile: 30, icon: 'IndianRupee', condition: { metric: 'customers', op: '>=', val: 20 } },
  { id: 'f4', name: 'Seed funding', nameHindi: 'सीड फंडिंग', category: 'fundraise', cost: 0, effects: { funds: 200000, ownership: -20 }, description: 'Seed round: Rs.2,00,000 for 20%', minTile: 28, maxTile: 40, icon: 'IndianRupee', condition: { metric: 'customers', op: '>=', val: 40 } },
  { id: 'f5', name: 'Series A raise', nameHindi: 'सीरीज A राउंड', category: 'fundraise', cost: 0, effects: { funds: 500000, ownership: -25 }, description: 'Series A: Rs.5,00,000 for 25%', minTile: 38, maxTile: 50, icon: 'IndianRupee', condition: { metric: 'customers', op: '>=', val: 150 } },

  // Save
  { id: 's1', name: 'Ruko aur socho', nameHindi: 'रुको और सोचो', category: 'save', cost: 0, effects: {}, description: 'Take a breath. Pause and reflect on strategy.', minTile: 1, maxTile: 50, icon: 'Pause' },
  { id: 's2', name: 'Cost cutting mode', nameHindi: 'कॉस्ट कटिंग', category: 'save', cost: 0, effects: { burn: -1, customers: -2 }, description: 'Cut costs aggressively — lose some customers', minTile: 1, maxTile: 50, icon: 'Pause' },
  { id: 's3', name: 'Jugaad mode', nameHindi: 'जुगाड़ मोड', category: 'save', cost: 0, effects: { funds: 1000 }, description: 'Find creative low-cost solutions to survive', minTile: 1, maxTile: 50, icon: 'Pause' },
];

export const BUG_CARDS = [
  { id: 'bug1', name: 'Machine Breakdown', nameHindi: 'मशीन खराब', effects: { customers: -5, bugMeter: 1 }, description: 'Production machine broke down — lost customers!' },
  { id: 'bug2', name: 'Delivery Delay', nameHindi: 'डिलीवरी लेट', effects: { customers: -3, funds: -2000 }, description: 'Deliveries delayed badly, refunds issued.' },
  { id: 'bug3', name: 'Employee Quit', nameHindi: 'कर्मचारी भागा', effects: { burn: 1, funds: -3000 }, description: 'Key employee left without notice — chaos!' },
  { id: 'bug4', name: 'Data Leak', nameHindi: 'डेटा लीक', effects: { reputation: -1, customers: -8 }, description: 'Customer data compromised — trust broken!' },
  { id: 'bug5', name: 'Product Defect', nameHindi: 'प्रोडक्ट खराबी', effects: { reputation: -1, customers: -5 }, description: 'Major product defect found — returns pouring in!' },
  { id: 'bug6', name: 'Payment Failure', nameHindi: 'पेमेंट अटका', effects: { funds: -4000 }, description: 'Payment gateway crashed — revenue lost!' },
];

export const STARTUP_PRESETS = [
  { id: 'achaar', name: 'Achaar Manufacturing', nameHindi: 'अचार का बिज़नेस', icon: 'Cherry', description: 'Make and sell homemade pickles' },
  { id: 'chai', name: 'Chai Tapri Chain', nameHindi: 'चाय की टपरी', icon: 'Coffee', description: 'Start a chain of tea stalls' },
  { id: 'textile', name: 'Textile Export', nameHindi: 'कपड़े का एक्सपोर्ट', icon: 'Scissors', description: 'Export Indian textiles globally' },
  { id: 'edtech', name: 'EdTech App', nameHindi: 'एडटेक ऐप', icon: 'GraduationCap', description: 'Build an education technology app' },
  { id: 'farming', name: 'Organic Farming', nameHindi: 'जैविक खेती', icon: 'Wheat', description: 'Organic farm produce business' },
  { id: 'food', name: 'Street Food Chain', nameHindi: 'स्ट्रीट फ़ूड चेन', icon: 'UtensilsCrossed', description: 'Scale up street food into a brand' },
];

export const BURN_COST = { 1: 1000, 2: 3000, 3: 6000 };

export const REP_LABELS = { 1: 'Low', 2: 'Medium', 3: 'High' };
export const BURN_LABELS = { 1: 'Low', 2: 'Medium', 3: 'High' };

export function checkCondition(state, condition) {
  if (!condition) return true;
  const val = state[condition.metric];
  switch (condition.op) {
    case '>=': return val >= condition.val;
    case '<=': return val <= condition.val;
    case '>': return val > condition.val;
    case '<': return val < condition.val;
    case '===': return val === condition.val;
    default: return true;
  }
}

export function getEligibleCards(state) {
  const eligible = ACTION_CARDS.filter(card => {
    if (state.tile < card.minTile || state.tile > card.maxTile) return false;
    if (card.cost > state.funds) return false;
    if (!checkCondition(state, card.condition)) return false;
    return true;
  });

  // Ensure diversity: pick from different categories
  const categories = ['marketing', 'product', 'team', 'bugfix', 'fundraise', 'save'];
  const picked = [];
  const shuffled = [...eligible].sort(() => Math.random() - 0.5);

  // First pass: one from each available category
  for (const cat of categories) {
    const catCard = shuffled.find(c => c.category === cat && !picked.includes(c));
    if (catCard) picked.push(catCard);
    if (picked.length >= 5) break;
  }

  // Fill remaining slots
  for (const card of shuffled) {
    if (picked.length >= 5) break;
    if (!picked.includes(card)) picked.push(card);
  }

  // Always ensure at least one bugfix if bugMeter >= 3
  if (state.bugMeter >= 3 && !picked.some(c => c.category === 'bugfix')) {
    const bugCard = shuffled.find(c => c.category === 'bugfix');
    if (bugCard) {
      picked[picked.length - 1] = bugCard;
    }
  }

  // Always ensure save option
  if (!picked.some(c => c.category === 'save')) {
    const saveCard = shuffled.find(c => c.category === 'save');
    if (saveCard && picked.length >= 2) {
      picked[picked.length - 1] = saveCard;
    }
  }

  return picked.length > 0 ? picked : [ACTION_CARDS.find(c => c.id === 's1')];
}

// Board layout helper: returns rows from top to bottom for rendering
export function getBoardRows() {
  const rows = [];
  for (let rowFromBottom = 4; rowFromBottom >= 0; rowFromBottom--) {
    const startTile = rowFromBottom * 10 + 1;
    const tiles = Array.from({ length: 10 }, (_, i) => startTile + i);
    const isReversed = rowFromBottom % 2 === 1;
    if (isReversed) tiles.reverse();
    rows.push({ tiles, isReversed, rowIndex: rowFromBottom });
  }
  return rows;
}
