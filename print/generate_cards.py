#!/usr/bin/env python3
"""Generate printable card sheet SVGs for Tofta board game."""

import os, math, textwrap

# ── Layout ──────────────────────────────────────────────────────────────────
CARD_W, CARD_H = 45, 65
COLS, ROWS = 4, 4
GAP = 3
PAGE_W, PAGE_H = 210, 297
MARGIN_X = (PAGE_W - (COLS * CARD_W + (COLS - 1) * GAP)) / 2   # 10.5
MARGIN_Y = (PAGE_H - (ROWS * CARD_H + (ROWS - 1) * GAP)) / 2   # 14.0

def cx(col): return MARGIN_X + col * (CARD_W + GAP)
def cy(row): return MARGIN_Y + row * (CARD_H + GAP)

# ── Colours ─────────────────────────────────────────────────────────────────
DARK  = dict(Military="#c53030", Market="#276749", Science="#553c9a",
             Wonders="#744210", Misc="#4a5568",   Action="#2c5282",
             Personal="#2d3748", DrawPile="#1a365d", IndState="#22543d",
             CatchUp="#702459")
LIGHT = dict(Military="#fff5f5", Market="#f0fff4", Science="#faf5ff",
             Wonders="#fffff0", Misc="#f7fafc",   Action="#ebf8ff",
             Personal="#edf2f7", DrawPile="#ebf8ff", IndState="#f0fff4",
             CatchUp="#fff5f7")
MID   = dict(Military="#e53e3e", Market="#38a169", Science="#805ad5",
             Wonders="#d69e2e", Misc="#718096",   Action="#3182ce",
             Personal="#4a5568", DrawPile="#2b6cb0", IndState="#276749",
             CatchUp="#97266d")

# ── Text wrap ────────────────────────────────────────────────────────────────
def wrap(text, width=42):
    return textwrap.wrap(text, width)

