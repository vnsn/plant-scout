#!/usr/bin/env python3
"""
Scrape Conservation Garden Park website for Garden Location data
for each of the 123 plants in the Plant Scout app.

Uses POST search to find plants, then parses detail pages for location info.
"""

import urllib.request
import urllib.parse
import json
import time
import re
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Content-Type": "application/x-www-form-urlencoded",
}

BASE = "https://conservationgardenpark.jvwcd.gov"

# All 123 plants: symbol, name, botanical, plus extra search terms
PLANTS = [
    {"symbol": "T-1", "name": "Montgomery Blue Spruce", "botanical": "Picea pungens 'Montgomery'", "search": ["Montgomery Blue Spruce", "Picea pungens"]},
    {"symbol": "T-2", "name": "Pinyon Pine", "botanical": "Pinus edulis", "search": ["Pinyon Pine", "Pinus edulis"]},
    {"symbol": "T-3", "name": "Serbian Spruce", "botanical": "Picea omorika", "search": ["Serbian Spruce", "Picea omorika"]},
    {"symbol": "T-4", "name": "Bigtooth Maple", "botanical": "Acer grandidentatum", "search": ["Bigtooth Maple", "Acer grandidentatum"]},
    {"symbol": "T-5", "name": "Forest Pansy Redbud", "botanical": "Cercis canadensis", "search": ["Forest Pansy Redbud", "Cercis canadensis", "Redbud"]},
    {"symbol": "T-6", "name": "Mountain Mahogany", "botanical": "Cercocarpus ledifolius", "search": ["Mountain Mahogany", "Cercocarpus ledifolius", "Cercocarpus"]},
    {"symbol": "T-7", "name": "Paperbark Maple", "botanical": "Acer griseum", "search": ["Paperbark Maple", "Acer griseum"]},
    {"symbol": "T-8", "name": "River Birch", "botanical": "Betula nigra", "search": ["River Birch", "Betula nigra", "Heritage Birch"]},
    {"symbol": "T-9", "name": "Smoke Tree", "botanical": "Cotinus coggygria", "search": ["Smoke Tree", "Cotinus coggygria", "Royal Purple"]},
    {"symbol": "T-10", "name": "Whitespire Birch", "botanical": "Betula populifolia", "search": ["Whitespire Birch", "Betula populifolia"]},
    {"symbol": "T-11", "name": "Witchhazel", "botanical": "Hamamelis", "search": ["Witchhazel", "Hamamelis", "Witch Hazel"]},
    {"symbol": "T-12", "name": "Apricot", "botanical": "Prunus armeniaca", "search": ["Apricot", "Prunus armeniaca"]},
    {"symbol": "T-13", "name": "Chokecherry", "botanical": "Prunus virginiana", "search": ["Chokecherry", "Prunus virginiana"]},
    {"symbol": "T-14", "name": "Fig", "botanical": "Ficus carica", "search": ["Fig", "Ficus carica"]},
    {"symbol": "T-15", "name": "Mulberry", "botanical": "Morus", "search": ["Mulberry", "Morus"]},
    {"symbol": "T-16", "name": "Pear", "botanical": "Pyrus communis", "search": ["Pear", "Pyrus communis"]},
    {"symbol": "T-17", "name": "Persimmon", "botanical": "Diospyros virginiana", "search": ["Persimmon", "Diospyros virginiana"]},
    {"symbol": "T-18", "name": "Persimmon", "botanical": "Diospyros kaki", "search": ["Persimmon", "Diospyros kaki"]},
    {"symbol": "T-19", "name": "Plum", "botanical": "Prunus domestica", "search": ["Plum", "Prunus domestica"]},
    {"symbol": "T-20", "name": "Sweet Cherry", "botanical": "Prunus avium", "search": ["Sweet Cherry", "Prunus avium", "Cherry"]},
    {"symbol": "S-1", "name": "Emerald Green Arborvitae", "botanical": "Thuja occidentalis", "search": ["Emerald Green Arborvitae", "Thuja occidentalis", "Arborvitae"]},
    {"symbol": "S-2", "name": "Mahonia Winter Sun", "botanical": "Mahonia x media", "search": ["Mahonia Winter Sun", "Mahonia x media", "Mahonia"]},
    {"symbol": "S-3", "name": "Sky Rocket Juniper", "botanical": "Juniperus scopulorum", "search": ["Sky Rocket Juniper", "Juniperus scopulorum", "Skyrocket"]},
    {"symbol": "S-4", "name": "Black Currant", "botanical": "Ribes nigrum", "search": ["Black Currant", "Ribes nigrum"]},
    {"symbol": "S-5", "name": "Black Lace Elderberry", "botanical": "Sambucus nigra", "search": ["Black Lace Elderberry", "Sambucus nigra", "Elderberry"]},
    {"symbol": "S-6", "name": "Color Guard Yucca", "botanical": "Yucca filamentosa", "search": ["Color Guard Yucca", "Yucca filamentosa", "Yucca"]},
    {"symbol": "S-7", "name": "Gardenia", "botanical": "Gardenia jasminoides", "search": ["Gardenia", "Gardenia jasminoides"]},
    {"symbol": "S-8", "name": "Goji Berry", "botanical": "Lycium barbarum", "search": ["Goji Berry", "Lycium barbarum", "Wolfberry"]},
    {"symbol": "S-9", "name": "Gooseberry", "botanical": "Ribes uva-crispa", "search": ["Gooseberry", "Ribes uva-crispa"]},
    {"symbol": "S-10", "name": "Hibiscus", "botanical": "Hibiscus syriacus", "search": ["Rose of Sharon", "Hibiscus syriacus"]},
    {"symbol": "S-11", "name": "Hydrangea", "botanical": "Hydrangea", "search": ["Hydrangea"]},
    {"symbol": "S-12", "name": "Jostaberry", "botanical": "Ribes nidigrolaria", "search": ["Jostaberry", "Ribes nidigrolaria"]},
    {"symbol": "S-13", "name": "Lavender", "botanical": "Lavandula angustifolia", "search": ["English Lavender", "Lavandula angustifolia"]},
    {"symbol": "S-14", "name": "Lilac", "botanical": "Syringa vulgaris", "search": ["Lilac", "Syringa vulgaris"]},
    {"symbol": "S-15", "name": "Mock Orange", "botanical": "Philadelphus", "search": ["Mock Orange", "Philadelphus"]},
    {"symbol": "S-16", "name": "Nanking Cherry", "botanical": "Prunus tomentosa", "search": ["Nanking Cherry", "Prunus tomentosa"]},
    {"symbol": "S-17", "name": "Ninebark Coppertina", "botanical": "Physocarpus opulifolius", "search": ["Coppertina Ninebark", "Physocarpus opulifolius Coppertina"]},
    {"symbol": "S-18", "name": "Ninebark Diabolo", "botanical": "Physocarpus opulifolius", "search": ["Diabolo Ninebark", "Physocarpus opulifolius Diabolo"]},
    {"symbol": "S-19", "name": "Ninebark Summer Wine", "botanical": "Physocarpus opulifolius", "search": ["Summer Wine Ninebark", "Physocarpus opulifolius Summer Wine"]},
    {"symbol": "S-20", "name": "Red Currant", "botanical": "Ribes rubrum", "search": ["Red Currant", "Ribes rubrum"]},
    {"symbol": "S-21", "name": "Red Twig Dogwood", "botanical": "Cornus sericea", "search": ["Red Twig Dogwood", "Cornus sericea"]},
    {"symbol": "S-22", "name": "Rosa Glauca", "botanical": "Rosa glauca", "search": ["Rosa Glauca", "Rosa glauca", "Redleaf Rose"]},
    {"symbol": "S-23", "name": "Roses", "botanical": "Rosa", "search": ["Rose"]},
    {"symbol": "S-24", "name": "Russian Sage", "botanical": "Salvia yangii", "search": ["Russian Sage", "Salvia yangii", "Perovskia"]},
    {"symbol": "S-25", "name": "Winterberry Holly", "botanical": "Ilex verticillata", "search": ["Winterberry Holly", "Ilex verticillata", "Winterberry"]},
    {"symbol": "S-26", "name": "Yellow Twig Dogwood", "botanical": "Cornus sericea Flaviramea", "search": ["Yellow Twig Dogwood", "Cornus sericea Flaviramea", "Flaviramea"]},
    {"symbol": "S-27", "name": "Apache Plume", "botanical": "Fallugia paradoxa", "search": ["Apache Plume", "Fallugia paradoxa"]},
    {"symbol": "S-28", "name": "Cliffrose", "botanical": "Purshia mexicana", "search": ["Cliffrose", "Purshia mexicana", "Purshia"]},
    {"symbol": "S-29", "name": "Golden Currant", "botanical": "Ribes aureum", "search": ["Golden Currant", "Ribes aureum"]},
    {"symbol": "S-30", "name": "Golden Elderberry", "botanical": "Sambucus cerulea", "search": ["Golden Elderberry", "Sambucus cerulea", "Sambucus nigra cerulea"]},
    {"symbol": "S-31", "name": "Gro-Low Fragrant Sumac", "botanical": "Rhus aromatica", "search": ["Gro-Low Sumac", "Rhus aromatica", "Fragrant Sumac"]},
    {"symbol": "S-32", "name": "Rabbitbrush", "botanical": "Ericameria nauseosa", "search": ["Rabbitbrush", "Ericameria nauseosa", "Chrysothamnus"]},
    {"symbol": "S-33", "name": "Saskatoon Serviceberry", "botanical": "Amelanchier alnifolia", "search": ["Saskatoon Serviceberry", "Amelanchier alnifolia"]},
    {"symbol": "S-34", "name": "Utah Serviceberry", "botanical": "Amelanchier utahensis", "search": ["Utah Serviceberry", "Amelanchier utahensis"]},
    {"symbol": "S-35", "name": "Western Sandcherry", "botanical": "Prunus besseyi", "search": ["Western Sandcherry", "Prunus besseyi"]},
    {"symbol": "P-1", "name": "Bleeding Heart", "botanical": "Lamprocapnos spectabilis", "search": ["Bleeding Heart", "Lamprocapnos spectabilis", "Dicentra"]},
    {"symbol": "P-2", "name": "Hellebore", "botanical": "Helleborus", "search": ["Hellebore", "Helleborus", "Lenten Rose"]},
    {"symbol": "P-3", "name": "Siberian Bugloss", "botanical": "Brunnera macrophylla", "search": ["Siberian Bugloss", "Brunnera macrophylla", "Brunnera"]},
    {"symbol": "P-4", "name": "Astilbe", "botanical": "Astilbe", "search": ["Astilbe"]},
    {"symbol": "P-5", "name": "Catmint", "botanical": "Nepeta faassenii", "search": ["Catmint", "Nepeta faassenii", "Nepeta"]},
    {"symbol": "P-6", "name": "Chocolate Flower", "botanical": "Berlandiera lyrata", "search": ["Chocolate Flower", "Berlandiera lyrata"]},
    {"symbol": "P-7", "name": "Coral Bells", "botanical": "Heuchera", "search": ["Coral Bells", "Heuchera"]},
    {"symbol": "P-8", "name": "Coreopsis", "botanical": "Coreopsis grandiflora", "search": ["Coreopsis", "Coreopsis grandiflora"]},
    {"symbol": "P-9", "name": "Echinacea", "botanical": "Echinacea purpurea", "search": ["Echinacea", "Echinacea purpurea", "Coneflower"]},
    {"symbol": "P-10", "name": "False Indigo", "botanical": "Baptisia australis", "search": ["False Indigo", "Baptisia australis", "Baptisia"]},
    {"symbol": "P-11", "name": "Goatsbeard", "botanical": "Aruncus dioicus", "search": ["Goatsbeard", "Aruncus dioicus", "Aruncus"]},
    {"symbol": "P-12", "name": "Iris", "botanical": "Iris germanica", "search": ["Bearded Iris", "Iris germanica", "Iris"]},
    {"symbol": "P-13", "name": "Knautia", "botanical": "Knautia macedonica", "search": ["Knautia", "Knautia macedonica"]},
    {"symbol": "P-14", "name": "Lady's Mantle", "botanical": "Alchemilla mollis", "search": ["Lady's Mantle", "Alchemilla mollis", "Alchemilla"]},
    {"symbol": "P-15", "name": "Marigold", "botanical": "Tagetes", "search": ["Marigold", "Tagetes"]},
    {"symbol": "P-16", "name": "Nasturtium", "botanical": "Tropaeolum majus", "search": ["Nasturtium", "Tropaeolum"]},
    {"symbol": "P-17", "name": "Penstemon Husker Red", "botanical": "Penstemon digitalis", "search": ["Husker Red Penstemon", "Penstemon digitalis"]},
    {"symbol": "P-18", "name": "Penstemon", "botanical": "Penstemon strictus", "search": ["Penstemon strictus", "Rocky Mountain Penstemon", "Penstemon"]},
    {"symbol": "P-19", "name": "Peony", "botanical": "Paeonia lactiflora", "search": ["Peony", "Paeonia"]},
    {"symbol": "P-20", "name": "Prairie Smoke", "botanical": "Geum triflorum", "search": ["Prairie Smoke", "Geum triflorum"]},
    {"symbol": "P-21", "name": "Red Hot Poker", "botanical": "Kniphofia uvaria", "search": ["Red Hot Poker", "Kniphofia"]},
    {"symbol": "P-22", "name": "Rosemary", "botanical": "Salvia rosmarinus", "search": ["Rosemary", "Salvia rosmarinus", "Rosmarinus"]},
    {"symbol": "P-23", "name": "Sage", "botanical": "Salvia officinalis", "search": ["Common Sage", "Salvia officinalis"]},
    {"symbol": "P-24", "name": "Showy Milkweed", "botanical": "Asclepias speciosa", "search": ["Showy Milkweed", "Asclepias speciosa", "Milkweed"]},
    {"symbol": "P-25", "name": "Spring King Salvia", "botanical": "Salvia nemorosa", "search": ["Spring King Salvia", "Salvia nemorosa"]},
    {"symbol": "P-26", "name": "Sundancer Daisy", "botanical": "Tetraneuris acaulis", "search": ["Sundancer Daisy", "Tetraneuris acaulis", "Tetraneuris"]},
    {"symbol": "P-27", "name": "Yarrow", "botanical": "Achillea millefolium", "search": ["Yarrow", "Achillea millefolium", "Achillea"]},
    {"symbol": "P-28", "name": "Agastache", "botanical": "Agastache rupestris", "search": ["Agastache", "Agastache rupestris", "Hummingbird Mint"]},
    {"symbol": "P-29", "name": "California Fuchsia", "botanical": "Zauschneria latifolia", "search": ["California Fuchsia", "Zauschneria", "Epilobium"]},
    {"symbol": "P-30", "name": "Mint", "botanical": "Mentha", "search": ["Mint", "Mentha"]},
    {"symbol": "P-31", "name": "Rudbeckia", "botanical": "Rudbeckia fulgida", "search": ["Rudbeckia", "Black-Eyed Susan", "Rudbeckia fulgida"]},
    {"symbol": "G-1", "name": "Blue Grama Grass", "botanical": "Bouteloua gracilis", "search": ["Blue Grama", "Bouteloua gracilis"]},
    {"symbol": "G-2", "name": "Blue Oat Grass", "botanical": "Helictotrichon sempervirens", "search": ["Blue Oat Grass", "Helictotrichon sempervirens"]},
    {"symbol": "G-3", "name": "Feather Reed Grass", "botanical": "Calamagrostis acutiflora", "search": ["Karl Foerster", "Calamagrostis", "Feather Reed Grass"]},
    {"symbol": "G-4", "name": "Little Bluestem", "botanical": "Schizachyrium scoparium", "search": ["Little Bluestem", "Schizachyrium scoparium"]},
    {"symbol": "G-5", "name": "Tufted Hairgrass", "botanical": "Deschampsia cespitosa", "search": ["Tufted Hairgrass", "Deschampsia cespitosa", "Northern Lights"]},
    {"symbol": "G-6", "name": "Sideoats Grama", "botanical": "Bouteloua curtipendula", "search": ["Sideoats Grama", "Bouteloua curtipendula"]},
    {"symbol": "GC-1", "name": "Ajuga Burgundy Glow", "botanical": "Ajuga reptans", "search": ["Burgundy Glow Ajuga", "Ajuga reptans"]},
    {"symbol": "GC-2", "name": "Brass Buttons", "botanical": "Leptinella squalida", "search": ["Brass Buttons", "Leptinella squalida"]},
    {"symbol": "GC-3", "name": "Chocolate Chip Ajuga", "botanical": "Ajuga reptans Valfredda", "search": ["Chocolate Chip Ajuga", "Ajuga reptans"]},
    {"symbol": "GC-4", "name": "Creeping Jenny", "botanical": "Lysimachia nummularia", "search": ["Creeping Jenny", "Lysimachia nummularia"]},
    {"symbol": "GC-5", "name": "Creeping Phlox", "botanical": "Phlox subulata", "search": ["Creeping Phlox", "Phlox subulata"]},
    {"symbol": "GC-6", "name": "Delosperma", "botanical": "Delosperma cooperi", "search": ["Delosperma", "Ice Plant", "Delosperma cooperi"]},
    {"symbol": "GC-7", "name": "Dragon's Blood Sedum", "botanical": "Sedum spurium", "search": ["Dragon's Blood Sedum", "Sedum spurium"]},
    {"symbol": "GC-8", "name": "Kinnikinnick", "botanical": "Arctostaphylos uva-ursi", "search": ["Kinnikinnick", "Arctostaphylos uva-ursi", "Bearberry"]},
    {"symbol": "GC-9", "name": "Miner's Lettuce", "botanical": "Claytonia perfoliata", "search": ["Miner's Lettuce", "Claytonia perfoliata"]},
    {"symbol": "GC-10", "name": "Pink Pussytoes", "botanical": "Antennaria dioica", "search": ["Pussytoes", "Antennaria dioica", "Antennaria"]},
    {"symbol": "GC-11", "name": "Prairie Winecup", "botanical": "Callirhoe involucrata", "search": ["Prairie Winecup", "Callirhoe involucrata", "Wine Cup"]},
    {"symbol": "GC-12", "name": "Sweet Woodruff", "botanical": "Galium odoratum", "search": ["Sweet Woodruff", "Galium odoratum"]},
    {"symbol": "GC-13", "name": "Thyme", "botanical": "Thymus", "search": ["Thyme", "Thymus"]},
    {"symbol": "GC-14", "name": "Woolly Thyme", "botanical": "Thymus pseudolanuginosus", "search": ["Woolly Thyme", "Thymus pseudolanuginosus"]},
    {"symbol": "V-1", "name": "Goldflame Honeysuckle", "botanical": "Lonicera heckrottii", "search": ["Goldflame Honeysuckle", "Lonicera heckrottii"]},
    {"symbol": "V-2", "name": "Grape", "botanical": "Vitis vinifera", "search": ["Grape", "Vitis"]},
    {"symbol": "V-3", "name": "Hops Vine", "botanical": "Humulus lupulus", "search": ["Hops", "Humulus lupulus"]},
    {"symbol": "V-4", "name": "Oregon Grape", "botanical": "Mahonia aquifolium", "search": ["Oregon Grape", "Mahonia aquifolium"]},
    {"symbol": "V-5", "name": "Star Jasmine", "botanical": "Trachelospermum jasminoides", "search": ["Star Jasmine", "Trachelospermum"]},
    {"symbol": "V-6", "name": "Trumpet Honeysuckle", "botanical": "Lonicera sempervirens", "search": ["Trumpet Honeysuckle", "Lonicera sempervirens"]},
    {"symbol": "V-7", "name": "Wisteria", "botanical": "Wisteria frutescens", "search": ["Wisteria frutescens", "American Wisteria"]},
    {"symbol": "V-8", "name": "Wisteria", "botanical": "Wisteria macrostachya", "search": ["Wisteria macrostachya", "Blue Moon Wisteria", "Kentucky Wisteria"]},
    {"symbol": "C-1", "name": "Amaryllis", "botanical": "Hippeastrum", "search": ["Amaryllis", "Hippeastrum"]},
    {"symbol": "C-2", "name": "Cherimoya", "botanical": "Annona cherimola", "search": ["Cherimoya", "Annona cherimola"]},
    {"symbol": "C-3", "name": "Hibiscus Tropical", "botanical": "Hibiscus rosa-sinensis", "search": ["Tropical Hibiscus", "Hibiscus rosa-sinensis"]},
    {"symbol": "C-4", "name": "Lemon", "botanical": "Citrus limon", "search": ["Lemon", "Citrus limon"]},
    {"symbol": "C-5", "name": "Lime", "botanical": "Citrus aurantifolia", "search": ["Lime", "Citrus aurantifolia"]},
    {"symbol": "C-6", "name": "Loquat", "botanical": "Eriobotrya japonica", "search": ["Loquat", "Eriobotrya"]},
    {"symbol": "C-7", "name": "Pomegranate", "botanical": "Punica granatum", "search": ["Pomegranate", "Punica granatum"]},
    {"symbol": "B-1", "name": "Allium", "botanical": "Allium", "search": ["Allium", "Ornamental Onion"]},
    {"symbol": "B-2", "name": "Snowdrops", "botanical": "Galanthus nivalis", "search": ["Snowdrops", "Galanthus nivalis"]},
]


