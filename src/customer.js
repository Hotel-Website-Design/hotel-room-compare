import {clean,lines,selected,requireText,number,pence,pounds,section,report,enumValue,webAddress} from './customer-ui.js';
export const config = {
  "title": "Direct Booking Cost Comparison",
  "short": "What could a direct booking be worth?",
  "audience": "For independent hotel owners",
  "summary": "Compare the costs in your own booking scenario, using your commission, payment fees and website costs.",
  "button": "Compare my scenario",
  "filename": "direct-booking-cost-comparison",
  "eyebrow": "Your figures. A clearer picture.",
  "time": "About 3 minutes",
  "outcome": "An illustrative monthly cost comparison with every assumption shown.",
  "layout": "calculator",
  "intro": "Use a consistent monthly room-revenue basis and your actual contract rates. The shift to direct bookings is an assumption you choose, not a prediction.",
  "note": "This is a simplified cost scenario, not a profit or booking forecast. It excludes tax treatment, refunds, cancellations, marketing, staffing and costs you have not entered. Check how your provider defines commissionable revenue.",
  "fields": [
    {
      "id": "revenue",
      "label": "Monthly room revenue to compare (£)",
      "help": "In pounds, for example 4.50. Do not include the £ sign.",
      "required": true,
      "type": "text",
      "maxLength": 180,
      "inputmode": "decimal"
    },
    {
      "id": "ota",
      "label": "Share of that revenue through booking platforms (%)",
      "help": "Use a figure from your own booking records.",
      "type": "number",
      "required": true,
      "min": 0,
      "max": 100,
      "step": "0.01"
    },
    {
      "id": "commission",
      "label": "Platform commission rate (%)",
      "help": "Use the rate and revenue basis from your own agreement. There is no assumed standard rate.",
      "type": "number",
      "required": true,
      "min": 0,
      "max": 100,
      "step": "0.01"
    },
    {
      "id": "shift",
      "label": "Share of platform revenue assumed to move to direct (%)",
      "help": "For example, 10 means one tenth of platform revenue, not ten percentage points of all revenue.",
      "type": "number",
      "required": true,
      "min": 0,
      "max": 100,
      "step": "0.01"
    },
    {
      "id": "direct",
      "label": "Direct payment / booking fee rate (%)",
      "help": "Use the combined percentage cost you want this scenario to include.",
      "type": "number",
      "required": true,
      "min": 0,
      "max": 100,
      "step": "0.01"
    },
    {
      "id": "fixed",
      "label": "Additional monthly website or booking costs (£)",
      "help": "In pounds. Include only extra monthly costs of this direct-booking option. Enter 0 if there are none.",
      "required": true,
      "type": "text",
      "maxLength": 180,
      "inputmode": "decimal"
    }
  ],
  "example": {
    "revenue": "40000",
    "ota": "60",
    "commission": "15",
    "shift": "10",
    "direct": "2",
    "fixed": "100"
  },
  "sources": [
    [
      "Booking.com explains where to find your commission rate",
      "https://join.booking.com/faq.html"
    ]
  ]
};
export function evaluate(v){const revenue=pence(v.revenue,'monthly room revenue'),fixed=pence(v.fixed,'additional monthly costs');const ota=number(v.ota,'platform share',{max:100}),commission=number(v.commission,'commission rate',{max:100}),shift=number(v.shift,'assumed share moved to direct',{max:100}),direct=number(v.direct,'direct fee rate',{max:100});const platform=Math.round(revenue*ota/100),moved=Math.round(platform*shift/100),avoided=Math.round(moved*commission/100),fees=Math.round(moved*direct/100),net=avoided-fees-fixed;return report('Your direct-booking cost scenario','Monthly figures, rounded to the nearest penny. The same room revenue is assumed in both routes.',[section('Assumptions you supplied',['Room revenue: '+pounds(revenue),'Platform share: '+ota+'%; commission: '+commission+'%.','Assumed share of platform revenue moved to direct: '+shift+'%.','Direct percentage fee: '+direct+'%; additional monthly cost: '+pounds(fixed)+'.']),section('How to read the comparison',['Platform revenue in this scenario: '+pounds(platform)+'.','Avoided commission '+pounds(avoided)+' minus direct fees '+pounds(fees)+' minus additional monthly costs '+pounds(fixed)+' = '+pounds(net)+'.',net>0?'Under these assumptions, the entered costs are lower by '+pounds(net)+' per month.':net<0?'Under these assumptions, the entered costs are higher by '+pounds(-net)+' per month.':'The entered cost difference is zero.','This does not show extra bookings, profit or a guaranteed saving. Consider acquisition costs and contract details before making a decision.'])],{metrics:[{label:'Revenue moved to direct',value:pounds(moved)},{label:'Avoided platform commission',value:pounds(avoided)},{label:'New direct percentage fees',value:pounds(fees)},{label:'Net monthly cost reduction',value:pounds(net),detail:net<0?'Negative means higher costs in this scenario.':'After the additional monthly cost you entered.'}]});}
