import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

type Step = { n: string; title: string; bullets: string[]; color: string; icon: string };
type Card = { name: string; status?: string; value?: string; bullets?: string[]; score?: string; tag?: string };
type Slide = {
  module: string;
  brand: string;
  brandAccent: string;
  accent: string;
  subtitle: string;
  whatTitle: string;
  whatBody: string;
  eyebrow: string;
  headline: string;
  headlineItalic: string;
  pipeline: string;
  steps: Step[];
  cards: Card[];
  type: 'denial' | 'frontdesk' | 'revenue' | 'analytics';
};

const slides: Record<string, Slide> = {
  denialshield: {
    module: 'denialshield', brand: 'Denial', brandAccent: 'Shield', accent: '#14b8a6', subtitle: 'Agentic AI-Powered Claim Denial Prevention',
    whatTitle: 'WHAT IS DENIALSHIELD',
    whatBody: 'DenialShield analyzes every claim before submission, identifies potential denial risks across denial categories, and provides specific AI recommendations to prevent them — protecting revenue before the claim ever leaves your system.',
    eyebrow: 'HOW DENIALSHIELD WORKS', headline: 'Claims Analyzed Before Submission —', headlineItalic: 'Denials Stopped Before They Happen',
    pipeline: '4-STEP OVERNIGHT PROCESSING WORKFLOW', type: 'denial',
    steps: [
      { n:'01', title:'Claims\nIngested', icon:'📥', color:'#3b82f6', bullets:['Batch from EMR nightly','Every claim scanned','No sampling — 100% coverage'] },
      { n:'02', title:'AI Analyzes\nPatterns', icon:'🧠', color:'#7c3aed', bullets:['Checks 24+ denial patterns','9 denial categories','Payer rules + NCCI edits'] },
      { n:'03', title:'Flags Surface\nby Morning', icon:'🚨', color:'#f97316', bullets:['Worklist ready at 9 AM','Issue + fix per claim','AI confidence score 0–100'] },
      { n:'04', title:'Team Acts\n& Corrects', icon:'✅', color:'#14b8a6', bullets:['Human review before submit','Apply / dismiss flow','No auto-write until Phase 3'] }
    ],
    cards: ['DEBLOIS JAMES','COBB GEORGE KENDALL','PLOSS JOHN','LAYMAN SABRINA ANN','BUTLER JEFFREY SCOTT','SUZUKI KEN MICHAEL','VAILAS MARYANN','LUCKY MELISSA A','BAGLEY ROBERT THOMAS','AHERRERA DEBORAH'].map((name, i) => ({ name, tag: i===2 || i===5 || i===8 ? 'Medium opportunity' : 'High opportunity', value: i===2 ? '$481.77' : i===7 ? '$149.85' : i===9 ? '$641.91' : i>2 ? '$598.20' : '$438.06' }))
  },
  frontdeskshield: {
    module: 'frontdeskshield', brand: 'FrontDesk', brandAccent: 'Shield', accent: '#10b981', subtitle: 'Pre-Service Revenue Protection Platform',
    whatTitle: 'WHAT IS FRONTDESKSHIELD?',
    whatBody: 'FrontDeskShield™ is an AI-driven pre-service verification platform that resolves eligibility, credentialing, COB, and prior authorization gaps before the patient arrives — assigning every visit a Claim Payability Confidence (CPC) score of 0–100 so your front desk knows exactly what to clear, hold, or fix.',
    eyebrow: 'HOW FRONTDESKSHIELD WORKS', headline: 'Stop Denials Before They Start —', headlineItalic: 'AI-Driven Pre-Service Verification for Every Patient, Every Visit',
    pipeline: '6-MODULE AUTOMATED VERIFICATION PIPELINE', type: 'frontdesk',
    steps: [
      { n:'01', title:'Eligibility\n& Benefits', icon:'🔍', color:'#3b82f6', bullets:['Real-time payer query','Copay / deductible','Visit limit tracking'] },
      { n:'02', title:'Credentialing\nVerification', icon:'🏥', color:'#f59e0b', bullets:['NPI & panel status','CAQH ProView sync','Gap & expiry alerts'] },
      { n:'03', title:'COB\nResolver', icon:'🔗', color:'#ef4444', bullets:['Dual payer detection','Billing order confirm','CO-22 prevention'] },
      { n:'04', title:'Prior Auth\nIntelligence', icon:'📋', color:'#8b5cf6', bullets:['PA required check','On-file verification','Doc readiness scan'] },
      { n:'05', title:'CPT &\nModifier Review', icon:'📄', color:'#14b8a6', bullets:['Payability scoring','Modifier flag logic','Payer-rule lookup'] },
      { n:'06', title:'CPC Shield\nDecision', icon:'🛡️', color:'#10b981', bullets:['Risk score 0–100','Clear / Hold / Fix','Claim Payability Conf.'] }
    ],
    cards: []
  },
  revenueshield: {
    module: 'revenueshield', brand: 'Revenue', brandAccent: 'Shield', accent: '#2563eb', subtitle: 'AI-Powered Coding & Charge Capture Platform',
    whatTitle: 'WHAT IS REVENUESHIELD',
    whatBody: 'RevenueShield reads clinical documentation, generates optimized ICD-10 & CPT codes with evidence spans, scores denial risk per payer, and surfaces everything in a coder-facing Work Queue — transforming notes into payer-ready claims automatically.',
    eyebrow: 'HOW REVENUESHIELD WORKS', headline: 'From Clinical Note to Payer-Ready Claim —', headlineItalic: 'Reads, Codes, Scores & Submits',
    pipeline: '6-STEP END-TO-END AI PIPELINE — NOTE TO CLEARINGHOUSE', type: 'revenue',
    steps: [
      { n:'01', title:'EMR Note\nSigned', icon:'🏥', color:'#3b82f6', bullets:['FHIR R4 webhook trigger','<1s note ingestion','Epic, Cerner, Athena'] },
      { n:'02', title:'AI Parallel\nExtraction', icon:'⚡', color:'#10b981', bullets:['3 GPT agents in parallel','Diagnoses, procedures, billing','3.2s avg latency'] },
      { n:'03', title:'Code\nPrediction', icon:'🧠', color:'#8b5cf6', bullets:['ClinicalBERT multi-label','ICD-10 + CPT + modifiers','92.4% top-5 recall'] },
      { n:'04', title:'Denial Risk\nScored', icon:'🛡️', color:'#f43f5e', bullets:['Per-payer XGBoost model','NCCI bundling detection','AUC-ROC > 0.85'] },
      { n:'05', title:'Coder\nReview', icon:'👤', color:'#0ea5e9', bullets:['Pre-populated Work Queue','Evidence spans highlighted','2.4 min avg review'] },
      { n:'06', title:'Claim\nSubmitted', icon:'📥', color:'#f59e0b', bullets:['FHIR write-back to EMR','837P to clearinghouse','Revenue captured'] }
    ],
    cards: ['WILKERSON, APRIL','AJAYI, JERI H','KIMBERLY M ACUFF','WOLSKIJ, HARRISON','JONES, HOLLY'].map((name) => ({ name, tag:'Medium', status:'Needs Review' }))
  },
  'rcm-analytics': {
    module: 'rcm-analytics', brand: 'RCM', brandAccent: 'Analytics', accent: '#a855f7', subtitle: 'AI-Powered Enterprise\nPerformance Intelligence',
    whatTitle: 'WHAT IS RCM ANALYTICS?',
    whatBody: 'SCALE+ RCM Analytics is a comprehensive healthcare Revenue Cycle Management analytics platform that gives billing teams, operations managers, and executives complete stage-by-stage visibility across every dimension of the revenue cycle — from patient registration through revenue realization. Built with real-time data integration, drill-through to claim level, and AI-powered natural language Q&A — so leadership can course-correct in real time, not weeks later.',
    eyebrow: 'HOW RCM ANALYTICS WORKS', headline: 'RCM Intelligence Platform —', headlineItalic: 'Stage-by-stage diagnostics · Real-time KPIs · AI-powered insights across the entire revenue cycle',
    pipeline: '10+ ANALYTICS MODULES', type: 'analytics',
    steps: [
      { n:'01', title:'KPI Diagnostics\nNavigator', icon:'', color:'#9b59b6', bullets:['Stage health gauges','18 KPIs with drill'] },
      { n:'02', title:'Executive\nSummary', icon:'', color:'#9b59b6', bullets:['C-suite dashboard','charges, AR, NCR, MoM'] },
      { n:'03', title:'Volume &\nProductivity', icon:'', color:'#2980b9', bullets:['Claims, visits, CPT','mix, provider output'] },
      { n:'04', title:'Payments\n& Charges', icon:'', color:'#2980b9', bullets:['GCR, payer class','MoM payment trends'] },
      { n:'05', title:'Cash & Lag\nAnalysis', icon:'', color:'#27ae60', bullets:['Claim lag, payment lag','cash waterfall, 12-mo'] },
      { n:'06', title:'Denial\nManagement', icon:'', color:'#c0392b', bullets:['Denial trends, root-cause','facility-level alerts'] },
      { n:'07', title:'AR &\nCollections', icon:'', color:'#c0392b', bullets:['AR aging, Days in AR','risk stratification'] },
      { n:'08', title:'Facility\n360°', icon:'', color:'#27ae60', bullets:['Full scorecard per facility','all KPIs in one view'] }
    ],
    cards: []
  }
};