# ── Single card SVG ──────────────────────────────────────────────────────────
def svg_card(col, row, card):
    x, y = cx(col), cy(row)
    cls   = card["class"]
    dark  = DARK[cls]
    light = LIGHT[cls]
    mid   = MID[cls]
    era   = card.get("era", "")
    name  = card["name"]
    cost  = card.get("cost", "")
    place = card.get("placement", "")
    effect= card.get("effect", "")
    vp    = card.get("vp", "")
    note  = card.get("note", "")   # small print note (e.g. "Print N copies")

    out = []

    # Background + border
    out.append(f'<rect x="{x:.1f}" y="{y:.1f}" width="{CARD_W}" height="{CARD_H}" '
               f'fill="{light}" stroke="{dark}" stroke-width="0.7" rx="1.5"/>')

    # Header bar
    out.append(f'<rect x="{x:.1f}" y="{y:.1f}" width="{CARD_W}" height="9" '
               f'fill="{dark}" rx="1.5"/>')
    out.append(f'<rect x="{x:.1f}" y="{y+5:.1f}" width="{CARD_W}" height="4" fill="{dark}"/>')

    # Class label
    out.append(f'<text x="{x+2:.1f}" y="{y+6.5:.1f}" font-size="3.2" font-weight="bold" '
               f'fill="white" font-family="Arial">{cls}</text>')

    # Era badge
    if era:
        out.append(f'<rect x="{x+32:.1f}" y="{y+1:.1f}" width="11" height="7" '
                   f'fill="rgba(0,0,0,0.25)" rx="1"/>')
        out.append(f'<text x="{x+37.5:.1f}" y="{y+6.5:.1f}" font-size="3.5" '
                   f'fill="white" text-anchor="middle" font-family="Arial">Era {era}</text>')

    # Card name (may span 2 lines if long)
    name_parts = wrap(name, 18)
    if len(name_parts) == 1:
        out.append(f'<text x="{x+22.5:.1f}" y="{y+15:.1f}" font-size="5" font-weight="bold" '
                   f'fill="{dark}" text-anchor="middle" font-family="Arial">{name_parts[0]}</text>')
        yp = y + 19
    else:
        out.append(f'<text x="{x+22.5:.1f}" y="{y+13:.1f}" font-size="4.5" font-weight="bold" '
                   f'fill="{dark}" text-anchor="middle" font-family="Arial">{name_parts[0]}</text>')
        out.append(f'<text x="{x+22.5:.1f}" y="{y+18:.1f}" font-size="4.5" font-weight="bold" '
                   f'fill="{dark}" text-anchor="middle" font-family="Arial">{name_parts[1]}</text>')
        yp = y + 22

    # Cost
    if cost:
        out.append(f'<text x="{x+2:.1f}" y="{yp:.1f}" font-size="3" fill="#718096" '
                   f'font-family="Arial" font-weight="bold">Cost: </text>')
        out.append(f'<text x="{x+12:.1f}" y="{yp:.1f}" font-size="3" fill="#2d3748" '
                   f'font-family="Arial">{cost}</text>')
        yp += 4

    # Placement
    if place and place != "—":
        out.append(f'<text x="{x+2:.1f}" y="{yp:.1f}" font-size="3" fill="#718096" '
                   f'font-family="Arial" font-weight="bold">Place: </text>')
        out.append(f'<text x="{x+13:.1f}" y="{yp:.1f}" font-size="3" fill="#2d3748" '
                   f'font-family="Arial">{place}</text>')
        yp += 4

    # Separator
    out.append(f'<line x1="{x+2:.1f}" y1="{yp:.1f}" x2="{x+43:.1f}" y2="{yp:.1f}" '
               f'stroke="{mid}" stroke-width="0.3"/>')
    yp += 3.5

    # Effect text
    bottom_reserve = (y + CARD_H - 10) if (vp or note) else (y + CARD_H - 5)
    lines_available = max(1, int((bottom_reserve - yp) / 3.8))
    wrapped = wrap(effect, 40)
    for i, ln in enumerate(wrapped):
        if yp + 3.5 > bottom_reserve:
            # Truncate with ellipsis
            if out[-1].endswith('</text>'):
                out[-1] = out[-1][:-7] + "…</text>"
            break
        fs = 3.0 if len(ln) < 38 else 2.7
        out.append(f'<text x="{x+2:.1f}" y="{yp:.1f}" font-size="{fs}" fill="#2d3748" '
                   f'font-family="Arial">{ln}</text>')
        yp += 3.8

    # VP badge
    if vp:
        out.append(f'<rect x="{x+2:.1f}" y="{y+CARD_H-9:.1f}" width="17" height="6" '
                   f'fill="{dark}" rx="0.8"/>')
        out.append(f'<text x="{x+10.5:.1f}" y="{y+CARD_H-4.5:.1f}" font-size="3.5" '
                   f'fill="white" text-anchor="middle" font-weight="bold" font-family="Arial">{vp} VP</text>')

    # Print note (for modifier cards)
    if note:
        out.append(f'<text x="{x+22.5:.1f}" y="{y+CARD_H-3:.1f}" font-size="2.8" '
                   f'fill="{mid}" text-anchor="middle" font-style="italic" font-family="Arial">{note}</text>')

    # Bottom stripe
    out.append(f'<rect x="{x:.1f}" y="{y+CARD_H-3:.1f}" width="{CARD_W}" height="3" '
               f'fill="{dark}" rx="1"/>')
    out.append(f'<rect x="{x:.1f}" y="{y+CARD_H-5:.1f}" width="{CARD_W}" height="2" fill="{dark}"/>')

    # Cut marks (corner ticks)
    for dx, dy in [(0,0),(CARD_W,0),(0,CARD_H),(CARD_W,CARD_H)]:
        px, py = x+dx, y+dy
        out.append(f'<line x1="{px-1.5:.1f}" y1="{py:.1f}" x2="{px+1.5:.1f}" y2="{py:.1f}" '
                   f'stroke="#ccc" stroke-width="0.3"/>')
        out.append(f'<line x1="{px:.1f}" y1="{py-1.5:.1f}" x2="{px:.1f}" y2="{py+1.5:.1f}" '
                   f'stroke="#ccc" stroke-width="0.3"/>')

    return "\n".join(out)

