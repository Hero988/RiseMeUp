"""Regenerate the public, two-page partner brief. Run from any directory.
Uses reportlab and pypdf; equipment data lives beside the partner page.
Only public project information belongs in this brief.
"""
from pathlib import Path
import json
from html import escape
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT / 'public/development-partners/equipment.json').read_text())
OUT = ROOT / 'public/downloads/risemeup-partner-brief-2026-10-21-v6.pdf'
INK = colors.HexColor('#1e1e2a')
GREEN = colors.HexColor('#3d5a3e')
RUST = colors.HexColor('#a65c30')
SAND = colors.HexColor('#f4e8d1')
CREAM = colors.HexColor('#fefaf3')
MUTED = colors.HexColor('#625c50')
W,H=A4
ST = {
 'title':ParagraphStyle('title',fontName='Times-Bold',fontSize=28,leading=30,textColor=INK,spaceAfter=12),
 'h2':ParagraphStyle('h2',fontName='Times-Bold',fontSize=15,leading=18,textColor=GREEN,spaceBefore=13,spaceAfter=7),
 'body':ParagraphStyle('body',fontName='Helvetica',fontSize=9.3,leading=13.1,textColor=INK,spaceAfter=7),
 'small':ParagraphStyle('small',fontName='Helvetica',fontSize=8,leading=10.8,textColor=MUTED,spaceAfter=6),
 'cell':ParagraphStyle('cell',fontName='Helvetica',fontSize=8.3,leading=11.2,textColor=INK),
 'label':ParagraphStyle('label',fontName='Helvetica-Bold',fontSize=8.2,leading=11.2,textColor=GREEN),
}
def p(text,kind='body'): return Paragraph(text,ST[kind])
def header(c,doc):
 c.saveState()
 c.setFillColor(CREAM);c.rect(0,0,W,H,fill=1,stroke=0)
 c.drawImage(str(ROOT/'public/logo.png'),42,H-68,width=133,height=47,preserveAspectRatio=True,mask='auto')
 c.setFillColor(RUST);c.setFont('Helvetica-Bold',8)
 c.drawRightString(W-42,H-40,'VIRGIN MARY FARM | PARTNER BRIEF')
 c.setFillColor(MUTED);c.setFont('Helvetica',8)
 c.drawRightString(W-42,H-55,'21 October 2026 | Version 6')
 c.setStrokeColor(colors.HexColor('#d9cdb7'));c.line(42,H-81,W-42,H-81)
 c.line(42,38,W-42,38)
 c.setFont('Helvetica',7.4);c.drawString(42,25,'Risemeup | Committed to grow rural communities.')
 c.drawRightString(W-42,25,f'{doc.page} / 2')
 c.restoreState()