def fetch_get(url, retries=3):
    """GET a URL with retry logic."""
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers={
                "User-Agent": HEADERS["User-Agent"]
            })
            with urllib.request.urlopen(req, timeout=15, context=ctx) as resp:
                return resp.read().decode("utf-8", errors="replace")
        except Exception as e:
            if attempt < retries - 1:
                wait = (attempt + 1) * 3
                print(f"    Retry {attempt+1}: {e}")
                time.sleep(wait)
            else:
                print(f"    FAILED: {e}")
                return None


def post_search(query, retries=3):
    """POST search to CGP plant finder."""
    for attempt in range(retries):
        try:
            url = f"{BASE}/plants/getPlants"
            data = urllib.parse.urlencode({"PlantName": query}).encode()
            req = urllib.request.Request(url, data=data, headers=HEADERS)
            with urllib.request.urlopen(req, timeout=15, context=ctx) as resp:
                return resp.read().decode("utf-8", errors="replace")
        except Exception as e:
            if attempt < retries - 1:
                wait = (attempt + 1) * 3
                print(f"    Retry {attempt+1}: {e}")
                time.sleep(wait)
            else:
                print(f"    FAILED: {e}")
                return None


def find_detail_urls(html):
    """Extract unique plant detail URLs from search results HTML."""
    links = re.findall(r'/plants/(\d+)/([a-z0-9-]+)', html)
    seen = set()
    unique = []
    for plant_id, slug in links:
        key = f"{plant_id}/{slug}"
        if key not in seen:
            seen.add(key)
            unique.append((plant_id, slug))
    return unique