# ── Page builder ─────────────────────────────────────────────────────────────
def svg_page(cards, title):
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {PAGE_W} {PAGE_H}" '
        f'width="{PAGE_W}mm" height="{PAGE_H}mm">',
        '<rect width="210" height="297" fill="#e8e8e8"/>',
        f'<text x="105" y="8" font-size="4.5" fill="#555" text-anchor="middle" '
        f'font-family="Arial">{title}</text>',
    ]
    for i, card in enumerate(cards[:COLS*ROWS]):
        col, row = i % COLS, i // COLS
        lines.append(svg_card(col, row, card))
    lines.append('</svg>')
    return "\n".join(lines)

def write(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"  wrote {path}")

# ══════════════════════════════════════════════════════════════════════════════
# CARD DATA
# ══════════════════════════════════════════════════════════════════════════════

MILITARY = [
    dict(cls="Military", name="Watchtower",      era="I",
         cost="3g OR 1 stone",   placement="Any region",
         effect="+1 defense to this region. Limit 1 per region."),
    dict(cls="Military", name="Mountain Fort",   era="I",
         cost="3g OR 1 stone",   placement="Any region",
         effect="+1 defense to this region and all adjacent regions. Stacks with other defense cards."),
    dict(cls="Military", name="Battering Ram",   era="I",
         cost="3g OR 1 stone",   placement="—",
         effect="Choose one region when playing this card. That region loses 1 defense while this card is on your mat."),
    dict(cls="Military", name="Drill Sergeant",  era="I",
         cost="4g OR 1 food",    placement="—",
         effect="+1 base defense strength while this card is on your mat."),
    dict(cls="Military", name="War Camp",        era="I",
         cost="5g OR 2 food",    placement="Any region",
         effect="+1 attack action per era while on your mat."),
    dict(cls="Military", name="Siege Engine",    era="II",
         cost="5g OR 1 iron",    placement="—",
         effect="Once per era: target region loses its terrain defense bonus for one attack."),
    dict(cls="Military", name="Shield Wall",     era="II",
         cost="7g OR 1 iron + 1 food", placement="—",
         effect="Once per era: all your regions gain +1 defense this round."),
    dict(cls="Military", name="Castle",          era="II",
         cost="6g OR 2 stone",   placement="Any region",
         effect="+2 defense to this region and all adjacent regions. Stacks."),
    dict(cls="Military", name="Mercenaries",     era="II",
         cost="6g OR 2 food",    placement="—",
         effect="While on your mat: +2 extra attack actions per era. Each used attack costs 1 additional gold."),
    dict(cls="Military", name="Fortress",        era="III",
         cost="9g OR 3 stone",   placement="Any region",
         effect="+3 defense to this region while this card is on your mat."),
    dict(cls="Military", name="Iron Legion",     era="III",
         cost="9g OR 2 iron + 1 food", placement="—",
         effect="+2 base attack strength while on your mat. Requires Military Academy on your Empire mat."),
    dict(cls="Military", name="Border Quarries", era="II",
         cost="6g OR 1 iron",    placement="—",
         effect="All your mountain regions bordering another player produce 1 Stone per round, regardless of buildings."),
    dict(cls="Military", name="Border Lumber",   era="III",
         cost="8g OR 1 iron + 1 wood", placement="—",
         effect="All your forest regions bordering another player produce 1 Wood per round, regardless of buildings."),
]

