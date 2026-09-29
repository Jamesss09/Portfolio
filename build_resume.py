"""
Generates a one-page, ATS-friendly resume PDF for James Carl Enquig.
All content is sourced from my-portfolio/shared/portfolio.ts (single source of truth)
plus the brand palette in pdf_text.txt.
"""

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

# ---------------------------------------------------------------- palette
# Neutral grayscale throughout. The Royal Purple brand palette is intentionally
# not used here: resumes need to photocopy and print well, and stay legible to
# applicant-tracking systems.
INK = HexColor("#1C1C1C")   # name, skill labels
DARK = HexColor("#3A3A3A")  # role line, section headings
TEXT = HexColor("#2B2B2B")  # body copy
MUTED = HexColor("#6E6E6E")  # secondary/meta copy
HAIR = HexColor("#D4D4D4")  # light rules, grid dividers
RULE = HexColor("#BFBFBF")  # section rule
TINT = HexColor("#F4F4F4")  # availability panel fill

OUT = "James_Carl_Enquig_Resume.pdf"

PAGE_W, PAGE_H = A4
MARGIN = 15 * mm
CONTENT_W = PAGE_W - 2 * MARGIN

# ---------------------------------------------------------------- styles
def style(name, **kw):
    base = dict(fontName="Helvetica", fontSize=9.4, leading=13, textColor=TEXT,
                alignment=TA_LEFT, spaceBefore=0, spaceAfter=0)
    base.update(kw)
    return ParagraphStyle(name, **base)


S_NAME = style("name", fontName="Helvetica-Bold", fontSize=23, leading=26,
               textColor=INK, spaceAfter=2)
S_ROLE = style("role", fontName="Helvetica", fontSize=10.4, leading=13.5,
               textColor=DARK, spaceAfter=7)
S_CONTACT = style("contact", fontSize=8.5, leading=12.4, textColor=MUTED)
S_SECTION = style("section", fontName="Helvetica-Bold", fontSize=9.6, leading=12,
                  textColor=DARK)
S_BODY = style("body")
S_ITEM_TITLE = style("item_title", fontName="Helvetica-Bold", fontSize=10, leading=13)
S_ITEM_META = style("item_meta", fontSize=8.6, leading=12, textColor=MUTED)
S_BULLET = style("bullet", fontSize=9.2, leading=12.8, leftIndent=10, bulletIndent=1,
                 spaceAfter=1.5)
S_SKILLKEY = style("skillkey", fontName="Helvetica-Bold", fontSize=8.8, leading=12.4,
                   textColor=INK)
S_SKILLVAL = style("skillval", fontSize=8.8, leading=12.4, textColor=TEXT)
S_NOTE = style("note", fontSize=8.3, leading=11.4, textColor=MUTED)


# ---------------------------------------------------------------- helpers
def section(c, title):
    """Section heading with a hairline rule, drawn on the flowable canvas."""
    flow = [Paragraph(title, S_SECTION), Spacer(1, 3)]
    table = Table([[""]], colWidths=[CONTENT_W], rowHeights=[0.9])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), HAIR),
        ("LINEBELOW", (0, 0), (-1, -1), 0, RULE),
    ]))
    flow += [table, Spacer(1, 6)]
    return flow


def bullets(c, items):
    return [Paragraph(t, S_BULLET, bulletText="\u2022") for t in items]


# ---------------------------------------------------------------- content
NAME = "JAMES CARL ENQUIG"
ROLE = "IT Student &middot; Aspiring Web Developer &middot; AI-Assisted Development"

CONTACT = (
    "Ubay, Bohol, Philippines &nbsp;&middot;&nbsp; "
    "<a href='mailto:jamescarlenquig26@gmail.com' color='#3A3A3A'>"
    "jamescarlenquig26@gmail.com</a> &nbsp;&middot;&nbsp; "
    "<a href='https://github.com/Jamesss09' color='#3A3A3A'>github.com/Jamesss09</a>"
)

PROFILE = (
    "Fourth-year Information Technology student at Trinidad Municipal College with hands-on "
    "experience across the modern web stack &mdash; React and TypeScript on the frontend, "
    "PHP and Laravel on the backend. Currently deepening my focus on AI-assisted development: "
    "applying computer vision and deep learning to solve practical, real-world problems. "
    "Comfortable working end to end, from schema design to interface polish, and actively seeking "
    "an internship or collaboration where I can contribute and keep learning."
)

EDUCATION = [
    ("Trinidad Municipal College", "BS Information Technology &middot; 4th Year (in progress)"),
    ("Ubay, Bohol, Philippines", ""),
]

EDU_BULLETS = [
    "Capstone track: AI/ML-assisted systems development.",
    "Core coursework spans web development, database systems, and IT fundamentals.",
]

PROJECTS = [
    {
        "title": "TMC Entrance Examination: Answer Sheet Recognition and Scoring System",
        "meta": "Ongoing &middot; Individual Capstone Project",
        "repo": "github.com/Jamesss09/Capstone",
        "blurb": (
            "An end-to-end examination automation system that replaces manual grading. "
            "Answer sheets are captured through an Android camera or uploaded, recognized by a "
            "computer-vision model, scored against the official answer key as Passed/Failed, and "
            "the results are managed through a dedicated web platform."
        ),
        "bullets": [
            "Built the recognition pipeline in <b>Python</b> with <b>PyTorch</b> and <b>OpenCV</b> "
            "to detect and read handwritten answer bubbles from captured sheets.",
            "Developed the results interface in <b>React</b> and <b>Tailwind CSS</b>, backed by a "
            "<b>Laravel</b> + <b>MySQL</b> service for exam keys, scores, and records.",
            "Designed a mobile capture flow so sheets can be scanned on an Android device without "
            "specialized hardware.",
        ],
    },
]