def parse_garden_location(html):
    """Extract Garden Location data from a plant detail page.

    HTML structure:
    <h3>Garden Location:</h3>
    <div class="plantDetailFields">
      <ul>
        <li><b>Path Name</b>
          <ul><li style="padding-left: 30px;"><span>Area Name</span></li></ul>
        </li>
      </ul>
    </div>
    """
    idx = html.find("Garden Location")
    if idx < 0:
        return None

    # Get a chunk after "Garden Location"
    section = html[idx:idx + 3000]

    # Find the plantDetailFields div
    div_start = section.find('<div class="plantDetailFields">')
    if div_start < 0:
        return None

    # Find the end of this div (next closing div or section)
    div_section = section[div_start:div_start + 2000]

    # Extract path names (bold tags)
    paths = re.findall(r'<b>([^<]+)</b>', div_section)

    # Split by bold tags to find areas under each path
    parts = re.split(r'<b>[^<]+</b>', div_section)

    result = []
    for i, path in enumerate(paths):
        path = path.strip()
        if i + 1 < len(parts):
            # Extract span contents as area names
            areas = re.findall(r'<span>([^<]+)</span>', parts[i + 1])
            areas = [a.strip() for a in areas if a.strip()]
            if areas:
                result.append({"path": path, "areas": areas})

    return result if result else None