MARKET = [
    # Resource buildings
    dict(cls="Market", name="Quarry",            era="I",
         cost="5g OR 1 wood",    placement="Mountain",
         effect="Produces 1 Stone per round."),
    dict(cls="Market", name="Lumber Mill",       era="I",
         cost="5g OR 1 stone",   placement="Forest",
         effect="Produces 1 Wood per round."),
    dict(cls="Market", name="Farm",              era="I",
         cost="5g OR 1 wood",    placement="Grassland",
         effect="Produces 1 Food per round."),
    dict(cls="Market", name="Salt Mine",         era="I",
         cost="5g OR 1 stone",   placement="Desert",
         effect="Produces 1 Food per round."),
    dict(cls="Market", name="Fishing Village",   era="I",
         cost="3g OR 1 wood",    placement="—",
         effect="Water tiles adjacent to your regions generate taxation without conquest."),
    dict(cls="Market", name="Trade Route",       era="II",
         cost="5g OR 1 food",    placement="—",
         effect="Gain 1 gold per shared border with another player per round. Reduces your trading cost to 1g/resource and 2g/commodity."),
    dict(cls="Market", name="Harbor",            era="II",
         cost="6g OR 2 wood",    placement="—",
         effect="Conquer and tax water tiles. Ocean tiles require Harbor or Navy."),
    # Commodity buildings
    dict(cls="Market", name="Mine",              era="I",
         cost="6g OR 1 stone",   placement="Mountain",
         effect="Produces 1 Iron per round."),
    dict(cls="Market", name="Papyrus Workshop",  era="I",
         cost="6g OR 1 food",    placement="Grassland or Swamp",
         effect="Produces 1 Paper per round."),
    dict(cls="Market", name="Loom",              era="II",
         cost="6g OR 1 food",    placement="Grassland",
         effect="Produces 1 Cloth per round."),
    dict(cls="Market", name="Iron Forge",        era="II",
         cost="10g OR 2 iron",   placement="Mountain",
         effect="Produces 2 Iron per round."),
    dict(cls="Market", name="Glassworks",        era="II",
         cost="8g OR 2 food",    placement="Desert or Ocean",
         effect="Produces 1 Glass per round."),
    dict(cls="Market", name="Scriptorium",       era="III",
         cost="10g OR 2 paper",  placement="Any region",
         effect="Produces 2 Paper per round."),
]

SCIENCE = [
    dict(cls="Science", name="Cartography",      era="I",
         cost="3g OR 1 food",    placement="—",
         effect="Once per era: look at the top 3 cards of the current era deck, then return them in any order."),
    dict(cls="Science", name="Dispatch",         era="I",
         cost="3g OR 1 food",    placement="—",
         effect="+1 market action per era while on your mat."),
    dict(cls="Science", name="Apprenticeship",   era="I",
         cost="4g OR 1 food",    placement="—",
         effect="Your Draft actions draw 3 modifier cards instead of 2."),
    dict(cls="Science", name="Taxation Reform",  era="II",
         cost="7g OR 1 paper + 1 food", placement="—",
         effect="While on your mat: reduce all your region upkeep by 1 (minimum 0)."),
    dict(cls="Science", name="Military Academy", era="II",
         cost="7g OR 1 iron + 1 food",  placement="—",
         effect="+1 base attack strength permanently while on your mat."),
    dict(cls="Science", name="Guild",            era="II",
         cost="7g OR 1 paper + 1 food", placement="—",
         effect="+2 market actions per era while on your mat."),
    dict(cls="Science", name="War College",      era="II",
         cost="7g OR 1 paper + 1 food", placement="—",
         effect="Once per round: after a failed attack, trash 1 card from the top 2 of your modifier discard pile at no cost. Fail and Success cannot be trashed this way."),
    dict(cls="Science", name="Logistics",        era="II",
         cost="6g OR 1 paper + 1 food", placement="—",
         effect="+1 attack action per era. Once per era: move one of your building tokens to another eligible region you control."),
    dict(cls="Science", name="Alchemy",          era="III",
         cost="6g OR 1 wild",    placement="—",
         effect="Once per round, convert any 2 commodities into 1 wild commodity."),
    dict(cls="Science", name="Grand Archive",    era="III",
         cost="10g OR 2 paper + 1 wild", placement="—",
         effect="Your Draft actions draw 4 cards and keep 2. Your Cull actions choose from 5 cards and remove 2."),
    dict(cls="Science", name="Innovation",       era="III",
         cost="9g OR 2 paper",   placement="—",
         effect="+1 market action per era. Once per round: your next market purchase this round costs 2 less gold (minimum 1 gold)."),
]