@Component({
  selector: 'app-slide-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <main class="slide-web-page" [ngClass]="slide.type" [style.--accent]="slide.accent">
      <aside class="left-panel">
        <div class="left-content">
          <div class="scale">SCALE HEALTHCARE</div>
          <div class="brand"><span>{{ slide.brand }}</span><span class="accent">{{ slide.brandAccent }}</span><sup *ngIf="slide.type !== 'analytics'">™</sup></div>
          <div class="sub" [innerText]="slide.subtitle"></div>
          <div class="rule"></div>
          <div class="what">{{ slide.whatTitle }}</div>
          <p>{{ slide.whatBody }}</p>
        </div>
        <div class="copyright" *ngIf="slide.type === 'frontdesk'">© 2025 Scale Healthcare · scale.health</div>
      </aside>
      <section class="canvas-area">
        <div class="eyebrow">{{ slide.eyebrow }}</div>
        <h1>{{ slide.headline }} <em>{{ slide.headlineItalic }}</em></h1>
        <div class="pipeline">{{ slide.pipeline }}</div>
        <div class="steps" [class.analytics-steps]="slide.type === 'analytics'">
          <article class="step" *ngFor="let step of slide.steps" [style.--step]="step.color">
            <div class="bar"></div>
            <div class="num">{{ step.n }}</div><div class="icon" *ngIf="step.icon">{{ step.icon }}</div>
            <h3 [innerText]="step.title"></h3>
            <ul><li *ngFor="let b of step.bullets">{{ b }}</li></ul>
          </article>
        </div>

        <ng-container [ngSwitch]="slide.type">
          <section *ngSwitchCase="'denial'" class="claim-grid">
            <article class="claim" *ngFor="let c of slide.cards; let i = index">
              <div class="claim-top"><span>{{ 335784 + i * 37 }}</span><b>{{ c.tag }}</b></div>
              <h4>{{ c.name }}</h4><div class="small-label">Current Value:</div><div class="value">{{ c.value }}</div>
              <div class="chips"><span>{{ i % 3 }} Errors</span><span>{{ i % 2 }} Warnings</span></div>
              <p>{{ i % 2 ? 'BCBS-NH: MATTHEW THORNTON BLUE' : 'BCBS-WA REGENCE (PPO)' }}</p>
              <div class="claim-foot"><strong>90%</strong> Complete <span>{{ 174 - i % 4 }} Days left</span></div>
              <button>ⓘ AI Suggested Actions →</button>
            </article>
          </section>

          <section *ngSwitchCase="'frontdesk'" class="verified-card">
            <header>James Wilson — Verified ✓ <span>08:00 AM · Dr. Carter · Aetna PPO</span></header>
            <div class="verify-cols">
              <div><h4>ELIGIBILITY & BENEFITS</h4><p>✓ Active coverage confirmed<br><small>Effective 01/01/2025 · In-Network · Aetna PPO</small></p><p>✓ CPT 99213 covered<br><small>No exclusions · Standard office visit</small></p><p>– No secondary coverage<br><small>Single payer · No COB</small></p><p>– Referral<br><small>Not required — PPO plan</small></p></div>
              <div><h4>CREDENTIALING</h4><p>✓ Dr. Carter — Credentialed<br><small>NPI verified · Active · Aetna</small></p><p>✓ Facility in-network<br><small>Group NPI confirmed</small></p><p>✓ No credentialing gap<br><small>Renewal: 14 months remaining</small></p></div>
            </div>
            <footer><span>✓ CHECKED IN</span><b>• AI VERIFIED</b> Result written back to EMR · Denial risk score logged</footer>
          </section>

          <section *ngSwitchCase="'revenue'" class="coder-board">
            <article class="coder-card" *ngFor="let c of slide.cards; let i = index">
              <div class="coder-top"><span>2 {{126313 + i * 8996}} 20260323</span><b>● Medium</b></div>
              <h4>{{ c.name }}</h4><p>MRN: {{ 126313 + i * 4889 }} <span>Status: Needs Review</span></p>
              <h5>AI Recommendations:</h5><div class="rec">⚡ The provider sees an established patient for an office visit or other outpatient visit involving evaluation and management. <br><b>Impact: $0.00</b></div>
              <div class="rec">⚡ Hyperlipidemia, unspecified (ICD-10 E78.5)<br><b>Impact: $0.00</b></div>
              <button>ⓘ AI Suggested Actions →</button>
            </article>
          </section>

          <section *ngSwitchCase="'analytics'" class="analytics-board">
            <aside><div class="analytics-logo">SCALE<span>+</span><br>Analytics</div><nav><b>Executive Summary</b><span>Volume & Productivity</span><span>Payments & Charges</span><span>Cash & Lag</span><span>Adjustments</span><span>Denial Management</span><span>AR & Collections</span><span>Facility 360</span></nav></aside>
            <div class="dash"><div class="toolbar"><button>← Back to KPI Navigator</button><b>Data as of : 3/5/2026</b></div><div class="kpis"><div *ngFor="let k of kpis"><small>{{ k.t }}</small><strong>{{ k.v }}</strong><span>Variance / Variance %</span></div></div><div class="charts"><div><h4>Charges & Payments — TTM vs Prior TTM</h4><div class="linechart"></div></div><div><h4>Total AR by Month</h4><div class="linechart ar"></div></div></div></div>
          </section>
        </ng-container>
      </section>
    </main>
  `,
  styles: [`
    :host{display:block;background:#fff;color:#111827;font-family:'Plus Jakarta Sans',Arial,sans-serif;min-height:100vh}.slide-web-page{display:grid;grid-template-columns:610px 1fr;min-height:100vh;overflow:hidden}.left-panel{background:#0d1a29;color:white;position:relative}.left-content{padding:315px 58px 40px}.scale{letter-spacing:10px;color:#b8c5d7;font-size:18px;font-weight:600;margin-bottom:58px}.brand{font-family:'DM Serif Display',Georgia,serif;font-size:54px;line-height:1;font-weight:700}.brand .accent{color:var(--accent)}.brand sup{font:600 14px 'Plus Jakarta Sans';margin-left:4px}.sub{font-size:16px;font-style:italic;color:#a8b4c4;margin-top:24px;white-space:pre-line}.rule{height:3px;background:var(--accent);width:490px;margin:28px 0}.what{color:var(--accent);letter-spacing:8px;font-size:18px;font-weight:800;margin-bottom:24px}.left-panel p{font-size:24px;line-height:1.42;margin:0;max-width:500px}.copyright{position:absolute;bottom:36px;left:60px;color:#466077;font-size:13px}.canvas-area{padding:82px 64px 55px;background:#fff}.eyebrow{color:#0f766e;letter-spacing:10px;font-weight:800;font-size:16px}.revenue .eyebrow,.analytics .eyebrow{color:#1e3a8a}.frontdesk .eyebrow{color:#047857}h1{font-family:'DM Serif Display',Georgia,serif;font-size:47px;line-height:1.08;margin:12px 0 70px;white-space:nowrap;overflow:hidden}h1 em{font-weight:400;color:#8aa0b6}.pipeline{letter-spacing:8px;color:#7b8da0;font-size:15px;font-weight:800;margin-bottom:18px}.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:50px}.frontdesk .steps,.revenue .steps{grid-template-columns:repeat(6,1fr);gap:7px}.steps.analytics-steps{grid-template-columns:repeat(8,1fr);gap:14px;margin-bottom:18px}.step{position:relative;background:#fff;border:1px solid #dfe3e8;box-shadow:0 5px 16px #00000014;padding:30px 20px 24px;min-height:230px}.analytics .step{min-height:150px;padding:18px 16px}.bar{position:absolute;top:0;left:0;right:0;height:9px;background:var(--step)}.num{color:var(--step);font-family:'DM Mono',monospace;font-size:20px;font-weight:800;letter-spacing:2px}.analytics .num{background:var(--step);color:white;display:inline-block;padding:7px 15px;font-size:14px}.icon{position:absolute;right:22px;top:22px;font-size:35px;background:#f4fbfa;padding:6px 11px}h3{font-size:22px;line-height:1.2;margin:28px 0 18px;white-space:pre-line}.analytics h3{font-size:16px;margin:15px 0 12px}.step ul{padding:0;margin:0;list-style:none}.step li{font-size:17px;color:#536475;margin:13px 0}.analytics .step li{font-size:12px;line-height:1.45}.step li:before{content:'●';color:var(--step);margin-right:9px}.analytics .step li:before{display:none}.claim-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:18px 20px;max-width:1560px;margin:0 auto}.claim{border:1px solid #e5e7eb;box-shadow:0 1px 8px #0000000d;padding:18px 18px 14px}.claim-top{display:flex;justify-content:space-between;font-size:11px;color:#94a3b8}.claim-top b{color:#ef3f74}.claim h4,.coder-card h4{font-size:13px;color:#316bdc;margin:8px 0 18px}.small-label{font-weight:800;font-size:11px;color:#64748b}.value{font-size:31px;font-weight:800;text-align:center;margin:6px}.chips span{font-size:10px;background:#fee2e2;color:#ef3f74;padding:5px 8px;border-radius:12px;margin-right:4px}.claim p{font-size:10px;color:#475569;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.claim-foot{font-size:11px;color:#475569;display:flex;justify-content:space-between}.claim-foot strong{color:#2563eb}.claim button,.coder-card button{width:80%;border:0;background:#dceeff;color:#3b82f6;font-weight:700;font-size:11px;padding:8px;margin-top:14px}.verified-card{width:1450px;margin:40px auto 0;border:1px solid #e5e7eb;box-shadow:0 2px 12px #0000000f}.verified-card header{background:#dffbef;color:#059669;font-weight:800;padding:26px;font-size:18px}.verified-card header span{display:block;color:#64748b;font-size:11px;margin-top:10px}.verify-cols{display:grid;grid-template-columns:1.7fr 1fr;gap:30px;padding:28px}.verify-cols h4{font-size:11px;color:#64748b;letter-spacing:3px}.verify-cols p{border-bottom:1px solid #e5e7eb;padding:10px 0;font-weight:700;font-size:13px}.verify-cols small{color:#64748b;font-weight:400}.verified-card footer{background:#f4f6fb;padding:18px 28px;font-size:12px;color:#64748b}.verified-card footer span{background:#dffbef;color:#059669;padding:10px 22px;margin-right:20px;font-weight:900}.verified-card footer b{background:#ede9fe;color:#7c3aed;padding:7px 14px;margin-right:10px}.coder-board{border:1px solid #222;padding:16px;display:grid;grid-template-columns:repeat(5,1fr);gap:18px;margin:140px 20px 0}.coder-card{border:1px solid #e5e7eb;padding:18px}.coder-top{display:flex;justify-content:space-between;font-size:10px;color:#94a3b8}.coder-top b{color:#f59e0b}.coder-card p{font-size:11px}.coder-card p span{float:right}.coder-card h5{font-size:11px;color:#64748b}.rec{background:#fffbea;border-left:3px solid #f59e0b;padding:12px;margin:9px 0;font-size:10px;color:#64748b}.analytics-board{display:grid;grid-template-columns:245px 1fr;border-left:2px solid #d1d5db;min-height:800px}.analytics-board aside{border-right:2px solid #d1d5db;padding:18px}.analytics-logo{font-size:35px;font-weight:800;color:#555;line-height:.9;margin:0 0 28px}.analytics-logo span{color:#ec4899}.analytics-board nav{display:flex;flex-direction:column;gap:16px;font-size:13px}.analytics-board nav b{background:#3b82f6;color:white;padding:12px 18px;border-radius:6px}.dash{padding:16px 38px}.toolbar{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}.toolbar button{background:#ec00c9;color:white;border:0;border-radius:22px;padding:10px 28px;font-weight:800}.toolbar b{color:#ef4444}.kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:22px}.kpis div{border:1px solid #d8dee9;border-radius:10px;padding:18px;background:#f8fcff}.kpis small{display:block;color:#64748b;font-weight:800}.kpis strong{font-size:26px;display:block;margin:8px 0}.kpis span{color:#10b981;font-size:12px}.charts{display:grid;grid-template-columns:1fr 1fr;gap:42px;margin-top:24px}.charts>div{border:1px solid #d8dee9;border-radius:10px;padding:20px;height:285px}.linechart{height:200px;background:linear-gradient(160deg,transparent 0 20%,#e0f7fb 20% 22%,transparent 22% 40%,#e0f7fb 40% 42%,transparent 42% 60%,#e0f7fb 60% 62%,transparent 62%),repeating-linear-gradient(0deg,#fff,#fff 39px,#e5e7eb 40px)}.linechart.ar{background:linear-gradient(145deg,transparent 0 22%,#d1fae5 22% 24%,transparent 24% 48%,#d1fae5 48% 50%,transparent 50%),repeating-linear-gradient(0deg,#fff,#fff 39px,#e5e7eb 40px)}@media(max-width:1200px){.slide-web-page{grid-template-columns:1fr}.left-content{padding:60px}.canvas-area{overflow:auto}.left-panel p{max-width:900px}.steps,.frontdesk .steps,.revenue .steps,.steps.analytics-steps{grid-template-columns:repeat(2,1fr)}.claim-grid,.coder-board,.kpis,.charts{grid-template-columns:1fr 1fr}.verified-card{width:auto}.left-panel{min-height:620px}}
  `]
})
export class SlidePageComponent {
  kpis = [
    { t: 'Total Charges', v: '$53.75M' }, { t: 'Total Payments', v: '$14.05M' },
    { t: 'Total Adjustments', v: '$34.67M' }, { t: 'Total AR', v: '$14.37M' },
    { t: 'AR % > 90 Days', v: '69.84%' }, { t: 'Net Collection Rate', v: '71.55%' },
    { t: 'Revenue Per Visit', v: '$153.56' }, { t: 'Denials Rate', v: '24.12%' }
  ];
  slide: Slide;
  constructor(route: ActivatedRoute) {
    const key = route.snapshot.paramMap.get('module') || 'denialshield';
    this.slide = slides[key] || slides['denialshield'];
  }
}