def get_plant_title(html):
    """Get the plant name from the detail page."""
    m = re.search(r'<h2[^>]*>([^<]+)</h2>', html)
    if m:
        return m.group(1).strip()
    return None


def main():
    results = {}
    found_with_loc = 0
    found_no_loc = 0
    not_found = 0

    print(f"Scraping CGP garden locations for {len(PLANTS)} plants...")
    print("=" * 60)

    for i, plant in enumerate(PLANTS):
        symbol = plant["symbol"]
        name = plant["name"]
        search_terms = plant["search"]

        print(f"\n[{i+1}/{len(PLANTS)}] {symbol} — {name}")

        detail_url = None
        matched_name = None

        # Try each search term
        for term in search_terms:
            print(f"  Searching: \"{term}\"")
            html = post_search(term)
            if not html:
                time.sleep(1)
                continue

            urls = find_detail_urls(html)
            if urls:
                plant_id, slug = urls[0]
                detail_url = f"{BASE}/plants/{plant_id}/{slug}"
                matched_name = slug.replace("-", " ").title()
                print(f"  → Found: {detail_url}")
                break

            time.sleep(0.5)

        if not detail_url:
            print(f"  ❌ Not found on CGP")
            results[symbol] = {"found": False, "cgp_url": None, "cgp_name": None, "locations": None}
            not_found += 1
            time.sleep(1)
            continue

        time.sleep(0.5)

        # Fetch the detail page
        detail_html = fetch_get(detail_url)
        if not detail_html:
            print(f"  ❌ Could not load detail page")
            results[symbol] = {"found": True, "cgp_url": detail_url, "cgp_name": matched_name, "locations": None}
            found_no_loc += 1
            continue

        # Get the actual plant name from the page
        page_title = get_plant_title(detail_html)
        if page_title:
            matched_name = page_title

        # Parse garden locations
        locations = parse_garden_location(detail_html)
        if locations:
            total_areas = sum(len(loc["areas"]) for loc in locations)
            print(f"  ✅ {matched_name} — {total_areas} location(s)")
            for loc in locations:
                print(f"     {loc['path']}: {', '.join(loc['areas'])}")
            results[symbol] = {
                "found": True,
                "cgp_url": detail_url,
                "cgp_name": matched_name,
                "locations": locations,
            }
            found_with_loc += 1
        else:
            # Check if "Not on display"
            if "Not on display" in detail_html:
                print(f"  ⚠️  {matched_name} — Not on display at park")
                results[symbol] = {
                    "found": True,
                    "cgp_url": detail_url,
                    "cgp_name": matched_name,
                    "locations": [{"path": "Status", "areas": ["Not on display"]}],
                }
            else:
                print(f"  ⚠️  {matched_name} — No garden location listed")
                results[symbol] = {
                    "found": True,
                    "cgp_url": detail_url,
                    "cgp_name": matched_name,
                    "locations": None,
                }
            found_no_loc += 1

        time.sleep(1.5)

    # Save results
    output_path = "garden_locations.json"
    with open(output_path, "w") as f:
        json.dump(results, f, indent=2)

    print("\n" + "=" * 60)
    print(f"DONE! Results saved to {output_path}")
    print(f"  ✅ Found with locations: {found_with_loc}")
    print(f"  ⚠️  Found but no location data: {found_no_loc}")
    print(f"  ❌ Not found on CGP: {not_found}")
    print(f"  Total: {len(PLANTS)}")


if __name__ == "__main__":
    main()