WONDERS = [
    dict(cls="Wonders", name="Shrine",           era="I",
         cost="4g OR 1 stone",   placement="—",
         effect="Once per era, after a failed attack, gain 3 gold.", vp="+1"),
    dict(cls="Wonders", name="Monument",         era="II",
         cost="7g OR 1 stone + 1 cloth", placement="—",
         effect="No ongoing effect.", vp="+2"),
    dict(cls="Wonders", name="Lighthouse",       era="II",
         cost="7g OR 1 glass + 1 wood",  placement="—",
         effect="+1 strength on all your attacks against water and ocean regions.", vp="+2"),
    dict(cls="Wonders", name="Great Wall",       era="III",
         cost="11g OR 2 iron + 1 stone",  placement="—",
         effect="+1 VP per mountain region you control at end of game.", vp="var."),
    dict(cls="Wonders", name="Grand Market",     era="III",
         cost="9g OR 1 cloth + 1 paper",  placement="—",
         effect="+1 VP per 5 gold in your treasury at end of game.", vp="var."),
    dict(cls="Wonders", name="Cathedral",        era="III",
         cost="11g OR 2 glass + 1 stone", placement="—",
         effect="All your regions gain +1 defense permanently while on your mat.", vp="+3"),
]

MISC = [
    dict(cls="Misc", name="Fishing Fleet",       era="I",
         cost="3g OR 1 wood",    placement="—",
         effect="Conquer water tiles (requires attack action). Ocean tiles require Harbor or Navy."),
    dict(cls="Misc", name="Pillage",             era="I",
         cost="3g OR 1 food",    placement="—",
         effect="When you successfully conquer a region this era, gain gold equal to its taxation value."),
    dict(cls="Misc", name="Vanguard",            era="I",
         cost="3g OR 1 food",    placement="—",
         effect="Once per era: abandon up to 2 regions, then immediately claim 1 adjacent independent region without an attack action."),
    dict(cls="Misc", name="Traveling Scholar",   era="I",
         cost="3g OR 1 food",    placement="—",
         effect="Draft and Cull actions cost 1 less gold (minimum 1 gold)."),
    dict(cls="Misc", name="Cavalry",             era="II",
         cost="6g OR 2 food",    placement="—",
         effect="Once per era: attack a territory not adjacent to your empire."),
    dict(cls="Misc", name="Espionage",           era="II",
         cost="5g OR 1 paper",   placement="—",
         effect="Once per era: steal 1 resource or commodity from a player you share a border with (they lose it)."),
    dict(cls="Misc", name="Recruiting Officer",  era="II",
         cost="6g OR 1 food + 1 cloth", placement="—",
         effect="Once per era: perform a Draft action at no market action or gold cost."),
    dict(cls="Misc", name="Strategic Withdrawal",era="II",
         cost="7g OR 1 food + 1 cloth", placement="—",
         effect="Once per era: abandon up to 3 regions, then immediately claim 2 adjacent independent regions without attack actions."),
    dict(cls="Misc", name="Supply Lines",        era="II",
         cost="7g OR 1 food + 1 cloth", placement="—",
         effect="Isolated regions (no path to Capitol) generate half taxation instead of none."),
    dict(cls="Misc", name="Grand Migration",     era="III",
         cost="11g OR 2 paper + 1 food", placement="—",
         effect="Once per era: abandon any number of regions, then claim up to half (rounded down) independent regions anywhere on the map without attack actions."),
    dict(cls="Misc", name="Corsairs",            era="III",
         cost="8g OR 1 iron + 1 wood",  placement="—",
         effect="Once per era: raid an opponent's region adjacent to water or ocean — steal gold equal to that region's taxation value."),
    dict(cls="Misc", name="Navy",                era="III",
         cost="10g OR 2 wood + 1 iron",  placement="—",
         effect="Full ocean access. +1 attack action per era usable only on ocean and water tiles."),
    dict(cls="Misc", name="Martyrdom",           era="III",
         cost="8g OR 1 cloth + 1 paper", placement="—",
         effect="Each time an opponent conquers one of your regions this era, gain +1 VP."),
    dict(cls="Misc", name="Inquisition",         era="III",
         cost="8g OR 1 iron + 1 paper",  placement="—",
         effect="Once per era: remove any 1 card from the market (that slot refills immediately). Gain gold equal to half its gold cost, rounded down."),
]

