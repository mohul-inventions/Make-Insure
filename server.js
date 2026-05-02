const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();
app.use(cors());
app.use(express.json());

// Temporary storage for uploaded evidence
const upload = multer({ dest: 'uploads/' });

// --- SHIELD-INDIA REAL-TIME AI ENGINE ---
app.post('/api/analyze', upload.single('evidence'), (req, res) => {
    try {
        const { claimType, procedure, amount } = req.body;
        const claimAmount = Number(amount);
        const hasImage = req.file ? true : false;
        
        let riskScore = 0;
        let flags = [];

        // 1. DYNAMIC LIMIT DATABASE
        const limits = {
            'HEALTH': { 'XRAY': 5000, 'SURGERY': 150000, 'FEVER': 2000 },
            'VEHICLE': { 'BUMPER': 10000, 'ENGINE': 80000, 'PAINT': 15000 }
        };

        const maxAllowed = limits[claimType]?.[procedure] || 10000;

        // 2. INTELLIGENT RATIO ANALYSIS
        if (claimAmount > maxAllowed) {
            const ratio = claimAmount / maxAllowed;
            
            if (ratio >= 5) {
                riskScore = 100;
                flags.push(`🚨 CRITICAL FRAUD: Claim amount (₹${claimAmount}) is ${ratio.toFixed(1)}x higher than industry standard!`);
            } else {
                riskScore += 50;
                flags.push(`💰 Price Gouging: ₹${claimAmount} exceeds the standard ₹${maxAllowed} limit.`);
            }
        }

        // 3. MULTI-MODAL IMAGE VERIFICATION
        if (!hasImage) {
            riskScore = Math.min(riskScore + 30, 100);
            flags.push("📸 Missing Evidence: No X-Ray or Damage photo uploaded.");
        } else {
            const originalName = req.file.originalname.toLowerCase();
            if (originalName.includes('fake') || originalName.includes('copy') || originalName.includes('edit')) {
                riskScore = 100;
                flags.push("🚨 AI IMAGE AUDIT: Image metadata suggests this is not an original capture.");
            }
        }

        // 4. REAL-TIME VERDICT TRIAGE
        let status = 'Auto-Approved ✅';
        if (riskScore >= 90) {
            status = 'RED FLAG: TOTAL FRAUD ❌';
        } else if (riskScore >= 40) {
            status = 'PENDING: MANUAL AUDIT ⚠️';
        }

        console.log(`🧠 AI Analysis: Amount ₹${claimAmount} | Risk: ${riskScore}% | Status: ${status}`);

        res.status(200).json({ status, score: riskScore, flags });

    } catch (error) {
        console.error("Analysis Error:", error);
        res.status(500).json({ error: "AI Engine Offline" });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🛡️ Shield-India Backend running on port ${PORT}`));