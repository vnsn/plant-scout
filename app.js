// Plant Scout — Conservation Garden Park Field Guide
// All 123 plants + app logic for browsing, filtering, rating, notes, photos, export

const PLANTS = [
  // ===== TREES — Evergreen =====
  { id: 0, symbol: "T-1", name: "Montgomery Blue Spruce", botanical: "Picea pungens 'Montgomery'", size: "6–8' H x 3–6' W", category: "Trees", subcategory: "Evergreen", notes: "Water: Moderate. Sun: Full Sun." },
  { id: 1, symbol: "T-2", name: "Pinyon Pine", botanical: "Pinus edulis", size: "15–25' H x 15–20' W", category: "Trees", subcategory: "Evergreen", notes: "Water: Low. Sun: Full Sun. EDIBLE" },
  { id: 2, symbol: "T-3", name: "Serbian Spruce", botanical: "Picea omorika", size: "50–60' H x 10–20' W", category: "Trees", subcategory: "Evergreen", notes: "Water: Low–Moderate. Sun: Full Sun to Part Shade. MOST ELEGANT SPRUCE" },
  // ===== TREES — Flowering & Deciduous =====
  { id: 3, symbol: "T-4", name: "Bigtooth Maple", botanical: "Acer grandidentatum", size: "20–30' H x 15–25' W", category: "Trees", subcategory: "Flowering & Deciduous", notes: "Water: Low–Moderate. Sun: Full Sun to Part Shade. UTAH'S NATIVE MAPLE" },
  { id: 4, symbol: "T-5", name: "Forest Pansy Redbud", botanical: "Cercis canadensis 'Forest Pansy'", size: "20–30' H x 25–35' W", category: "Trees", subcategory: "Flowering & Deciduous", notes: "Water: Moderate. Sun: Full Sun to Part Shade. SPECTACULAR SPRING BLOOM + PURPLE FOLIAGE" },
  { id: 5, symbol: "T-6", name: "Mountain Mahogany (Curl-leaf)", botanical: "Cercocarpus ledifolius", size: "6–20' H x 6–15' W", category: "Trees", subcategory: "Flowering & Deciduous", notes: "Water: Low. Sun: Full Sun. UTAH NATIVE EVERGREEN-ISH TREE" },
  { id: 6, symbol: "T-7", name: "Paperbark Maple", botanical: "Acer griseum", size: "20–30' H x 15–25' W", category: "Trees", subcategory: "Flowering & Deciduous", notes: "Water: Moderate. Sun: Full Sun to Part Shade. OUTSTANDING MULTI-SEASON TREE" },
  { id: 7, symbol: "T-8", name: "River Birch 'Heritage'", botanical: "Betula nigra 'Heritage'", size: "40–50' H x 25–35' W", category: "Trees", subcategory: "Flowering & Deciduous", notes: "Water: Moderate. Sun: Full Sun to Part Shade. MOST BEAUTIFUL BARK OF ANY TREE" },
  { id: 8, symbol: "T-9", name: "Smoke Tree 'Royal Purple'", botanical: "Cotinus coggygria 'Royal Purple'", size: "10–15' H x 10–15' W", category: "Trees", subcategory: "Flowering & Deciduous", notes: "Water: Low. Sun: Full Sun. MOST DRAMATIC BURGUNDY PLANT AVAILABLE" },
  { id: 9, symbol: "T-10", name: "Whitespire Birch", botanical: "Betula populifolia 'Whitespire'", size: "25–30' H x 10–15' W", category: "Trees", subcategory: "Flowering & Deciduous", notes: "Water: Moderate. Sun: Full Sun to Part Shade. COLUMNAR WHITE-BARK BIRCH" },
  { id: 10, symbol: "T-11", name: "Witchhazel", botanical: "Hamamelis x intermedia", size: "10–15' H x 10–15' W", category: "Trees", subcategory: "Flowering & Deciduous", notes: "Water: Moderate. Sun: Full Sun to Part Shade. THE MOST DRAMATIC WINTER-BLOOMING PLANT AVAILABLE" },
  // ===== TREES — Fruit & Edible =====
  { id: 11, symbol: "T-12", name: "Apricot", botanical: "Prunus armeniaca", size: "15–25' H x 15–25' W", category: "Trees", subcategory: "Fruit & Edible", notes: "Water: Low–Moderate. Sun: Full Sun. LATE FROST RISK on Wasatch Front" },
  { id: 12, symbol: "T-13", name: "Chokecherry (Native)", botanical: "Prunus virginiana", size: "15–25' H x 15–25' W", category: "Trees", subcategory: "Fruit & Edible", notes: "Water: Low. Sun: Full Sun to Part Shade. NATIVE" },
  { id: 13, symbol: "T-14", name: "Fig (Cold-Hardy)", botanical: "Ficus carica", size: "10–15' H x 10–15' W", category: "Trees", subcategory: "Fruit & Edible", notes: "Water: Low–Moderate. Sun: Full Sun. 'Hardy Chicago' or Mt. Etna" },
  { id: 14, symbol: "T-15", name: "Mulberry", botanical: "Morus rubra / M. alba", size: "30–60' H x 30–60' W", category: "Trees", subcategory: "Fruit & Edible", notes: "Water: Low. Sun: Full Sun. MESSY — fruit stains; plant ONLY at back fence line" },
  { id: 15, symbol: "T-16", name: "Pear (European)", botanical: "Pyrus communis", size: "15–25' H x 10–15' W", category: "Trees", subcategory: "Fruit & Edible", notes: "Water: Low–Moderate. Sun: Full Sun. Needs 2 varieties for cross-pollination" },
  { id: 16, symbol: "T-17", name: "Persimmon (American)", botanical: "Diospyros virginiana", size: "35–60' H x 20–35' W", category: "Trees", subcategory: "Fruit & Edible", notes: "Water: Low. Sun: Full Sun to Part Shade. Very cold-hardy; spectacular fall color" },
  { id: 17, symbol: "T-18", name: "Persimmon (Japanese)", botanical: "Diospyros kaki", size: "15–30' H x 15–25' W", category: "Trees", subcategory: "Fruit & Edible", notes: "Water: Low–Moderate. Sun: Full Sun. 'Fuyu' most popular; zone 7a is cold limit" },
  { id: 18, symbol: "T-19", name: "Plum", botanical: "Prunus domestica / P. salicina", size: "15–25' H x 15–20' W", category: "Trees", subcategory: "Fruit & Edible", notes: "Water: Low–Moderate. Sun: Full Sun. 'Stanley' European is reliable self-fertile choice" },
  { id: 19, symbol: "T-20", name: "Sweet Cherry", botanical: "Prunus avium", size: "20–30' H x 20–30' W", category: "Trees", subcategory: "Fruit & Edible", notes: "Water: Moderate. Sun: Full Sun. 'Stella' self-fertile; net against birds" },
  // ===== SHRUBS — Evergreen =====
  { id: 20, symbol: "S-1", name: "Emerald Green Arborvitae", botanical: "Thuja occidentalis 'Smaragd'", size: "10–15' H x 3–4' W", category: "Shrubs", subcategory: "Evergreen", notes: "Water: Moderate. Sun: Full Sun to Part Shade. EAST FENCE OPTION" },
  { id: 21, symbol: "S-2", name: "Mahonia 'Winter Sun'", botanical: "Mahonia x media 'Winter Sun'", size: "4–6' H x 3–5' W", category: "Shrubs", subcategory: "Evergreen", notes: "Water: Low–Moderate. Sun: Part Shade to Full Shade. DIFFERENT FROM STANDARD OREGON GRAPE" },
  { id: 22, symbol: "S-3", name: "Sky Rocket Juniper", botanical: "Juniperus scopulorum 'Skyrocket'", size: "15–20' H x 2–3' W", category: "Shrubs", subcategory: "Evergreen", notes: "Water: Low. Sun: Full Sun. COLUMNAR FORM" },
  // ===== SHRUBS — Flowering & Deciduous =====
  { id: 23, symbol: "S-4", name: "Black Currant", botanical: "Ribes nigrum", size: "4–6' H x 4–6' W", category: "Shrubs", subcategory: "Flowering & Deciduous", notes: "Water: Moderate. Sun: Full Sun to Part Shade." },
  { id: 24, symbol: "S-5", name: "Black Lace Elderberry", botanical: "Sambucus nigra 'Eva'", size: "6–8' H x 4–6' W", category: "Shrubs", subcategory: "Flowering & Deciduous", notes: "Water: Moderate. Sun: Full Sun to Part Shade. GOTHIC DRAMA" },
  { id: 25, symbol: "S-6", name: "Color Guard Yucca", botanical: "Yucca filamentosa 'Color Guard'", size: "3–5' H x 2–3' W", category: "Shrubs", subcategory: "Flowering & Deciduous", notes: "Water: Low. Sun: Full Sun. BOLD ARCHITECTURAL ACCENT" },
  { id: 26, symbol: "S-7", name: "Gardenia", botanical: "Gardenia jasminoides", size: "2–8' H x 2–6' W", category: "Shrubs", subcategory: "Flowering & Deciduous", notes: "Water: Moderate–High. Sun: Part Shade to Full Sun. Extraordinary fragrance" },
  { id: 27, symbol: "S-8", name: "Goji Berry (Wolfberry)", botanical: "Lycium barbarum", size: "6–10' H x 6–10' W", category: "Shrubs", subcategory: "Flowering & Deciduous", notes: "Water: Low. Sun: Full Sun." },
  { id: 28, symbol: "S-9", name: "Gooseberry", botanical: "Ribes uva-crispa", size: "3–5' H x 3–5' W", category: "Shrubs", subcategory: "Flowering & Deciduous", notes: "Water: Moderate. Sun: Full Sun to Part Shade." },
  { id: 29, symbol: "S-10", name: "Hibiscus (Hardy / Rose of Sharon)", botanical: "Hibiscus syriacus", size: "8–12' H x 6–10' W", category: "Shrubs", subcategory: "Flowering & Deciduous", notes: "Water: Moderate. Sun: Full Sun. Late summer bloomer; hummingbirds" },
  { id: 30, symbol: "S-11", name: "Hydrangea", botanical: "Hydrangea spp.", size: "3–12' H x 3–12' W", category: "Shrubs", subcategory: "Flowering & Deciduous", notes: "Water: Moderate–High. Sun: Part Shade. EXCELLENT CUT FLOWER; afternoon shade REQUIRED" },
  { id: 31, symbol: "S-12", name: "Jostaberry", botanical: "Ribes × nidigrolaria", size: "4–6' H x 4–6' W", category: "Shrubs", subcategory: "Flowering & Deciduous", notes: "Water: Moderate. Sun: Full Sun to Part Shade." },
  { id: 32, symbol: "S-13", name: "Lavender (English)", botanical: "Lavandula angustifolia", size: "1–3' H x 1–3' W", category: "Shrubs", subcategory: "Flowering & Deciduous", notes: "Water: Low. Sun: Full Sun. One of the BEST plants for Sandy Utah" },
  { id: 33, symbol: "S-14", name: "Lilac (Common)", botanical: "Syringa vulgaris", size: "8–20' H x 6–15' W", category: "Shrubs", subcategory: "Flowering & Deciduous", notes: "Water: Low–Moderate. Sun: Full Sun. EXCELLENT for Sandy" },
  { id: 34, symbol: "S-15", name: "Mock Orange", botanical: "Philadelphus coronarius", size: "5–10' H x 5–8' W", category: "Shrubs", subcategory: "Flowering & Deciduous", notes: "Water: Low–Moderate. Sun: Full Sun to Part Shade. FRAGRANCE SUCCESSION AFTER LILAC" },
  { id: 35, symbol: "S-16", name: "Nanking Cherry", botanical: "Prunus tomentosa", size: "6–10' H x 6–15' W", category: "Shrubs", subcategory: "Flowering & Deciduous", notes: "Water: Low–Moderate. Sun: Full Sun. EDIBLE ORNAMENTAL" },
  { id: 36, symbol: "S-17", name: "Ninebark 'Coppertina'", botanical: "Physocarpus opulifolius 'Coppertina'", size: "6–8' H x 5–7' W", category: "Shrubs", subcategory: "Flowering & Deciduous", notes: "Water: Low–Moderate. Sun: Full Sun. WARM-TONED ALTERNATIVE TO DIABOLO" },
  { id: 37, symbol: "S-18", name: "Ninebark 'Diabolo'", botanical: "Physocarpus opulifolius 'Diabolo'", size: "8–10' H x 8–10' W", category: "Shrubs", subcategory: "Flowering & Deciduous", notes: "Water: Low–Moderate. Sun: Full Sun to Part Shade. BEST LARGE BURGUNDY SHRUB FOR UTAH" },
  { id: 38, symbol: "S-19", name: "Ninebark 'Summer Wine'", botanical: "Physocarpus opulifolius 'Summer Wine'", size: "5–6' H x 4–5' W", category: "Shrubs", subcategory: "Flowering & Deciduous", notes: "Water: Low–Moderate. Sun: Full Sun to Part Shade. COMPACT NINEBARK" },
  { id: 39, symbol: "S-20", name: "Red Currant", botanical: "Ribes rubrum", size: "4–6' H x 4–6' W", category: "Shrubs", subcategory: "Flowering & Deciduous", notes: "Water: Moderate. Sun: Full Sun to Part Shade." },
  { id: 40, symbol: "S-21", name: "Red Twig Dogwood", botanical: "Cornus sericea", size: "6–8' H x 6–8' W", category: "Shrubs", subcategory: "Flowering & Deciduous", notes: "Water: Moderate. Sun: Full Sun to Full Shade. BEST WINTER INTEREST SHRUB" },
  { id: 41, symbol: "S-22", name: "Rosa Glauca (Redleaf Rose)", botanical: "Rosa glauca", size: "6–8' H x 4–5' W", category: "Shrubs", subcategory: "Flowering & Deciduous", notes: "Water: Low. Sun: Full Sun. THE MOST UNIQUE ROSE IN EXISTENCE" },
  { id: 42, symbol: "S-23", name: "Roses", botanical: "Rosa spp.", size: "2–20' H x 2–15' W", category: "Shrubs", subcategory: "Flowering & Deciduous", notes: "Water: Moderate. Sun: Full Sun." },
  { id: 43, symbol: "S-24", name: "Russian Sage", botanical: "Salvia yangii", size: "3–5' H x 3–4' W", category: "Shrubs", subcategory: "Flowering & Deciduous", notes: "Water: Low. Sun: Full Sun. ONE OF THE BEST PLANTS FOR YOUR YARD" },
  { id: 44, symbol: "S-25", name: "Winterberry Holly", botanical: "Ilex verticillata", size: "6–10' H x 6–10' W", category: "Shrubs", subcategory: "Flowering & Deciduous", notes: "Water: Moderate–High. Sun: Full Sun to Part Shade. MOST DRAMATIC WINTER BERRY DISPLAY" },
  { id: 45, symbol: "S-26", name: "Yellow Twig Dogwood", botanical: "Cornus sericea 'Flaviramea'", size: "5–7' H x 5–7' W", category: "Shrubs", subcategory: "Flowering & Deciduous", notes: "Water: Moderate. Sun: Full Sun to Part Shade. Golden-yellow stems in winter" },
  // ===== SHRUBS — Native =====
  { id: 46, symbol: "S-27", name: "Apache Plume", botanical: "Fallugia paradoxa", size: "4–6' H x 4–6' W", category: "Shrubs", subcategory: "Native", notes: "Water: Low. Sun: Full Sun. MOST UNIQUE PLANT ON THIS LIST" },
  { id: 47, symbol: "S-28", name: "Cliffrose", botanical: "Purshia mexicana", size: "4–8' H x 4–6' W", category: "Shrubs", subcategory: "Native", notes: "Water: Low. Sun: Full Sun. INTENSELY FRAGRANT NATIVE" },
  { id: 48, symbol: "S-29", name: "Golden Currant (Utah Native)", botanical: "Ribes aureum", size: "5–8' H x 5–8' W", category: "Shrubs", subcategory: "Native", notes: "Water: Low. Sun: Full Sun to Part Shade." },
  { id: 49, symbol: "S-30", name: "Golden Elderberry (Native)", botanical: "Sambucus nigra ssp. cerulea", size: "10–20' H x 10–20' W", category: "Shrubs", subcategory: "Native", notes: "Water: Moderate. Sun: Full Sun to Part Shade. NATIVE" },
  { id: 50, symbol: "S-31", name: "Gro-Low Fragrant Sumac", botanical: "Rhus aromatica 'Gro-Low'", size: "2–3' H x 6–8' W", category: "Shrubs", subcategory: "Native", notes: "Water: Low. Sun: Full Sun to Part Shade. BEST LOW-SPREADING NATIVE SHRUB" },
  { id: 51, symbol: "S-32", name: "Rabbitbrush", botanical: "Ericameria nauseosa", size: "3–5' H x 3–5' W", category: "Shrubs", subcategory: "Native", notes: "Water: Low. Sun: Full Sun. CRITICAL FALL COLOR + POLLINATOR PLANT" },
  { id: 52, symbol: "S-33", name: "Saskatoon Serviceberry", botanical: "Amelanchier alnifolia", size: "6–12' H x 6–10' W", category: "Shrubs", subcategory: "Native", notes: "Water: Low–Moderate. Sun: Full Sun to Part Shade. Best-tasting serviceberry" },
  { id: 53, symbol: "S-34", name: "Utah Serviceberry (Native)", botanical: "Amelanchier utahensis", size: "6–15' H x 6–15' W", category: "Shrubs", subcategory: "Native", notes: "Water: Low. Sun: Full Sun to Part Shade. NATIVE" },
  { id: 54, symbol: "S-35", name: "Western Sandcherry (Native)", botanical: "Prunus besseyi", size: "4–6' H x 6–8' W", category: "Shrubs", subcategory: "Native", notes: "Water: Low. Sun: Full Sun. NATIVE" },
  // ===== PERENNIALS — Early Spring / Winter =====
  { id: 55, symbol: "P-1", name: "Bleeding Heart", botanical: "Lamprocapnos spectabilis", size: "2–3' H x 2–3' W", category: "Perennials", subcategory: "Early Spring / Winter", notes: "Water: Moderate. Sun: Part Shade to Full Shade. PERFECT FOR NORTH SIDE FIRE PIT AREA" },
  { id: 56, symbol: "P-2", name: "Hellebore (Christmas/Lenten Rose)", botanical: "Helleborus spp.", size: "1–2' H x 1.5–2' W", category: "Perennials", subcategory: "Early Spring / Winter", notes: "Water: Low–Moderate. Sun: Part Shade to Full Shade. Blooms late winter through spring" },
  { id: 57, symbol: "P-3", name: "Siberian Bugloss 'Queen of Hearts'", botanical: "Brunnera macrophylla 'Queen of Hearts'", size: "1.5–2' H x 2–3' W", category: "Perennials", subcategory: "Early Spring / Winter", notes: "Water: Moderate. Sun: Part Shade to Full Shade. BEST SHADE FOLIAGE PLANT" },
  // ===== PERENNIALS — Spring =====
  { id: 58, symbol: "P-4", name: "Astilbe", botanical: "Astilbe × arendsii", size: "1.5–3' H x 1.5–2' W", category: "Perennials", subcategory: "Spring", notes: "Water: Moderate–High. Sun: Part Shade to Full Shade." },
  { id: 59, symbol: "P-5", name: "Catmint", botanical: "Nepeta × faassenii", size: "1–3' H x 2–3' W", category: "Perennials", subcategory: "Spring", notes: "Water: Low. Sun: Full Sun to Part Shade. 'Walker's Low' most popular" },
  { id: 60, symbol: "P-6", name: "Chocolate Flower", botanical: "Berlandiera lyrata", size: "1–2' H x 1–2' W", category: "Perennials", subcategory: "Spring", notes: "Water: Low. Sun: Full Sun. SMELLS LIKE CHOCOLATE" },
  { id: 61, symbol: "P-7", name: "Coral Bells (Heuchera)", botanical: "Heuchera spp.", size: "1–2' H x 1.5–2' W", category: "Perennials", subcategory: "Spring", notes: "Water: Low–Moderate. Sun: Part Shade. FOLIAGE COLOR ANCHOR" },
  { id: 62, symbol: "P-8", name: "Coreopsis 'Double the Sun'", botanical: "Coreopsis grandiflora 'Double the Sun'", size: "1–1.5' H x 1–1.5' W", category: "Perennials", subcategory: "Spring", notes: "Water: Low–Moderate. Sun: Full Sun. CHEERFUL LONG-BLOOMER" },
  { id: 63, symbol: "P-9", name: "Echinacea (Coneflower)", botanical: "Echinacea purpurea", size: "2–4' H x 1.5–2' W", category: "Perennials", subcategory: "Spring", notes: "Water: Low–Moderate. Sun: Full Sun to Part Shade. POLLINATOR POWERHOUSE" },
  { id: 64, symbol: "P-10", name: "False Indigo", botanical: "Baptisia australis", size: "3–4' H x 3–4' W", category: "Perennials", subcategory: "Spring", notes: "Water: Low–Moderate. Sun: Full Sun to Part Shade. OUTSTANDING LONG-LIVED PERENNIAL" },
  { id: 65, symbol: "P-11", name: "Goatsbeard", botanical: "Aruncus dioicus", size: "4–6' H x 3–4' W", category: "Perennials", subcategory: "Spring", notes: "Water: Moderate. Sun: Part Shade to Full Shade. DRAMATIC SHADE PERENNIAL" },
  { id: 66, symbol: "P-12", name: "Iris (Bearded)", botanical: "Iris germanica", size: "2–3' H x 1–2' W", category: "Perennials", subcategory: "Spring", notes: "Water: Low. Sun: Full Sun. Stunning cut flower" },
  { id: 67, symbol: "P-13", name: "Knautia (Crimson Pincushion Flower)", botanical: "Knautia macedonica", size: "1.5–2.5' H x 1.5–2' W", category: "Perennials", subcategory: "Spring", notes: "Water: Low. Sun: Full Sun. DARKEST RED BLOOM AVAILABLE" },
  { id: 68, symbol: "P-14", name: "Lady's Mantle", botanical: "Alchemilla mollis 'Thriller'", size: "1–2' H x 1–2' W", category: "Perennials", subcategory: "Spring", notes: "Water: Moderate. Sun: Part Shade to Full Sun. MAGICAL WATER EFFECT" },
  { id: 69, symbol: "P-15", name: "Marigold", botanical: "Tagetes spp.", size: "0.5–1.5' H x 0.5–1' W", category: "Perennials", subcategory: "Spring", notes: "Water: Low–Moderate. Sun: Full Sun. Natural pest deterrent" },
  { id: 70, symbol: "P-16", name: "Nasturtium (Edible)", botanical: "Tropaeolum majus", size: "1–1.5' H x 1–2' W", category: "Perennials", subcategory: "Spring", notes: "Water: Low. Sun: Full Sun to Part Shade. Entirely edible" },
  { id: 71, symbol: "P-17", name: "Penstemon 'Husker Red'", botanical: "Penstemon digitalis 'Husker Red'", size: "2–3' H x 1.5–2' W", category: "Perennials", subcategory: "Spring", notes: "Water: Low–Moderate. Sun: Full Sun to Part Shade. PERENNIAL PLANT OF THE YEAR" },
  { id: 72, symbol: "P-18", name: "Penstemon (Beardtongue)", botanical: "Penstemon strictus", size: "1.5–4' H x 1.5–2' W", category: "Perennials", subcategory: "Spring", notes: "Water: Low. Sun: Full Sun. UTAH NATIVE HUMMINGBIRD PLANT" },
  { id: 73, symbol: "P-19", name: "Peony", botanical: "Paeonia lactiflora", size: "2–3' H x 3–4' W", category: "Perennials", subcategory: "Spring", notes: "Water: Low–Moderate. Sun: Full Sun. IDEAL FOR MORNING COFFEE SPOT" },
  { id: 74, symbol: "P-20", name: "Prairie Smoke", botanical: "Geum triflorum", size: "0.5–1' H x 1–1.5' W", category: "Perennials", subcategory: "Spring", notes: "Water: Low. Sun: Full Sun to Part Shade. UTAH NATIVE WITH MAGICAL PINK PLUMES" },
  { id: 75, symbol: "P-21", name: "Red Hot Poker", botanical: "Kniphofia uvaria", size: "2–4' H x 2–3' W", category: "Perennials", subcategory: "Spring", notes: "Water: Low–Moderate. Sun: Full Sun. DRAMATIC HUMMINGBIRD MAGNET" },
  { id: 76, symbol: "P-22", name: "Rosemary", botanical: "Salvia rosmarinus", size: "2–6' H x 2–4' W", category: "Perennials", subcategory: "Spring", notes: "Water: Low. Sun: Full Sun. 'Arp' hardiest cultivar" },
  { id: 77, symbol: "P-23", name: "Sage (Common)", botanical: "Salvia officinalis", size: "2–3' H x 2–3' W", category: "Perennials", subcategory: "Spring", notes: "Water: Low. Sun: Full Sun. Extremely drought-tolerant" },
  { id: 78, symbol: "P-24", name: "Showy Milkweed", botanical: "Asclepias speciosa", size: "2–4' H x Spreading", category: "Perennials", subcategory: "Spring", notes: "Water: Low. Sun: Full Sun. CRITICAL MONARCH HOST PLANT" },
  { id: 79, symbol: "P-25", name: "Spring King Salvia", botanical: "Salvia nemorosa 'Spring King'", size: "1–1.5' H x 1–1.5' W", category: "Perennials", subcategory: "Spring", notes: "Water: Low. Sun: Full Sun. EARLIEST BLOOMING SALVIA" },
  { id: 80, symbol: "P-26", name: "Sundancer Daisy", botanical: "Tetraneuris acaulis", size: "0.5–1' H x 0.5–1' W", category: "Perennials", subcategory: "Spring", notes: "Water: Low. Sun: Full Sun. UTAH NATIVE — COVER PLANT" },
  { id: 81, symbol: "P-27", name: "Yarrow", botanical: "Achillea millefolium", size: "2–3' H x 2–3' W", category: "Perennials", subcategory: "Spring", notes: "Water: Low. Sun: Full Sun. EXCELLENT CUT FLOWER" },
  // ===== PERENNIALS — Summer =====
  { id: 82, symbol: "P-28", name: "Agastache (Hummingbird Mint)", botanical: "Agastache rupestris", size: "2–4' H x 2–3' W", category: "Perennials", subcategory: "Summer", notes: "Water: Low. Sun: Full Sun. THE SINGLE MOST IMPORTANT plant for hummingbirds" },
  { id: 83, symbol: "P-29", name: "California Fuchsia (Hummingbird Flower)", botanical: "Zauschneria latifolia", size: "1–3' H x 2–3' W", category: "Perennials", subcategory: "Summer", notes: "Water: Low. Sun: Full Sun. CRITICAL LATE-SEASON HUMMINGBIRD PLANT" },
  { id: 84, symbol: "P-30", name: "Mint", botanical: "Mentha spp.", size: "1–2' H x Spreading", category: "Perennials", subcategory: "Summer", notes: "Water: Moderate–High. Sun: Full Sun to Part Shade. MUST grow in containers — invasive" },
  { id: 85, symbol: "P-31", name: "Rudbeckia (Black-Eyed Susan)", botanical: "Rudbeckia fulgida 'Goldsturm'", size: "1.5–3' H x 1.5–2' W", category: "Perennials", subcategory: "Summer", notes: "Water: Low–Moderate. Sun: Full Sun to Part Shade. EXCELLENT CUT FLOWER" },
  // ===== GRASSES =====
  { id: 86, symbol: "G-1", name: "Blue Grama Grass", botanical: "Bouteloua gracilis", size: "1–2' H x 1–1.5' W", category: "Grasses", subcategory: "", notes: "Water: Low. Sun: Full Sun. UTAH NATIVE" },
  { id: 87, symbol: "G-2", name: "Blue Oat Grass", botanical: "Helictotrichon sempervirens", size: "2–3' H x 2–3' W", category: "Grasses", subcategory: "", notes: "Water: Low. Sun: Full Sun. STERILE — NO POLLEN" },
  { id: 88, symbol: "G-3", name: "Feather Reed Grass 'Karl Foerster'", botanical: "Calamagrostis x acutiflora 'Karl Foerster'", size: "5–6' H x 2–3' W", category: "Grasses", subcategory: "", notes: "Water: Low–Moderate. Sun: Full Sun to Part Shade. STERILE HYBRID" },
  { id: 89, symbol: "G-4", name: "Little Bluestem", botanical: "Schizachyrium scoparium", size: "2–3' H x 1.5–2' W", category: "Grasses", subcategory: "", notes: "Water: Low. Sun: Full Sun. BEST FALL COLOR OF ANY GRASS" },
  { id: 90, symbol: "G-5", name: "Northern Lights Tufted Hairgrass", botanical: "Deschampsia cespitosa 'Northern Lights'", size: "1–1.5' H x 1–1.5' W", category: "Grasses", subcategory: "", notes: "Water: Moderate. Sun: Part Shade to Full Sun. SHADE-TOLERANT" },
  { id: 91, symbol: "G-6", name: "Sideoats Grama", botanical: "Bouteloua curtipendula", size: "1.5–2.5' H x 1–1.5' W", category: "Grasses", subcategory: "", notes: "Water: Low. Sun: Full Sun. UTAH NATIVE" },
  // ===== GROUNDCOVER =====
  { id: 92, symbol: "GC-1", name: "Ajuga 'Burgundy Glow'", botanical: "Ajuga reptans 'Burgundy Glow'", size: "3–4 in H x Spreading", category: "Groundcover", subcategory: "", notes: "Water: Moderate. Sun: Part Shade to Full Sun. TRICOLOR GROUNDCOVER" },
  { id: 93, symbol: "GC-2", name: "Brass Buttons", botanical: "Leptinella squalida", size: "0.2–0.3' H x 12–18\" spread", category: "Groundcover", subcategory: "", notes: "Water: Moderate. Sun: Part Shade to Full Sun. BEST LOW-BEE BAREFOOT GROUNDCOVER" },
  { id: 94, symbol: "GC-3", name: "Chocolate Chip Ajuga", botanical: "Ajuga reptans 'Valfredda'", size: "0.25–0.5' H x Spreading", category: "Groundcover", subcategory: "", notes: "Water: Moderate. Sun: Full Sun to Full Shade. DARK FOLIAGE CONTRAST" },
  { id: 95, symbol: "GC-4", name: "Creeping Jenny", botanical: "Lysimachia nummularia", size: "0.2–0.3' H x Spreading", category: "Groundcover", subcategory: "", notes: "Water: Moderate–High. Sun: Part Shade to Full Shade. EXCELLENT NEAR WATER FEATURE" },
  { id: 96, symbol: "GC-5", name: "Creeping Phlox", botanical: "Phlox subulata", size: "0.3–0.5' H x 2–3' W", category: "Groundcover", subcategory: "", notes: "Water: Low. Sun: Full Sun to Part Shade. LOWER BEE TRAFFIC than thyme" },
  { id: 97, symbol: "GC-6", name: "Delosperma (Ice Plant)", botanical: "Delosperma cooperi", size: "0.25–0.5' H x 1.5–2' W", category: "Groundcover", subcategory: "", notes: "Water: Low. Sun: Full Sun. VERY LOW BEE ATTRACTION" },
  { id: 98, symbol: "GC-7", name: "Dragon's Blood Sedum", botanical: "Sedum spurium 'Dragon's Blood'", size: "4–6 in H x 18–24 in", category: "Groundcover", subcategory: "", notes: "Water: Low. Sun: Full Sun. RED SUCCULENT GROUNDCOVER" },
  { id: 99, symbol: "GC-8", name: "Kinnikinnick (Bearberry)", botanical: "Arctostaphylos uva-ursi", size: "0.5–1' H x 3–6' W", category: "Groundcover", subcategory: "", notes: "Water: Low. Sun: Full Sun to Part Shade. NATIVE EVERGREEN GROUNDCOVER" },
  { id: 100, symbol: "GC-9", name: "Miner's Lettuce (Native)", botanical: "Claytonia perfoliata", size: "0.5–1' H x 0.5' W", category: "Groundcover", subcategory: "", notes: "Water: Low. Sun: Part Shade to Full Shade. NATIVE" },
  { id: 101, symbol: "GC-10", name: "Pink Pussytoes", botanical: "Antennaria dioica 'Rosea'", size: "0.2–0.5' H x 1–1.5' W", category: "Groundcover", subcategory: "", notes: "Water: Low. Sun: Full Sun. BUTTERFLY HOST PLANT" },
  { id: 102, symbol: "GC-11", name: "Prairie Winecup", botanical: "Callirhoe involucrata", size: "0.5–1' H x 2–3' W", category: "Groundcover", subcategory: "", notes: "Water: Low. Sun: Full Sun. STUNNING MAGENTA GROUNDCOVER" },
  { id: 103, symbol: "GC-12", name: "Sweet Woodruff", botanical: "Galium odoratum", size: "0.5–1' H x Spreading", category: "Groundcover", subcategory: "", notes: "Water: Moderate. Sun: Part Shade to Full Shade. FRAGRANT SHADE GROUNDCOVER" },
  { id: 104, symbol: "GC-13", name: "Thyme", botanical: "Thymus spp.", size: "0.5–1' H x 1–2' W", category: "Groundcover", subcategory: "", notes: "Water: Low. Sun: Full Sun." },
  { id: 105, symbol: "GC-14", name: "Woolly Thyme", botanical: "Thymus pseudolanuginosus", size: "0.25–0.5' H x 12–18\" spread", category: "Groundcover", subcategory: "", notes: "Water: Low. Sun: Full Sun to Part Shade." },
  // ===== VINES =====
  { id: 106, symbol: "V-1", name: "Goldflame Honeysuckle", botanical: "Lonicera x heckrottii", size: "10–20' H x 6–8' W", category: "Vines", subcategory: "", notes: "Water: Low–Moderate. Sun: Full Sun to Part Shade. NON-INVASIVE FRAGRANT" },
  { id: 107, symbol: "V-2", name: "Grape", botanical: "Vitis vinifera", size: "8–15' H x 6–10' W", category: "Vines", subcategory: "", notes: "Water: Low–Moderate. Sun: Full Sun. Needs strong trellis" },
  { id: 108, symbol: "V-3", name: "Hops Vine", botanical: "Humulus lupulus", size: "15–25' H x 6–10' W", category: "Vines", subcategory: "", notes: "Water: Moderate. Sun: Full Sun to Part Shade. PERFECT FOR GRILL DECK PERGOLA" },
  { id: 109, symbol: "V-4", name: "Oregon Grape (Mahonia)", botanical: "Mahonia aquifolium", size: "3–6' H x 3–5' W", category: "Vines", subcategory: "", notes: "Water: Low–Moderate. Sun: Part Shade to Full Shade. IDEAL FOR NORTH SIDE" },
  { id: 110, symbol: "V-5", name: "Star Jasmine", botanical: "Trachelospermum jasminoides", size: "3–20' H x 6–8' W", category: "Vines", subcategory: "", notes: "Water: Moderate. Sun: Full Sun to Part Shade. Extremely fragrant" },
  { id: 111, symbol: "V-6", name: "Trumpet Honeysuckle (Native)", botanical: "Lonicera sempervirens", size: "10–20' H x 6–10' W", category: "Vines", subcategory: "", notes: "Water: Low–Moderate. Sun: Full Sun to Part Shade. HUMMINGBIRD MAGNET" },
  { id: 112, symbol: "V-7", name: "Wisteria (American)", botanical: "Wisteria frutescens", size: "15–30' H x 8–15' W", category: "Vines", subcategory: "", notes: "Water: Moderate. Sun: Full Sun. 'Amethyst Falls' compact cultivar" },
  { id: 113, symbol: "V-8", name: "Wisteria (Kentucky)", botanical: "Wisteria macrostachya", size: "15–25' H x 8–15' W", category: "Vines", subcategory: "", notes: "Water: Moderate. Sun: Full Sun. 'Blue Moon' reblooms 2–3x per season; BEST CHOICE for Utah" },
  // ===== CONTAINERS =====
  { id: 114, symbol: "C-1", name: "Amaryllis", botanical: "Hippeastrum spp.", size: "1.5–2' H x 1–1.5' W", category: "Containers", subcategory: "", notes: "Water: Moderate. Sun: Full Sun to Part Shade. ADDRESS NAMESAKE PLANT" },
  { id: 115, symbol: "C-2", name: "Cherimoya", botanical: "Annona cherimola", size: "25–30' H x 15–20' W", category: "Containers", subcategory: "", notes: "Water: Moderate. Sun: Full Sun to Part Shade. Mark Twain's 'most delicious fruit'" },
  { id: 116, symbol: "C-3", name: "Hibiscus (Tropical) — Container", botanical: "Hibiscus rosa-sinensis", size: "4–8' H x 3–5' W", category: "Containers", subcategory: "", notes: "Water: Moderate–High. Sun: Full Sun. Large showy flowers" },
  { id: 117, symbol: "C-4", name: "Lemon", botanical: "Citrus limon", size: "8–20' H x 6–12' W", category: "Containers", subcategory: "", notes: "Water: Moderate. Sun: Full Sun. 'Meyer Lemon' best for containers" },
  { id: 118, symbol: "C-5", name: "Lime", botanical: "Citrus aurantifolia", size: "6–13' H x 6–10' W", category: "Containers", subcategory: "", notes: "Water: Moderate. Sun: Full Sun. 'Bearss' Persian lime good for containers" },
  { id: 119, symbol: "C-6", name: "Loquat (Nispero)", botanical: "Eriobotrya japonica", size: "20–30' H x 15–25' W", category: "Containers", subcategory: "", notes: "Water: Moderate. Sun: Full Sun to Part Shade. Very ornamental leaves" },
  { id: 120, symbol: "C-7", name: "Pomegranate", botanical: "Punica granatum", size: "12–20' H x 8–12' W", category: "Containers", subcategory: "", notes: "Water: Low–Moderate. Sun: Full Sun. 'Utah Sweet' may work" },
  // ===== BULBS =====
  { id: 121, symbol: "B-1", name: "Allium (Ornamental Onion)", botanical: "Allium spp.", size: "1–4' H x 0.5–1' W", category: "Bulbs", subcategory: "", notes: "Water: Low. Sun: Full Sun. STRIKING CUT FLOWER" },
  { id: 122, symbol: "B-2", name: "Snowdrops", botanical: "Galanthus nivalis", size: "0.25–0.5' H x 0.1–0.2' W", category: "Bulbs", subcategory: "", notes: "Water: Low–Moderate. Sun: Part Shade to Full Shade. First bloom of late winter/spring" },
];