ACTION = [
    dict(cls="Action", name="Scout",              era="I",
         cost="3g",              placement="—",
         effect="Draw 3 from the Modifier Draw Pile. Add 1 to your discard pile. Return the rest to the bottom of the Draw Pile. EXECUTE ON PURCHASE — then trash."),
    dict(cls="Action", name="Purge",              era="I",
         cost="3g",              placement="—",
         effect="Perform two Cull actions at no cost. EXECUTE ON PURCHASE — then trash."),
    dict(cls="Action", name="Forced Conscription",era="II",
         cost="5g OR 1 food",    placement="—",
         effect="Draw 4 from the Modifier Draw Pile. Add 2 to your discard pile. Return the rest to the bottom of the Draw Pile. EXECUTE ON PURCHASE — then trash."),
    dict(cls="Action", name="Reformation",        era="II",
         cost="5g OR 1 paper",   placement="—",
         effect="Draw 3 from the top of your modifier deck. Trash 1 (Fail/Success cannot be trashed). Discard the rest. EXECUTE ON PURCHASE — then trash."),
    dict(cls="Action", name="Battle Hymn",        era="II",
         cost="4g OR 1 cloth",   placement="—",
         effect="Draw 3 from the Modifier Draw Pile and add all 3 to your discard pile. EXECUTE ON PURCHASE — then trash."),
    dict(cls="Action", name="Grand Purge",        era="III",
         cost="7g OR 1 iron",    placement="—",
         effect="Perform three Cull actions at no cost. EXECUTE ON PURCHASE — then trash."),
    dict(cls="Action", name="Propaganda",         era="III",
         cost="6g OR 1 wild + 1 paper", placement="—",
         effect="Draw 5 from the Modifier Draw Pile. Add 3 to your discard pile. Return the rest to the bottom of the Draw Pile. EXECUTE ON PURCHASE — then trash."),
    dict(cls="Action", name="Overhaul",           era="III",
         cost="8g OR 2 paper",   placement="—",
         effect="Draw 3 from top of your modifier deck, trash 1 (Fail/Success immune), discard rest. Then draw 3 from Draw Pile, add 2, return 1 to bottom. EXECUTE ON PURCHASE — then trash."),
]

# ── Modifier cards ────────────────────────────────────────────────────────────
# Each dict has class= deck type, name= value label, effect= rule text, note= print count

def modifier_card(deck_cls, value_label, rule, copies_note):
    return dict(cls=deck_cls, name=value_label, era="", cost="", placement="—",
                effect=rule, note=copies_note)

