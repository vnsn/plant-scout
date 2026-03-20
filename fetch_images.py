#!/usr/bin/env python3
"""Fetch reference photos from Wikimedia Commons for each plant."""

import urllib.request
import urllib.parse
import json
import os
import time
import sys

IMAGES_DIR = os.path.join(os.path.dirname(__file__), "images")
os.makedirs(IMAGES_DIR, exist_ok=True)

# Plant data: symbol -> botanical name (genus species only, strip cultivar names)
PLANTS = [
    ("T-1", "Picea pungens"),
    ("T-2", "Pinus edulis"),
    ("T-3", "Picea omorika"),
    ("T-4", "Acer grandidentatum"),
    ("T-5", "Cercis canadensis"),
    ("T-6", "Cercocarpus ledifolius"),
    ("T-7", "Acer griseum"),
    ("T-8", "Betula nigra"),
    ("T-9", "Cotinus coggygria"),
    ("T-10", "Betula populifolia"),
    ("T-11", "Hamamelis intermedia"),
    ("T-12", "Prunus armeniaca"),
    ("T-13", "Prunus virginiana"),
    ("T-14", "Ficus carica"),
    ("T-15", "Morus rubra"),
    ("T-16", "Pyrus communis"),
    ("T-17", "Diospyros virginiana"),
    ("T-18", "Diospyros kaki"),
    ("T-19", "Prunus domestica"),
    ("T-20", "Prunus avium"),
    ("S-1", "Thuja occidentalis"),
    ("S-2", "Mahonia media"),
    ("S-3", "Juniperus scopulorum"),
    ("S-4", "Ribes nigrum"),
    ("S-5", "Sambucus nigra"),
    ("S-6", "Yucca filamentosa"),
    ("S-7", "Gardenia jasminoides"),
    ("S-8", "Lycium barbarum"),
    ("S-9", "Ribes uva-crispa"),
    ("S-10", "Hibiscus syriacus"),
    ("S-11", "Hydrangea"),
    ("S-12", "Ribes nidigrolaria"),
    ("S-13", "Lavandula angustifolia"),
    ("S-14", "Syringa vulgaris"),
    ("S-15", "Philadelphus coronarius"),
    ("S-16", "Prunus tomentosa"),
    ("S-17", "Physocarpus opulifolius"),
    ("S-18", "Physocarpus opulifolius"),
    ("S-19", "Physocarpus opulifolius"),
    ("S-20", "Ribes rubrum"),
    ("S-21", "Cornus sericea"),
    ("S-22", "Rosa glauca"),
    ("S-23", "Rosa"),
    ("S-24", "Salvia yangii"),
    ("S-25", "Ilex verticillata"),
    ("S-26", "Cornus sericea"),
    ("S-27", "Fallugia paradoxa"),
    ("S-28", "Purshia mexicana"),
    ("S-29", "Ribes aureum"),
    ("S-30", "Sambucus cerulea"),
    ("S-31", "Rhus aromatica"),
    ("S-32", "Ericameria nauseosa"),
    ("S-33", "Amelanchier alnifolia"),
    ("S-34", "Amelanchier utahensis"),
    ("S-35", "Prunus besseyi"),
    ("P-1", "Lamprocapnos spectabilis"),
    ("P-2", "Helleborus"),
    ("P-3", "Brunnera macrophylla"),
    ("P-4", "Astilbe arendsii"),
    ("P-5", "Nepeta faassenii"),
    ("P-6", "Berlandiera lyrata"),
    ("P-7", "Heuchera"),
    ("P-8", "Coreopsis grandiflora"),
    ("P-9", "Echinacea purpurea"),
    ("P-10", "Baptisia australis"),
    ("P-11", "Aruncus dioicus"),
    ("P-12", "Iris germanica"),
    ("P-13", "Knautia macedonica"),
    ("P-14", "Alchemilla mollis"),
    ("P-15", "Tagetes"),
    ("P-16", "Tropaeolum majus"),
    ("P-17", "Penstemon digitalis"),
    ("P-18", "Penstemon strictus"),
    ("P-19", "Paeonia lactiflora"),
    ("P-20", "Geum triflorum"),
    ("P-21", "Kniphofia uvaria"),
    ("P-22", "Salvia rosmarinus"),
    ("P-23", "Salvia officinalis"),
    ("P-24", "Asclepias speciosa"),
    ("P-25", "Salvia nemorosa"),
    ("P-26", "Tetraneuris acaulis"),
    ("P-27", "Achillea millefolium"),
    ("P-28", "Agastache rupestris"),
    ("P-29", "Zauschneria"),
    ("P-30", "Mentha"),
    ("P-31", "Rudbeckia fulgida"),
    ("G-1", "Bouteloua gracilis"),
    ("G-2", "Helictotrichon sempervirens"),
    ("G-3", "Calamagrostis acutiflora"),
    ("G-4", "Schizachyrium scoparium"),
    ("G-5", "Deschampsia cespitosa"),
    ("G-6", "Bouteloua curtipendula"),
    ("GC-1", "Ajuga reptans"),
    ("GC-2", "Leptinella squalida"),
    ("GC-3", "Ajuga reptans"),
    ("GC-4", "Lysimachia nummularia"),
    ("GC-5", "Phlox subulata"),
    ("GC-6", "Delosperma cooperi"),
    ("GC-7", "Sedum spurium"),
    ("GC-8", "Arctostaphylos uva-ursi"),
    ("GC-9", "Claytonia perfoliata"),
    ("GC-10", "Antennaria dioica"),
    ("GC-11", "Callirhoe involucrata"),
    ("GC-12", "Galium odoratum"),
    ("GC-13", "Thymus"),
    ("GC-14", "Thymus pseudolanuginosus"),
    ("V-1", "Lonicera heckrottii"),
    ("V-2", "Vitis vinifera"),
    ("V-3", "Humulus lupulus"),
    ("V-4", "Mahonia aquifolium"),
    ("V-5", "Trachelospermum jasminoides"),
    ("V-6", "Lonicera sempervirens"),
    ("V-7", "Wisteria frutescens"),
    ("V-8", "Wisteria macrostachya"),
    ("C-1", "Hippeastrum"),
    ("C-2", "Annona cherimola"),
    ("C-3", "Hibiscus rosa-sinensis"),
    ("C-4", "Citrus limon"),
    ("C-5", "Citrus aurantifolia"),
    ("C-6", "Eriobotrya japonica"),
    ("C-7", "Punica granatum"),
    ("B-1", "Allium giganteum"),
    ("B-2", "Galanthus nivalis"),
]