SKILLS = [
    ("Frontend", "React.js, JavaScript, TypeScript, Tailwind CSS"),
    ("Backend", "PHP, Laravel, Blade"),
    ("Database", "MySQL, PostgreSQL"),
    ("Mobile", "React Native, Android"),
    ("AI / ML", "PyTorch, OpenCV, model development (foundational)"),
    ("Server / Environment", "Apache, Docker"),
    ("Version Control", "Git, GitHub"),
    ("Design", "Figma, UI/UX design fundamentals"),
]

FOCUS = [
    "Web Development &mdash; React, TypeScript, Tailwind, deployment",
    "UI/UX Design &mdash; design systems, layout, user flows",
    "Backend Development &mdash; Laravel, PHP, Blade, Docker",
    "AI / Models &mdash; exploring what is practical to build",
]


# ---------------------------------------------------------------- build
def build():
    doc = BaseDocTemplate(
        OUT, pagesize=A4,
        leftMargin=MARGIN, rightMargin=MARGIN,
        topMargin=12 * mm, bottomMargin=12 * mm,
        title="James Carl Enquig - Resume",
        author="James Carl Enquig",
        subject="Resume",
    )
    frame = Frame(MARGIN, 12 * mm, CONTENT_W, PAGE_H - 24 * mm, id="main",
                  leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)

    doc.addPageTemplates([PageTemplate(id="resume", frames=[frame])])

    story = []

    # --- header
    story += [
        Paragraph(NAME, S_NAME),
        Paragraph(ROLE, S_ROLE),
        Paragraph(CONTACT, S_CONTACT),
        Spacer(1, 9),
    ]

    # --- profile
    story += section(None, "PROFILE")
    story += [Paragraph(PROFILE, S_BODY), Spacer(1, 9)]

    # --- education
    story += section(None, "EDUCATION")
    edu_rows = []
    for org, detail in EDUCATION:
        left = Paragraph(org, S_ITEM_TITLE)
        right = "" if not detail else Paragraph(detail, S_ITEM_META)
        edu_rows.append([left, right])
    edu_tbl = Table(edu_rows, colWidths=[CONTENT_W * 0.5, CONTENT_W * 0.5])
    edu_tbl.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("ALIGN", (1, 0), (1, -1), "RIGHT"),
    ]))
    story += [edu_tbl, Spacer(1, 3)]
    story += bullets(None, EDU_BULLETS)
    story += [Spacer(1, 9)]

    # --- projects
    story += section(None, "PROJECTS")
    for p in PROJECTS:
        head = Table(
            [[Paragraph(p["title"], S_ITEM_TITLE),
              Paragraph(f"{p['meta']}<br/><font color='#5A5A5A'>{p['repo']}</font>",
                        S_ITEM_META)]],
            colWidths=[CONTENT_W * 0.60, CONTENT_W * 0.40],
        )
        head.setStyle(TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("ALIGN", (1, 0), (1, -1), "RIGHT"),
        ]))
        block = [head, Spacer(1, 3), Paragraph(p["blurb"], S_BODY), Spacer(1, 3)]
        block += bullets(None, p["bullets"])
        story.append(KeepTogether(block))
    story += [Spacer(1, 9)]

    # --- skills (2-column grid)
    story += section(None, "TECHNICAL SKILLS")
    half = (len(SKILLS) + 1) // 2
    left, right = SKILLS[:half], SKILLS[half:]
    grid = []
    for i in range(half):
        lk, lv = left[i]
        cell_l = [Paragraph(lk.upper(), S_SKILLKEY), Paragraph(lv, S_SKILLVAL)]
        if i < len(right):
            rk, rv = right[i]
            cell_r = [Paragraph(rk.upper(), S_SKILLKEY), Paragraph(rv, S_SKILLVAL)]
        else:
            cell_r = ""
        grid.append([cell_l, cell_r])
    grid_tbl = Table(grid, colWidths=[CONTENT_W / 2, CONTENT_W / 2])
    grid_tbl.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("LINEAFTER", (0, 0), (0, -1), 0.4, HAIR),
        ("RIGHTPADDING", (0, 0), (0, -1), 12),
    ]))
    story += [grid_tbl, Spacer(1, 9)]

    # --- current focus
    story += section(None, "CURRENT FOCUS &amp; LEARNING")
    story += bullets(None, FOCUS)
    story += [Spacer(1, 10)]

    # --- availability
    avail = Table(
        [[Paragraph("<b>Availability</b>", S_SKILLKEY),
          Paragraph("Open to internships, freelance projects, and collaborations.", S_SKILLVAL)]],
        colWidths=[CONTENT_W * 0.18, CONTENT_W * 0.82],
    )
    avail.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), TINT),
        ("BOX", (0, 0), (-1, -1), 0.5, RULE),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 7),
        ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    story += [avail]

    doc.build(story)
    print("Wrote", OUT)


if __name__ == "__main__":
    build()