MODIFIER_CARDS = [
    # ── Personal Deck (2 per player × 2 players = 2 of each below)
    modifier_card("Personal", "FAIL",
        "Attack automatically fails. Reshuffle entire deck (remaining + discard + this card).",
        "Personal deck · print 2"),
    modifier_card("Personal", "−2",
        "Add −2 to your attack or defense strength this combat.",
        "Personal deck · print 2"),
    modifier_card("Personal", "−1",
        "Add −1 to your attack or defense strength this combat.",
        "Personal deck · print 4"),
    modifier_card("Personal", "0",
        "No modifier to strength this combat.",
        "Personal deck · print 8"),
    modifier_card("Personal", "+1",
        "Add +1 to your attack or defense strength this combat.",
        "Personal deck · print 4"),
    modifier_card("Personal", "+2",
        "Add +2 to your attack or defense strength this combat.",
        "Personal deck · print 2"),
    modifier_card("Personal", "SUCCESS",
        "Attack automatically succeeds. Reshuffle entire deck (remaining + discard + this card).",
        "Personal deck · print 2"),

    # ── Modifier Draw Pile (shared)
    modifier_card("DrawPile", "FAIL",
        "Draw Pile card. If drawn during Draft/Action effect, add to player discard; reshuffle Draw Pile after.",
        "Draw Pile · print 2"),
    modifier_card("DrawPile", "−1",
        "Modifier Draw Pile card. Added to personal modifier deck via Draft or Action cards.",
        "Draw Pile · print 1"),
    modifier_card("DrawPile", "0",
        "Modifier Draw Pile card. Added to personal modifier deck via Draft or Action cards.",
        "Draw Pile · print 2"),
    modifier_card("DrawPile", "+1",
        "Modifier Draw Pile card. Added to personal modifier deck via Draft or Action cards.",
        "Draw Pile · print 3"),
    modifier_card("DrawPile", "+2",
        "Modifier Draw Pile card. Added to personal modifier deck via Draft or Action cards.",
        "Draw Pile · print 4"),
    modifier_card("DrawPile", "SUCCESS",
        "Draw Pile card. If drawn during Draft/Action effect, add to player discard; reshuffle Draw Pile after.",
        "Draw Pile · print 3"),

    # ── Independent State Deck (shared, reshuffled fresh every attack)
    modifier_card("IndState", "−2",
        "Independent State deck. Reshuffled fresh before every attack against an independent region.",
        "Ind. State · print 1"),
    modifier_card("IndState", "−1",
        "Independent State deck. Reshuffled fresh before every attack against an independent region.",
        "Ind. State · print 2"),
    modifier_card("IndState", "0",
        "Independent State deck. No Fail card in this deck.",
        "Ind. State · print 4"),
    modifier_card("IndState", "+1",
        "Independent State deck.",
        "Ind. State · print 2"),
    modifier_card("IndState", "+2",
        "Independent State deck.",
        "Ind. State · print 1"),
    modifier_card("IndState", "SUCCESS",
        "Independent State deck. Attack against this region automatically succeeds.",
        "Ind. State · print 1"),

    # ── Catch-Up Deck (colored face, distinct back)
    modifier_card("CatchUp", "+2",
        "Catch-Up card. Given to last-place player at end of each round. Added to modifier discard pile. Colored face — remove after game.",
        "Catch-Up · print 6"),
    modifier_card("CatchUp", "+3",
        "Catch-Up card. Given to last-place player at end of each round. Added to modifier discard pile. Colored face — remove after game.",
        "Catch-Up · print 5"),
    modifier_card("CatchUp", "SUCCESS",
        "Catch-Up card. Attack automatically succeeds. Colored face — remove after game.",
        "Catch-Up · print 1"),
]

# Fix class key for svg_card (uses card["class"] internally via cls alias)
for c in MILITARY:  c["class"] = c.pop("cls", "Military")
for c in MARKET:    c["class"] = c.pop("cls", "Market")
for c in SCIENCE:   c["class"] = c.pop("cls", "Science")
for c in WONDERS:   c["class"] = c.pop("cls", "Wonders")
for c in MISC:      c["class"] = c.pop("cls", "Misc")
for c in ACTION:    c["class"] = c.pop("cls", "Action")
for c in MODIFIER_CARDS: c["class"] = c.pop("cls", "Personal")

# ── Generate files ────────────────────────────────────────────────────────────
OUT = os.path.join(os.path.dirname(__file__))

def chunks(lst, n):
    for i in range(0, len(lst), n):
        yield lst[i:i+n]

PER_PAGE = COLS * ROWS   # 16

def write_sheets(cards, basename, label):
    pages = list(chunks(cards, PER_PAGE))
    for i, page_cards in enumerate(pages):
        suffix = f"_{i+1}" if len(pages) > 1 else ""
        path = os.path.join(OUT, f"{basename}{suffix}.svg")
        pg_label = f"{label}" + (f" — page {i+1}/{len(pages)}" if len(pages) > 1 else "")
        write(path, svg_page(page_cards, pg_label))

print("Generating Tofta card sheets…")
write_sheets(MILITARY,       "cards_military",  "TOFTA — Military Cards (Red)")
write_sheets(MARKET,         "cards_market",    "TOFTA — Market Cards (Green)")
write_sheets(SCIENCE,        "cards_science",   "TOFTA — Science Cards (Lilac)")
write_sheets(WONDERS,        "cards_wonders",   "TOFTA — Wonders (Brown)")
write_sheets(MISC,           "cards_misc",      "TOFTA — Misc Cards (Grey)")
write_sheets(ACTION,         "cards_action",    "TOFTA — Action Cards (Blue, execute on purchase)")
write_sheets(MODIFIER_CARDS, "cards_modifiers", "TOFTA — Modifier Cards (all decks)")
print("Done.")