def search_wikimedia(query):
    """Search Wikimedia Commons for an image matching query."""
    url = "https://commons.wikimedia.org/w/api.php?" + urllib.parse.urlencode({
        "action": "query",
        "format": "json",
        "generator": "search",
        "gsrnamespace": "6",  # File namespace
        "gsrsearch": f"filetype:bitmap {query}",
        "gsrlimit": "5",
        "prop": "imageinfo",
        "iiprop": "url|size|mime",
        "iiurlwidth": "300",
    })

    try:
        req = urllib.request.Request(url, headers={
            "User-Agent": "PlantScoutApp/1.0 (personal plant reference; contact: none)"
        })
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read())

        pages = data.get("query", {}).get("pages", {})
        for page_id in sorted(pages.keys(), key=int):
            page = pages[page_id]
            info = page.get("imageinfo", [{}])[0]
            mime = info.get("mime", "")
            if mime.startswith("image/") and "svg" not in mime:
                thumb_url = info.get("thumburl")
                if thumb_url:
                    return thumb_url
    except Exception as e:
        print(f"  Search error: {e}", file=sys.stderr)

    return None

def download_image(url, filepath, retries=3):
    """Download image to filepath with retry on 429."""
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers={
                "User-Agent": "PlantScoutApp/1.0 (personal plant reference; contact: none)"
            })
            with urllib.request.urlopen(req, timeout=15) as resp:
                with open(filepath, "wb") as f:
                    f.write(resp.read())
            return True
        except urllib.error.HTTPError as e:
            if e.code == 429 and attempt < retries - 1:
                wait = (attempt + 1) * 5
                print(f"  429, retry in {wait}s...", end=" ", flush=True, file=sys.stderr)
                time.sleep(wait)
            else:
                print(f"  Download error: {e}", file=sys.stderr)
                return False
        except Exception as e:
            print(f"  Download error: {e}", file=sys.stderr)
            return False
    return False

def main():
    found = 0
    skipped = 0
    failed = 0

    for symbol, botanical in PLANTS:
        filepath = os.path.join(IMAGES_DIR, f"{symbol}.jpg")

        # Skip if already downloaded
        if os.path.exists(filepath) and os.path.getsize(filepath) > 1000:
            skipped += 1
            continue

        print(f"[FETCH] {symbol}: {botanical}...", end=" ", flush=True)

        # Try botanical name first
        thumb_url = search_wikimedia(botanical)

        # Add delay between search and download
        time.sleep(1)

        if not thumb_url:
            # Try with just genus
            genus = botanical.split()[0]
            thumb_url = search_wikimedia(genus)
            time.sleep(1)

        if thumb_url:
            if download_image(thumb_url, filepath):
                size = os.path.getsize(filepath)
                print(f"OK ({size//1024}KB)")
                found += 1
            else:
                print("DOWNLOAD FAILED")
                failed += 1
        else:
            print("NOT FOUND")
            failed += 1

        # Be nice to Wikimedia API (4s between plants)
        time.sleep(4)

    # Create image manifest for service worker
    manifest = [f for f in os.listdir(IMAGES_DIR) if f.endswith(".jpg")]
    manifest_path = os.path.join(os.path.dirname(__file__), "image-manifest.json")
    with open(manifest_path, "w") as f:
        json.dump(sorted(manifest), f)

    print(f"\nDone! Found: {found}, Skipped: {skipped}, Failed: {failed}")
    print(f"Image manifest: {len(manifest)} files")

if __name__ == "__main__":
    main()