def table(rows,widths,header_row=False):
 t=Table(rows,colWidths=widths,hAlign='LEFT')
 style=[('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),8),('RIGHTPADDING',(0,0),(-1,-1),8),('TOPPADDING',(0,0),(-1,-1),7),('BOTTOMPADDING',(0,0),(-1,-1),7),('LINEBELOW',(0,0),(-1,-1),.4,colors.HexColor('#ded3be'))]
 if header_row:style += [('BACKGROUND',(0,0),(-1,0),SAND)]
 t.setStyle(TableStyle(style));return t
story=[]
story += [p('Rebuilding starts with water.','title'),p('A proposed farm centred on women affected by war: survivors of sexual violence, widows and mothers raising children alone, across Sudan\'s Coptic Orthodox and Nuba Mountains communities. Farming, skills and livelihoods offer a vision of independence, connection and renewed hope.'),p('<b>Current stage:</b> planning and assessment. The farm is not operational and is not yet ready for equipment delivery. Technical specifications and costs are pending.','small')]
story += [p('Farm status and readiness','h2')]
status=[
 ('Land and rights','Iman confirms a total area of 130 hectares (approximately 321 acres), owned by the Coptic Orthodox Church in Sudan, Khartoum-Omdurman, and permission to use the land. Ownership evidence, surveyed boundaries and written use terms still need review. Cultivable and infrastructure areas await assessment.'),
 ('Water and damage','The farm was destroyed during the war. Iman reports all seven wells destroyed and all pumping equipment stolen. New water storage must be built. A technical assessment must establish rehabilitation or replacement needs and water availability; no operational supply is confirmed.'),
 ('Visit and access','On 21 October, Iman reported a visit last week: approximately mid-October 2026; exact date unconfirmed. This is not a confirmed technical assessment. A dated technical report is still needed. With the war ongoing, safe access must be checked before each visit or delivery. Secure equipment storage remains unconfirmed.'),
 ('Management and status','Iman coordinates partner enquiries and machinery-donation paperwork. She identifies Bishop Sarabon and farm manager Jhone Wadeea as the Sudan contacts. Custody and maintenance roles need documentation. Risemeup is not registered in the UK.')]
story += [table([[p(a,'label'),p(b,'cell')] for a,b in status],[99,W-84-99])]
story += [p('A proposed first stage, with clear decision points','h2')]
steps=[
 '<b>1. Assess and agree:</b> confirm land-use terms, local responsibilities and safe access; assess all seven destroyed wells and the feasibility of rehabilitation or replacement, including water availability and quality.',
 '<b>2. Design and cost:</b> plan an initial viable water source and new water storage; define the growing and training area; obtain quotations and agree the budget, asset ownership and funding arrangements.',
 '<b>3. Install and hand over:</b> establish secure custody, deliver compatible equipment, commission the system and train named operators with a maintenance schedule.',
 '<b>4. Grow and review:</b> run a supervised growing and training cycle, record water use, participation, costs and crop performance, then review expansion with communities and partners.'
]
story += [p(x) for x in steps]
story += [p('The full vision remains Virgin Mary Farm','h2'),p('Ten planned greenhouses, biogas, poultry, produce handling and sustainable farming education remain the wider ambition. The Mango Project is a supporting subproject. The 19 November 2018 proposal is historical background, not the immediate post-war delivery sequence or a current budget.','small')]
story += [PageBreak(),p('A defined contribution. A shared plan.','title')]
story += [p('Equipment priorities and budget status','h2')]
short_specs=[
 'Well works as assessed; pump, pipes, cables and protection.',
 'Panels, mounting and controls matched to the pump.',
 'New tanks, supports, filters and valves; size after assessment.',
 'Pipes and drip network sized to the initial growing area.',
 'Hand tools, protective equipment and teaching materials.',
 'Secure storage, mounting and asset-custody arrangements.'
]
short_qty=['1 initial water-source system, if viable','1 matched power package','1 system; tank count / size pending','1 area; hectares / length pending','1 package; tool counts pending','1 site package; scope pending']
rows=[[p('Equipment / purpose','label'),p('Provisional quantity and specification','label')]]
for i,item in enumerate(DATA['items']):
 rows.append([p(f"<b>{escape(item['name'])}</b>",'cell'),p(escape(short_qty[i])+'. '+escape(short_specs[i]),'cell')])
story += [table(rows,[192,W-84-192],True),Spacer(1,7),p('<b>Every item: cost awaiting quotation.</b> Proposed operators include a local pump operator, irrigation caretaker, trainer and site custodian, supported by qualified suppliers. Names, service agreements and maintenance budgets are not yet confirmed. Detailed purposes, specifications and responsibilities are listed on the partner webpage.','small')]
story += [p('Budget summary: no total funding request set','h2'),p('Cost areas awaiting quotations: site and seven-well assessment; well rehabilitation or replacement, pump and solar power; new storage and irrigation; installation and delivery; security and custody; training, tools and first-season inputs. Maintenance and contingency await a costed plan. Unknown costs are not zero. Quotations must include currency, date, applicable charges, installation and warranty.','small')]
story += [p('Community benefit and accountability','h2'),p('Iman confirms that donated machinery and project equipment are intended to belong to <b>Virgin Mary Farm together with Risemeup</b>, for community benefit. Land ownership remains with the Church. Legal title, donor conditions, custody, maintenance and disposal rules require written agreements with the Church and donors before acceptance or delivery. Women would help shape training without disclosing trauma; farming does not replace specialist care. Income use, financial controls, safeguarding and complaints arrangements require agreement and adoption before activities begin.','small')]
story += [p('Measure progress, protect evidence','h2'),p('<b>SDGs 7, 9, 10 and 12:</b> proposed measures include renewable energy generated, wells commissioned, water delivered, hectares irrigated, training participation and completion, and organic material reused. Targets and baselines await assessment. Alignment is not UN approval, certification or endorsement.','small'),p('Food-support photographs and the founder\'s account are available online; exact photograph dates and distribution totals remain unverified. References require records and permission. Land documents, well records, quotations and other sensitive supporting evidence can be discussed privately, subject to availability.','small')]
story += [p('Contact Iman Tadros | Founder, Risemeup','h2'),p('<link href="mailto:i.tradros@risemeup.org" color="#3d5a3e">i.tradros@risemeup.org</link> | +44 786 797 7844<br/><link href="https://www.risemeup.org/development-partners/" color="#3d5a3e">www.risemeup.org/development-partners/</link>','body')]
OUT.parent.mkdir(parents=True,exist_ok=True)
doc=SimpleDocTemplate(str(OUT),pagesize=A4,rightMargin=42,leftMargin=42,topMargin=96,bottomMargin=49,title='Virgin Mary Farm - Risemeup partner brief - 21 October 2026',author='Risemeup',pageCompression=1)
doc.build(story,onFirstPage=header,onLaterPages=header)
reader=PdfReader(OUT)
assert len(reader.pages)==2, f'Expected two pages, got {len(reader.pages)}'
print(f'Created {OUT.name}: {len(reader.pages)} pages, {OUT.stat().st_size} bytes')