// ===== CATEGORY ICONS =====
const CATEGORY_ICONS = {
  Trees: "\u{1F333}",
  Shrubs: "\u{1F33F}",
  Perennials: "\u{1F338}",
  Grasses: "\u{1F33E}",
  Groundcover: "\u{1FAB4}",
  Vines: "\u{1F331}",
  Containers: "\u{1FAB4}",
  Bulbs: "\u{1F337}",
};

// ===== PLACEHOLDER SVG PER CATEGORY =====
function placeholderSvg(category) {
  const colors = {
    Trees: "#2d6a4f",
    Shrubs: "#52796f",
    Perennials: "#b5838d",
    Grasses: "#a3b18a",
    Groundcover: "#588157",
    Vines: "#6b705c",
    Containers: "#bc6c25",
    Bulbs: "#9b59b6",
  };
  const c = colors[category] || "#6c757d";
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160"><rect width="200" height="160" fill="${c}" opacity="0.12"/><text x="100" y="70" text-anchor="middle" font-size="48">${CATEGORY_ICONS[category] || "\u{1F33F}"}</text><text x="100" y="110" text-anchor="middle" font-size="14" fill="${c}" font-family="sans-serif">${category}</text></svg>`
  )}`;
}

// ===== STATE =====
const STORAGE_KEY = "plantScoutData";
let userData = {};
let activeCategory = "All";
let activeStatus = "all";
let searchQuery = "";
let currentPlantId = null;

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) userData = JSON.parse(raw);
  } catch (_e) {
    userData = {};
  }
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
}

function getPlantData(symbol) {
  if (!userData[symbol]) {
    userData[symbol] = { rating: null, zone: "", notes: "", photos: [] };
  }
  return userData[symbol];
}

// ===== TOAST =====
let toastTimer = null;
function showToast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
}

// ===== PROGRESS =====
function updateProgress() {
  let reviewed = 0;
  for (const p of PLANTS) {
    const d = userData[p.symbol];
    if (d && d.rating) reviewed++;
  }
  const pct = Math.round((reviewed / PLANTS.length) * 100);
  document.getElementById("progressText").textContent = `${reviewed} / ${PLANTS.length} reviewed`;
  document.getElementById("progressFill").style.width = `${pct}%`;
}

// ===== CATEGORY FILTERS =====
function buildCategoryFilters() {
  const container = document.getElementById("categoryFilters");
  const cats = ["All"];
  const seen = new Set();
  for (const p of PLANTS) {
    if (!seen.has(p.category)) {
      seen.add(p.category);
      cats.push(p.category);
    }
  }
  container.innerHTML = "";
  for (const cat of cats) {
    const btn = document.createElement("button");
    btn.className = "filter-chip" + (cat === activeCategory ? " active" : "");
    btn.textContent = cat === "All" ? "All" : `${CATEGORY_ICONS[cat] || ""} ${cat}`;
    btn.dataset.category = cat;
    btn.addEventListener("click", () => {
      activeCategory = cat;
      container.querySelectorAll(".filter-chip").forEach((b) => b.classList.toggle("active", b.dataset.category === cat));
      renderPlantList();
    });
    container.appendChild(btn);
  }
}

// ===== STATUS FILTERS =====
function initStatusFilters() {
  document.querySelectorAll("#statusFilters .status-chip").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeStatus = btn.dataset.status;
      document.querySelectorAll("#statusFilters .status-chip").forEach((b) => b.classList.toggle("active", b === btn));
      renderPlantList();
    });
  });
}

// ===== SEARCH =====
function initSearch() {
  const input = document.getElementById("searchInput");
  const clear = document.getElementById("clearSearch");
  input.addEventListener("input", () => {
    searchQuery = input.value.trim().toLowerCase();
    clear.style.display = searchQuery ? "block" : "none";
    renderPlantList();
  });
  clear.addEventListener("click", () => {
    input.value = "";
    searchQuery = "";
    clear.style.display = "none";
    renderPlantList();
    input.focus();
  });
}

// ===== FILTER PLANTS =====
function filteredPlants() {
  return PLANTS.filter((p) => {
    if (activeCategory !== "All" && p.category !== activeCategory) return false;
    if (activeStatus !== "all") {
      const d = userData[p.symbol];
      const rating = d ? d.rating : null;
      if (activeStatus === "unreviewed" && rating) return false;
      if (activeStatus === "love" && rating !== "love") return false;
      if (activeStatus === "maybe" && rating !== "maybe") return false;
      if (activeStatus === "skip" && rating !== "skip") return false;
    }
    if (searchQuery) {
      const hay = `${p.name} ${p.botanical} ${p.notes} ${p.symbol}`.toLowerCase();
      if (!hay.includes(searchQuery)) return false;
    }
    return true;
  });
}

// ===== RATING DOT HTML =====
function ratingDotHtml(rating) {
  if (rating === "love") return '<span class="dot love"></span>';
  if (rating === "maybe") return '<span class="dot maybe"></span>';
  if (rating === "skip") return '<span class="dot skip"></span>';
  return '<span class="dot unreviewed"></span>';
}

// ===== RENDER PLANT LIST =====
function renderPlantList() {
  const container = document.getElementById("plantList");
  const list = filteredPlants();
  let html = "";
  let lastCatSub = "";

  for (const p of list) {
    const groupKey = p.subcategory ? `${p.category} — ${p.subcategory}` : p.category;
    if (groupKey !== lastCatSub) {
      lastCatSub = groupKey;
      html += `<div class="category-header">${CATEGORY_ICONS[p.category] || ""} ${groupKey}</div>`;
    }
    const d = userData[p.symbol];
    const rating = d ? d.rating : null;
    const hasNotes = d && d.notes;
    const hasPhotos = d && d.photos && d.photos.length > 0;
    html += `<div class="plant-card" data-id="${p.id}">
      <div class="card-thumb">
        <img src="images/${p.symbol}.jpg" alt="${p.name}" onerror="this.src='${placeholderSvg(p.category)}'">
        <span class="card-symbol-label">${p.symbol}</span>
        ${rating ? `<span class="card-rating-dot ${rating}"></span>` : ""}
      </div>
      <div class="card-body">
        <div class="card-name">${p.name}</div>
        <div class="card-botanical">${p.botanical}</div>
        <div class="card-size">${p.size}</div>
      </div>
      <div class="card-icons">
        ${hasNotes ? '<span class="card-badge">&#128221;</span>' : ""}
        ${hasPhotos ? '<span class="card-badge">&#128247;</span>' : ""}
      </div>
      <div class="card-arrow">&#8250;</div>
    </div>`;
  }

  if (!list.length) {
    html = '<div class="empty-state">No plants match your filters.</div>';
  }

  container.innerHTML = html;

  container.querySelectorAll(".plant-card").forEach((card) => {
    card.addEventListener("click", () => openDetail(parseInt(card.dataset.id, 10)));
  });
}

// ===== DETAIL OVERLAY =====
function openDetail(plantId) {
  currentPlantId = plantId;
  const p = PLANTS[plantId];
  const d = getPlantData(p.symbol);

  document.getElementById("detailName").textContent = p.name;
  document.getElementById("detailBotanical").textContent = p.botanical;
  document.getElementById("detailSymbol").textContent = p.symbol;
  document.getElementById("detailCategory").textContent = p.category;
  document.getElementById("detailSubcategory").textContent = p.subcategory || "—";
  document.getElementById("detailSize").textContent = p.size;
  document.getElementById("detailCsvNotes").textContent = p.notes;

  // Rating dot
  const dot = document.getElementById("detailDot");
  dot.className = "rating-dot";
  if (d.rating) dot.classList.add(d.rating);

  // Rating buttons
  document.querySelectorAll(".rating-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.rating === d.rating);
  });

  // Zone
  document.getElementById("detailZone").value = d.zone || "";

  // Notes
  document.getElementById("detailNotes").value = d.notes || "";

  // Find in Park
  renderParkLocations(p.symbol);

  // Reference photo
  const refImg = document.getElementById("detailRefPhoto");
  const imgPath = `images/${p.symbol}.jpg`;
  refImg.src = imgPath;
  refImg.style.display = "block";
  refImg.onerror = function () {
    this.src = placeholderSvg(p.category);
  };

  // Photos
  renderDetailPhotos(p.symbol);

  // Show overlay
  const overlay = document.getElementById("detailOverlay");
  overlay.classList.add("open");
  overlay.scrollTop = 0;
}

function closeDetail() {
  document.getElementById("detailOverlay").classList.remove("open");
  currentPlantId = null;
  renderPlantList();
  updateProgress();
}

// ===== PARK LOCATIONS (from CGP website) =====
function renderParkLocations(symbol) {
  const section = document.getElementById("findInParkSection");
  const container = document.getElementById("parkLocations");
  const cgpLink = document.getElementById("cgpLink");

  const info = typeof PARK_LOCATIONS !== "undefined" ? PARK_LOCATIONS[symbol] : null;

  if (!info) {
    section.style.display = "none";
    return;
  }

  section.style.display = "block";
  let html = "";

  if (info.cgpName) {
    html += `<div style="font-size:0.8rem;color:#555;margin-bottom:6px">CGP listing: <strong>${info.cgpName}</strong></div>`;
  }

  if (info.notDisplayed) {
    html += `<div class="park-not-displayed">Not currently on display at the park</div>`;
  } else if (info.locations && info.locations.length) {
    for (const loc of info.locations) {
      html += `<div class="park-location-group">`;
      html += `<div class="park-path-name">${loc.path}</div>`;
      html += `<ul class="park-area-list">`;
      for (const area of loc.areas) {
        html += `<li>${area}</li>`;
      }
      html += `</ul></div>`;
    }
  }

  container.innerHTML = html;

  if (info.cgpUrl) {
    cgpLink.href = info.cgpUrl;
    cgpLink.style.display = "inline-block";
  } else {
    cgpLink.style.display = "none";
  }
}

function renderDetailPhotos(symbol) {
  const d = getPlantData(symbol);
  const container = document.getElementById("detailPhotos");
  let html = "";
  if (d.photos) {
    d.photos.forEach((src, i) => {
      html += `<div class="photo-thumb">
        <img src="${src}" alt="Photo ${i + 1}">
        <button class="photo-delete" data-index="${i}">&times;</button>
      </div>`;
    });
  }
  html += `<label class="photo-add-btn">
    <span class="camera-icon">&#128247;</span>
    <span>Add Photo</span>
    <input type="file" accept="image/*" capture="environment" id="photoInput" style="display:none">
  </label>`;
  container.innerHTML = html;

  // Bind photo input
  container.querySelector("#photoInput").addEventListener("change", handlePhotoCapture);

  // Bind delete buttons
  container.querySelectorAll(".photo-delete").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.dataset.index, 10);
      const p = PLANTS[currentPlantId];
      const pd = getPlantData(p.symbol);
      pd.photos.splice(idx, 1);
      saveData();
      renderDetailPhotos(p.symbol);
      showToast("Photo removed");
    });
  });
}

function handlePhotoCapture(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (ev) {
    const img = new Image();
    img.onload = function () {
      const maxDim = 800;
      let w = img.width;
      let h = img.height;
      if (w > maxDim || h > maxDim) {
        if (w > h) {
          h = Math.round((h * maxDim) / w);
          w = maxDim;
        } else {
          w = Math.round((w * maxDim) / h);
          h = maxDim;
        }
      }
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      canvas.getContext("2d").drawImage(img, 0, 0, w, h);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
      const p = PLANTS[currentPlantId];
      const d = getPlantData(p.symbol);
      if (!d.photos) d.photos = [];
      d.photos.push(dataUrl);
      saveData();
      renderDetailPhotos(p.symbol);
      showToast("Photo saved");
    };
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
}

// ===== DETAIL EVENT BINDINGS =====
function initDetail() {
  // Back button
  document.getElementById("detailBack").addEventListener("click", closeDetail);

  // Rating buttons
  document.querySelectorAll(".rating-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (currentPlantId === null) return;
      const p = PLANTS[currentPlantId];
      const d = getPlantData(p.symbol);
      const newRating = btn.dataset.rating;
      d.rating = d.rating === newRating ? null : newRating;
      saveData();
      // Update UI
      document.querySelectorAll(".rating-btn").forEach((b) => b.classList.toggle("active", b.dataset.rating === d.rating));
      const dot = document.getElementById("detailDot");
      dot.className = "rating-dot";
      if (d.rating) dot.classList.add(d.rating);
      showToast(d.rating ? `Rated: ${d.rating}` : "Rating cleared");
    });
  });

  // Zone select
  document.getElementById("detailZone").addEventListener("change", (e) => {
    if (currentPlantId === null) return;
    const p = PLANTS[currentPlantId];
    const d = getPlantData(p.symbol);
    d.zone = e.target.value;
    saveData();
    if (d.zone) showToast("Zone saved");
  });

  // Notes textarea
  const notesEl = document.getElementById("detailNotes");
  let notesSaveTimer = null;
  const saveNotes = () => {
    if (currentPlantId === null) return;
    const p = PLANTS[currentPlantId];
    const d = getPlantData(p.symbol);
    d.notes = notesEl.value;
    saveData();
  };
  notesEl.addEventListener("input", () => {
    clearTimeout(notesSaveTimer);
    notesSaveTimer = setTimeout(saveNotes, 400);
  });
  notesEl.addEventListener("blur", saveNotes);
}

// ===== BOTTOM NAV =====
function initNav() {
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const view = btn.dataset.view;
      document.querySelectorAll(".nav-btn").forEach((b) => b.classList.toggle("active", b === btn));
      document.querySelectorAll(".view").forEach((v) => v.classList.toggle("active", v.id === view));

      // Show/hide top bar elements for list view only
      const statusRow = document.getElementById("statusFilters");
      const topBar = document.getElementById("topBar");
      if (view === "viewList") {
        statusRow.style.display = "";
        topBar.style.display = "";
      } else {
        statusRow.style.display = "none";
        topBar.style.display = "none";
      }

      if (view === "viewFavorites") renderFavorites();
      if (view === "viewZones") renderZones();
      if (view === "viewExport") renderExportStats();
    });
  });
}

// ===== FAVORITES VIEW =====
function renderFavorites() {
  const container = document.getElementById("favList");
  const loved = PLANTS.filter((p) => {
    const d = userData[p.symbol];
    return d && d.rating === "love";
  });

  if (!loved.length) {
    container.innerHTML = '<div class="empty-state">No favorites yet. Rate plants with \u{1F49A} Love to add them here.</div>';
    return;
  }

  let html = `<div class="view-header"><h2>\u{1F49A} Favorites (${loved.length})</h2></div>`;
  let lastCat = "";
  for (const p of loved) {
    if (p.category !== lastCat) {
      lastCat = p.category;
      html += `<div class="category-header">${CATEGORY_ICONS[p.category] || ""} ${p.category}</div>`;
    }
    const d = userData[p.symbol];
    html += `<div class="plant-card fav-card" data-id="${p.id}">
      <div class="card-left"><div class="card-symbol">${p.symbol}</div></div>
      <div class="card-body">
        <div class="card-name">${p.name}</div>
        <div class="card-botanical">${p.botanical}</div>
        <div class="card-size">${p.size}</div>
        ${d.notes ? `<div class="card-user-note">${escapeHtml(d.notes)}</div>` : ""}
        ${d.zone ? `<div class="card-zone">\u{1F4CD} ${escapeHtml(d.zone)}</div>` : ""}
      </div>
      <div class="card-arrow">&#8250;</div>
    </div>`;
  }
  container.innerHTML = html;
  container.querySelectorAll(".plant-card").forEach((card) => {
    card.addEventListener("click", () => openDetail(parseInt(card.dataset.id, 10)));
  });
}

// ===== PARK MAP VIEW =====

// Numbered zones from the CGP park map, in order
const PARK_ZONE_ORDER = [
  // Example Landscapes
  { num: 1,  name: "A Desert with Altitude",   section: "Example Landscapes" },
  { num: 2,  name: "Harvest Haven",             section: "Example Landscapes" },
  { num: 3,  name: "Prudent Perennials",         section: "Example Landscapes" },
  { num: 4,  name: "Traditional Yet Thrifty",    section: "Example Landscapes" },
  { num: 5,  name: "Tradition with a Twist",     section: "Example Landscapes" },
  { num: 6,  name: "Waterwise Woodlands",        section: "Example Landscapes" },
  // Localscapes
  { num: 7,  name: "Paths and Pollinators",      section: "Localscapes" },
  { num: 7,  name: "Paths & Pollinators",        section: "Localscapes" }, // alias
  { num: 8,  name: "Localscapes Exhibit",        section: "Localscapes" },
  { num: 8,  name: "Localscapes Entry Beds",     section: "Localscapes" }, // alias
  { num: 9,  name: "Park Strip Hill",            section: "Localscapes" },
  { num: 9,  name: "Park Strip #1",              section: "Localscapes" },
  { num: 9,  name: "Park Strip #2",              section: "Localscapes" },
  { num: 9,  name: "Park Strip #3",              section: "Localscapes" },
  { num: 9,  name: "Park Strip #4",              section: "Localscapes" },
  { num: 9,  name: "Park Strip #5",              section: "Localscapes" },
  { num: 9,  name: "Park Strip #6",              section: "Localscapes" },
  { num: 9,  name: "Park Strip #7",              section: "Localscapes" },
  { num: 9,  name: "Park Strip #8",              section: "Localscapes" },
  // Design
  { num: 10, name: "Survey First",               section: "Design" },
  { num: 11, name: "Initial Analysis",           section: "Design" },
  { num: 12, name: "Climate Control",            section: "Design" },
  { num: 13, name: "Scene or Unseen",            section: "Design" },
  { num: 14, name: "The Produce Section",        section: "Design" },
  { num: 15, name: "Hardscape Exhibit",          section: "Design" },
  // Planting
  { num: 16, name: "Perfect Planting",           section: "Planting" },
  { num: 17, name: "Marvelous Mulch",            section: "Planting" },
  { num: 18, name: "First Amendments",           section: "Planting" },
  { num: 19, name: "Signature Soils",            section: "Planting" },
  { num: 20, name: "Avoiding Erosion",           section: "Planting" },
  { num: 21, name: "Nursery Shopping",           section: "Planting" },
  // Irrigation
  { num: 22, name: "Turf Tips",                  section: "Irrigation" },
  { num: 23, name: "Turf Alternatives",          section: "Irrigation" },
  { num: 24, name: "Irrigation Hardware",        section: "Irrigation" },
  { num: 25, name: "Watering Drop by Drop",      section: "Irrigation" },
  { num: 26, name: "Puddle Trouble",             section: "Irrigation" },
  { num: 27, name: "The Right Way to Spray",     section: "Irrigation" },
  { num: 28, name: "Mountain to Tap",            section: "Irrigation" },
  { num: 29, name: "Effortless Irrigation",      section: "Irrigation" },
  // Maintenance
  { num: 30, name: "Moving Day",                 section: "Maintenance" },
  { num: 31, name: "Outsmart Invaders",          section: "Maintenance" },
  { num: 32, name: "Compost Salad",              section: "Maintenance" },
  { num: 33, name: "Rain Gardening",             section: "Maintenance" },
  { num: 34, name: "Backyard Makeover",          section: "Maintenance" },
  { num: 35, name: "Maintenance Matters",        section: "Maintenance" },
  { num: 36, name: "Rain Water Harvesting",      section: "Maintenance" },
];

const SECTION_ICONS = {
  "Example Landscapes": "🏡",
  "Localscapes": "🌿",
  "Design": "📐",
  "Planting": "🌱",
  "Irrigation": "💧",
  "Maintenance": "🔧",
};

function buildParkAreaIndex() {
  // Maps area name → list of plant IDs found there
  const index = {};
  if (typeof PARK_LOCATIONS === "undefined") return index;

  for (const [symbol, info] of Object.entries(PARK_LOCATIONS)) {
    if (!info.locations) continue;
    const plant = PLANTS.find((p) => p.symbol === symbol);
    if (!plant) continue;
    for (const loc of info.locations) {
      for (const area of loc.areas) {
        if (!index[area]) index[area] = [];
        index[area].push(plant.id);
      }
    }
  }
  return index;
}

function renderZones() {
  const container = document.getElementById("zoneList");
  const areaIndex = buildParkAreaIndex();

  if (!Object.keys(areaIndex).length) {
    container.innerHTML = '<div class="empty-state">No park location data available.</div>';
    return;
  }

  // Build ordered zone list — numbered zones in map order, then "other"
  const rendered = new Set();      // area names already shown
  const usedAreaNames = new Set(PARK_ZONE_ORDER.map((z) => z.name));
  let lastSection = "";
  let html = '<div style="padding:12px 12px 4px;font-size:0.8rem;color:#555;">Tap a zone to expand · Plants appear in every zone where they grow</div>';

  // Deduplicate PARK_ZONE_ORDER entries so each display name appears once
  const seen = new Set();
  const orderedZones = [];
  for (const z of PARK_ZONE_ORDER) {
    if (!seen.has(z.name)) {
      seen.add(z.name);
      orderedZones.push(z);
    }
  }

  for (const zone of orderedZones) {
    const plants = (areaIndex[zone.name] || []).map((id) => PLANTS[id]);
    if (!plants.length) continue; // skip zones with no plants from our list

    rendered.add(zone.name);

    if (zone.section !== lastSection) {
      lastSection = zone.section;
      html += `<div class="park-section-header">${SECTION_ICONS[zone.section] || ""} ${zone.section}</div>`;
    }

    html += renderParkZoneBlock(zone.num, zone.name, plants);
  }

  // Other areas (not in the numbered map — parking lots, building entries, etc.)
  const otherAreas = Object.keys(areaIndex).filter((a) => !rendered.has(a)).sort();
  if (otherAreas.length) {
    html += `<div class="park-section-header">🏛️ Other Areas</div>`;
    for (const area of otherAreas) {
      const plants = (areaIndex[area] || []).map((id) => PLANTS[id]);
      if (plants.length) html += renderParkZoneBlock(null, area, plants);
    }
  }

  container.innerHTML = html;

  // Collapsible toggle
  container.querySelectorAll(".park-zone-header").forEach((header) => {
    header.addEventListener("click", () => {
      const block = header.closest(".park-zone-block");
      block.classList.toggle("open");
    });
  });

  container.querySelectorAll(".plant-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      e.stopPropagation();
      openDetail(parseInt(card.dataset.id, 10));
    });
  });
}

function renderParkZoneBlock(num, name, plants) {
  const numBadge = num != null ? `<span class="zone-num-badge">${num}</span>` : "";
  const count = plants.length;
  let html = `<div class="park-zone-block">
    <div class="park-zone-header">
      ${numBadge}
      <span class="park-zone-name">${name}</span>
      <span class="zone-plant-count">${count} plant${count !== 1 ? "s" : ""}</span>
      <span class="zone-chevron">›</span>
    </div>
    <div class="park-zone-plants">`;

  for (const p of plants) {
    const d = userData[p.symbol];
    const rating = d ? d.rating : null;
    html += `<div class="plant-card" data-id="${p.id}">
      <div class="card-thumb">
        <img src="images/${p.symbol}.jpg" alt="${p.name}" onerror="this.src='${placeholderSvg(p.category)}'">
        <span class="card-symbol-label">${p.symbol}</span>
        ${rating ? `<span class="card-rating-dot ${rating}"></span>` : ""}
      </div>
      <div class="card-body">
        <div class="card-name">${p.name}</div>
        <div class="card-botanical">${p.botanical}</div>
      </div>
      <div class="card-arrow">&#8250;</div>
    </div>`;
  }

  html += `</div></div>`;
  return html;
}

// ===== EXPORT =====
function renderExportStats() {
  let loved = 0, maybe = 0, skipped = 0, noted = 0, photoed = 0, zoned = 0;
  for (const p of PLANTS) {
    const d = userData[p.symbol];
    if (!d) continue;
    if (d.rating === "love") loved++;
    if (d.rating === "maybe") maybe++;
    if (d.rating === "skip") skipped++;
    if (d.notes) noted++;
    if (d.photos && d.photos.length) photoed++;
    if (d.zone) zoned++;
  }
  const reviewed = loved + maybe + skipped;
  document.getElementById("exportStats").innerHTML =
    `<strong>${reviewed}</strong> reviewed &nbsp;|&nbsp; ` +
    `<span style="color:#2d6a4f">\u{1F49A} ${loved}</span> &nbsp; ` +
    `<span style="color:#e9c46a">\u{1F914} ${maybe}</span> &nbsp; ` +
    `<span style="color:#adb5bd">\u{1F6AB} ${skipped}</span><br>` +
    `\u{1F4DD} ${noted} with notes &nbsp;|&nbsp; \u{1F4F7} ${photoed} with photos &nbsp;|&nbsp; \u{1F4CD} ${zoned} zone-tagged`;
}

function initExport() {
  // JSON export
  document.getElementById("btnExportJSON").addEventListener("click", () => {
    const exportData = {
      exportedAt: new Date().toISOString(),
      plants: PLANTS.map((p) => {
        const d = userData[p.symbol] || {};
        return {
          symbol: p.symbol,
          name: p.name,
          botanical: p.botanical,
          size: p.size,
          category: p.category,
          subcategory: p.subcategory,
          researchNotes: p.notes,
          rating: d.rating || null,
          zone: d.zone || "",
          userNotes: d.notes || "",
          photoCount: d.photos ? d.photos.length : 0,
          photos: d.photos || [],
        };
      }),
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `plant-scout-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("JSON downloaded");
  });

  // Copy summary
  document.getElementById("btnCopySummary").addEventListener("click", () => {
    let text = "Plant Scout — Field Notes Summary\n";
    text += `Exported: ${new Date().toLocaleDateString()}\n\n`;

    const sections = [
      { label: "LOVE", filter: "love" },
      { label: "MAYBE", filter: "maybe" },
    ];
    for (const sec of sections) {
      const plants = PLANTS.filter((p) => {
        const d = userData[p.symbol];
        return d && d.rating === sec.filter;
      });
      if (!plants.length) continue;
      text += `=== ${sec.label} ===\n`;
      for (const p of plants) {
        const d = userData[p.symbol];
        text += `\n${p.symbol} ${p.name} (${p.botanical})\n`;
        text += `  Size: ${p.size}\n`;
        if (d.zone) text += `  Zone: ${d.zone}\n`;
        if (d.notes) text += `  Notes: ${d.notes}\n`;
      }
      text += "\n";
    }

    navigator.clipboard.writeText(text).then(
      () => showToast("Summary copied to clipboard"),
      () => showToast("Failed to copy")
    );
  });

  // Share
  document.getElementById("btnShareExport").addEventListener("click", () => {
    if (!navigator.share) {
      showToast("Share not supported on this device");
      return;
    }
    let text = "Plant Scout Notes\n\n";
    const loved = PLANTS.filter((p) => {
      const d = userData[p.symbol];
      return d && d.rating === "love";
    });
    for (const p of loved) {
      const d = userData[p.symbol];
      text += `${p.symbol} ${p.name}`;
      if (d.zone) text += ` [${d.zone}]`;
      if (d.notes) text += ` — ${d.notes}`;
      text += "\n";
    }
    navigator.share({ title: "Plant Scout Notes", text }).catch(() => {});
  });
}

// ===== UTILITY =====
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// ===== SERVICE WORKER =====
function registerSW() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  loadData();
  buildCategoryFilters();
  initStatusFilters();
  initSearch();
  initDetail();
  initNav();
  initExport();
  updateProgress();
  renderPlantList();
  registerSW();
});
