/**
 * CivicVoice seed — All 31 Karnataka districts, Bangalore wards,
 * Kodihalli & Nagaraghatta Gram Panchayat, Chikkamagaluru, Tumakuru,
 * and high-quality Unsplash problem photos.
 *
 * Run with:  npx tsx --env-file=.env.local scripts/seed.ts
 */
import "dotenv/config";
import { db } from "../src/db";
import {
  categories,
  comments,
  locations,
  notifications,
  officialResponses,
  problems,
  sessions,
  statusEvents,
  supports,
  users,
  verificationRequests,
} from "../src/db/schema";
import { hashPassword } from "../src/lib/password";

const daysAgo = (n: number) => new Date(Date.now() - n * 24 * 60 * 60 * 1000);

async function main() {
  console.log("Resetting tables…");
  await db.delete(notifications);
  await db.delete(verificationRequests);
  await db.delete(comments);
  await db.delete(supports);
  await db.delete(officialResponses);
  await db.delete(statusEvents);
  await db.delete(problems);
  await db.delete(sessions);
  await db.delete(users);
  await db.delete(locations);
  await db.delete(categories);

  /* =============================== CATEGORIES ============================== */
  const catRows = await db
    .insert(categories)
    .values([
      { name: "Roads", slug: "roads", icon: "route", color: "orange" },
      { name: "Drainage", slug: "drainage", icon: "waves", color: "cyan" },
      { name: "Streetlights", slug: "streetlights", icon: "lamp", color: "yellow" },
      { name: "Garbage", slug: "garbage", icon: "trash-2", color: "lime" },
      { name: "Water Supply", slug: "water-supply", icon: "droplets", color: "blue" },
      { name: "Public Safety", slug: "public-safety", icon: "shield-alert", color: "rose" },
    ])
    .returning();
  const cat = Object.fromEntries(catRows.map((c) => [c.slug, c.id]));
  console.log(`Categories: ${catRows.length}`);

  /* =============================== LOCATIONS =============================== */
  console.log("Inserting locations…");

  // ── STATE ──
  const [karnataka] = await db
    .insert(locations)
    .values({ name: "Karnataka", slug: "karnataka", type: "state", mapX: 50, mapY: 50 })
    .returning();

  // ── ALL EXACTLY 31 DISTRICTS ──
  const districtData: { name: string; slug: string; mapX: number; mapY: number }[] = [
    { name: "Bidar", slug: "bidar", mapX: 78, mapY: 8 },
    { name: "Kalaburagi", slug: "kalaburagi", mapX: 72, mapY: 18 },
    { name: "Yadgir", slug: "yadgir", mapX: 70, mapY: 28 },
    { name: "Vijayapura", slug: "vijayapura", mapX: 58, mapY: 12 },
    { name: "Bagalkote", slug: "bagalkote", mapX: 48, mapY: 10 },
    { name: "Raichur", slug: "raichur", mapX: 55, mapY: 30 },
    { name: "Koppal", slug: "koppal", mapX: 46, mapY: 20 },
    { name: "Ballari", slug: "ballari", mapX: 52, mapY: 34 },
    { name: "Vijayanagara", slug: "vijayanagara", mapX: 54, mapY: 26 },
    { name: "Belagavi", slug: "belagavi", mapX: 28, mapY: 6 },
    { name: "Dharwad", slug: "dharwad", mapX: 35, mapY: 14 },
    { name: "Gadag", slug: "gadag", mapX: 40, mapY: 16 },
    { name: "Haveri", slug: "haveri", mapX: 38, mapY: 26 },
    { name: "Uttara Kannada", slug: "uttara-kannada", mapX: 20, mapY: 20 },
    { name: "Shivamogga", slug: "shivamogga", mapX: 30, mapY: 36 },
    { name: "Davanagere", slug: "davanagere", mapX: 40, mapY: 34 },
    { name: "Chitradurga", slug: "chitradurga", mapX: 48, mapY: 38 },
    { name: "Tumakuru", slug: "tumakuru", mapX: 56, mapY: 52 },
    { name: "Chikkaballapur", slug: "chikkaballapur", mapX: 68, mapY: 44 },
    { name: "Kolar", slug: "kolar", mapX: 76, mapY: 50 },
    { name: "Bengaluru Urban", slug: "bengaluru-urban", mapX: 66, mapY: 56 },
    { name: "Bengaluru Rural", slug: "bengaluru-rural", mapX: 62, mapY: 48 },
    { name: "Ramanagara", slug: "ramanagara", mapX: 58, mapY: 60 },
    { name: "Mandya", slug: "mandya", mapX: 50, mapY: 64 },
    { name: "Hassan", slug: "hassan", mapX: 34, mapY: 52 },
    { name: "Mysuru", slug: "mysuru", mapX: 44, mapY: 72 },
    { name: "Chamarajanagar", slug: "chamarajanagar", mapX: 48, mapY: 82 },
    { name: "Kodagu", slug: "kodagu", mapX: 28, mapY: 68 },
    { name: "Udupi", slug: "udupi", mapX: 18, mapY: 38 },
    { name: "Dakshina Kannada", slug: "dakshina-kannada", mapX: 16, mapY: 50 },
    { name: "Chikkamagaluru", slug: "chikkamagaluru", mapX: 26, mapY: 56 },
  ];

  const districts: Record<string, { id: number }> = {};
  for (const d of districtData) {
    const [row] = await db
      .insert(locations)
      .values({ name: d.name, slug: d.slug, type: "district", parentId: karnataka.id, mapX: d.mapX, mapY: d.mapY })
      .returning();
    districts[d.slug] = row;
  }

  // ── TALUKS ──
  const talukDefs: { name: string; slug: string; district: string }[] = [
    // Chikkamagaluru
    { name: "Chikkamagaluru", slug: "chikkamagaluru-taluk", district: "chikkamagaluru" },
    { name: "Kadur", slug: "kadur", district: "chikkamagaluru" },
    { name: "Koppa", slug: "koppa", district: "chikkamagaluru" },
    { name: "Mudigere", slug: "mudigere", district: "chikkamagaluru" },
    { name: "Narasimharajapura", slug: "narasimharajapura", district: "chikkamagaluru" },
    { name: "Sringeri", slug: "sringeri", district: "chikkamagaluru" },
    { name: "Tarikere", slug: "tarikere", district: "chikkamagaluru" },
    // Tumakuru
    { name: "Tumakuru", slug: "tumakuru-taluk", district: "tumakuru" },
    { name: "Tiptur", slug: "tiptur", district: "tumakuru" },
    { name: "Madhugiri", slug: "madhugiri", district: "tumakuru" },
    { name: "Gubbi", slug: "gubbi", district: "tumakuru" },
    { name: "Sira", slug: "sira", district: "tumakuru" },
    { name: "Kunigal", slug: "kunigal", district: "tumakuru" },
    // Mysuru
    { name: "Mysuru", slug: "mysuru-taluk", district: "mysuru" },
    { name: "Hunsur", slug: "hunsur", district: "mysuru" },
    { name: "Nanjangud", slug: "nanjangud", district: "mysuru" },
    // Belagavi
    { name: "Belagavi", slug: "belagavi-taluk", district: "belagavi" },
    { name: "Gokak", slug: "gokak", district: "belagavi" },
    // Dharwad
    { name: "Dharwad", slug: "dharwad-taluk", district: "dharwad" },
    { name: "Hubli", slug: "hubli", district: "dharwad" },
    // Kodagu
    { name: "Madikeri", slug: "madikeri", district: "kodagu" },
    { name: "Somwarpet", slug: "somwarpet", district: "kodagu" },
    // Dakshina Kannada
    { name: "Mangaluru", slug: "mangaluru", district: "dakshina-kannada" },
    // Udupi
    { name: "Udupi", slug: "udupi-taluk", district: "udupi" },
    // Shivamogga
    { name: "Shivamogga", slug: "shivamogga-taluk", district: "shivamogga" },
    // Ballari
    { name: "Ballari", slug: "ballari-taluk", district: "ballari" },
    // Vijayanagara
    { name: "Hospet", slug: "hospet-vij", district: "vijayanagara" },
  ];

  const taluks: Record<string, { id: number }> = {};
  for (const t of talukDefs) {
    const dist = districts[t.district];
    if (dist) {
      const [row] = await db
        .insert(locations)
        .values({ name: t.name, slug: t.slug, type: "taluk", parentId: dist.id })
        .returning();
      taluks[t.slug] = row;
    }
  }

  // ── BENGALURU URBAN (BBMP Zones + Wards) ──
  const [bengaluruUrban] = await db
    .insert(locations)
    .values({ name: "Bengaluru City", slug: "bengaluru", type: "city", parentId: districts["bengaluru-urban"].id, mapX: 66, mapY: 56 })
    .returning();

  const bbmpZones = [
    { name: "Yelahanka Zone", slug: "zone-yelahanka" },
    { name: "Dasarahalli Zone", slug: "zone-dasarahalli" },
    { name: "Rajarajeshwari Nagar Zone", slug: "zone-rr-nagar" },
    { name: "Bommanahalli Zone", slug: "zone-bommanahalli" },
    { name: "South Zone", slug: "zone-south" },
    { name: "East Zone", slug: "zone-east" },
    { name: "West Zone", slug: "zone-west" },
    { name: "Mahadevapura Zone", slug: "zone-mahadevapura" },
    { name: "Central Zone", slug: "zone-central" },
  ];

  const zones: Record<string, { id: number }> = {};
  for (const z of bbmpZones) {
    const [row] = await db
      .insert(locations)
      .values({ name: z.name, slug: z.slug, type: "ward", parentId: bengaluruUrban.id })
      .returning();
    zones[z.slug] = row;
  }

  const wardDefs: { name: string; slug: string; zone: string }[] = [
    { name: "Indiranagar", slug: "indiranagar", zone: "zone-east" },
    { name: "Whitefield", slug: "whitefield", zone: "zone-east" },
    { name: "Halasuru (Ulsoor)", slug: "halasuru", zone: "zone-east" },
    { name: "KR Puram", slug: "kr-puram", zone: "zone-east" },
    { name: "Koramangala", slug: "koramangala", zone: "zone-south" },
    { name: "HSR Layout", slug: "hsr-layout", zone: "zone-south" },
    { name: "Jayanagar", slug: "jayanagar", zone: "zone-south" },
    { name: "JP Nagar", slug: "jp-nagar", zone: "zone-bommanahalli" },
    { name: "BTM Layout", slug: "btm-layout", zone: "zone-bommanahalli" },
    { name: "Electronic City", slug: "electronic-city", zone: "zone-south" },
    { name: "Malleshwaram", slug: "malleshwaram", zone: "zone-west" },
    { name: "Rajajinagar", slug: "rajajinagar", zone: "zone-west" },
    { name: "MG Road", slug: "mg-road", zone: "zone-central" },
    { name: "Yelahanka New Town", slug: "yelahanka-new-town", zone: "zone-yelahanka" },
    { name: "Hebbal", slug: "hebbal", zone: "zone-yelahanka" },
  ];

  const wards: Record<string, { id: number }> = {};
  for (const w of wardDefs) {
    const [row] = await db
      .insert(locations)
      .values({ name: w.name, slug: w.slug, type: "ward", parentId: zones[w.zone].id })
      .returning();
    wards[w.slug] = row;
  }

  // ── HOBLIS, GPS, VILLAGES (Tumakuru: Nagaraghatta GP & Kodihalli) ──
  const [tumakuruCity] = await db
    .insert(locations)
    .values({ name: "Tumakuru City", slug: "tumakuru-city", type: "city", parentId: taluks["tumakuru-taluk"].id })
    .returning();

  const [tipturTown, hobli] = await db
    .insert(locations)
    .values([
      { name: "Tiptur Town", slug: "tiptur-town", type: "town", parentId: taluks["tiptur"].id },
      { name: "Nonavinakere Hobli", slug: "nonavinakere-hobli", type: "hobli", parentId: taluks["tiptur"].id },
    ])
    .returning();

  // Nagaraghatta Gram Panchayat
  const [nagaraghattaGp] = await db
    .insert(locations)
    .values({ name: "Nagaraghatta Gram Panchayat", slug: "nagaraghatta-gram-panchayat", type: "gram_panchayat", parentId: hobli.id })
    .returning();

  // Kodihalli Village
  const [kodihalli, nonavinakere] = await db
    .insert(locations)
    .values([
      { name: "Kodihalli", slug: "kodihalli", type: "village", parentId: nagaraghattaGp.id },
      { name: "Nonavinakere", slug: "nonavinakere", type: "village", parentId: hobli.id },
    ])
    .returning();

  // Chikkamagaluru sub-locations
  const [ckmHobli] = await db
    .insert(locations)
    .values({ name: "Chikkamagaluru Hobli", slug: "chikkamagaluru-hobli", type: "hobli", parentId: taluks["chikkamagaluru-taluk"].id })
    .returning();

  const [mallenahalliGp] = await db
    .insert(locations)
    .values({ name: "Mallenahalli Gram Panchayat", slug: "mallenahalli-gp", type: "gram_panchayat", parentId: ckmHobli.id })
    .returning();

  const [mallenahalli] = await db
    .insert(locations)
    .values({ name: "Mallenahalli Village", slug: "mallenahalli-village", type: "village", parentId: mallenahalliGp.id })
    .returning();

  const allLocs = await db.select().from(locations);
  console.log(`Locations inserted: ${allLocs.length}`);

  /* ================================ USERS ================================== */
  const demoPass = hashPassword("password123");
  const [admin] = await db
    .insert(users)
    .values({
      username: "admin",
      email: "admin@civicvoice.demo",
      passwordHash: hashPassword("admin123"),
      fullName: "Site Administrator",
      role: "citizen",
      isStaff: true,
      isVerified: true,
      verificationStatus: "approved",
    })
    .returning();

  const [ashok, priya, kiran, divya] = await db
    .insert(users)
    .values([
      { username: "ashok", email: "ashok@example.com", passwordHash: demoPass, fullName: "Ashok Kumar", role: "citizen", isVerified: true, verificationStatus: "approved" },
      { username: "priya", email: "priya@example.com", passwordHash: demoPass, fullName: "Priya Sharma", role: "citizen", isVerified: true, verificationStatus: "approved" },
      { username: "kiran", email: "kiran@example.com", passwordHash: demoPass, fullName: "Kiran Gowda", role: "citizen", isVerified: true, verificationStatus: "approved" },
      { username: "divya", email: "divya@example.com", passwordHash: demoPass, fullName: "Divya Rao", role: "citizen", isVerified: true, verificationStatus: "approved" },
    ])
    .returning();

  const [suresh, meena, ravi, lakshmi] = await db
    .insert(users)
    .values([
      { username: "suresh", email: "suresh@example.com", passwordHash: demoPass, fullName: "Suresh Patil", role: "government_employee", isVerified: true, verificationStatus: "approved" },
      { username: "meena", email: "meena@example.com", passwordHash: demoPass, fullName: "Meena Krishnan", role: "politician", isVerified: true, verificationStatus: "approved", constituencyId: taluks["tiptur"].id },
      { username: "ravi", email: "ravi@example.com", passwordHash: demoPass, fullName: "Ravi Menon", role: "media", isVerified: true, verificationStatus: "approved" },
      { username: "lakshmi", email: "lakshmi@example.com", passwordHash: demoPass, fullName: "Lakshmi Hegde", role: "public_figure", isVerified: false, verificationStatus: "pending" },
    ])
    .returning();

  await db.insert(verificationRequests).values([
    { userId: meena.id, role: "politician", note: "Submitted election commission identity documents.", status: "approved", createdAt: daysAgo(60) },
    { userId: suresh.id, role: "government_employee", note: "Submitted department ID card (RDPR Tumakuru).", status: "approved", createdAt: daysAgo(55) },
    { userId: ravi.id, role: "media", note: "Press accreditation card submitted.", status: "approved", createdAt: daysAgo(40) },
    { userId: lakshmi.id, role: "public_figure", note: "Self-registered as Public Figure. Awaiting document review.", status: "pending", createdAt: daysAgo(2) },
  ]);
  console.log("Users: 9");

  /* =============================== PROBLEMS ================================ */
  const problemDefs = [
    {
      title: "Damaged road near Kodihalli Bus Stop",
      description: "The road surface in front of the Kodihalli bus stop has completely broken apart. Two deep potholes stretch across half the carriageway and the edges are crumbling into the shoulder. KSRTC buses and school vans have to slow to walking speed.",
      categoryId: cat["roads"], locationId: kodihalli.id, reporterId: ashok.id,
      showIdentity: true, status: "awaiting_response", supporterCount: 1240,
      photoPath: "https://images.indianexpress.com/2025/09/road-pothole.jpg",
      createdAt: daysAgo(45),
    },
    {
      title: "Drainage overflow near Tiptur Market",
      description: "The open drain running beside Tiptur Market has been overflowing onto the road for every rain this season. Dirty water spreads across the shopping lane in front of the vegetable stalls.",
      categoryId: cat["drainage"], locationId: tipturTown.id, reporterId: priya.id,
      showIdentity: false, status: "overdue", supporterCount: 863,
      photoPath: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&w=1200&q=80",
      createdAt: daysAgo(75),
    },
    {
      title: "Streetlights not working in Indiranagar",
      description: "For more than a month, nearly every streetlight on 100 Feet Road and the cross streets of Indiranagar has been dead. The whole stretch goes dark after 7 pm.",
      categoryId: cat["streetlights"], locationId: wards["indiranagar"].id, reporterId: divya.id,
      showIdentity: true, status: "in_progress", supporterCount: 542,
      photoPath: "https://citizen.complainthub.org/uploads/default/fbc901fad7060aaf102d86bc185aeb229cba7724",
      createdAt: daysAgo(30),
    },
    {
      title: "Garbage accumulation near Cubbon Park",
      description: "A large pile of mixed waste has been sitting next to the entrance of Cubbon Park for over a week. The dustbin at the gate overflowed long ago.",
      categoryId: cat["garbage"], locationId: wards["mg-road"].id, reporterId: kiran.id,
      showIdentity: false, status: "reported", supporterCount: 421,
      photoPath: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=1200&q=80",
      createdAt: daysAgo(9),
    },
    {
      title: "Broken water pipeline in Whitefield",
      description: "A drinking-water pipeline has burst on the road leading to ITPL in Whitefield and water has been gushing out for three days. A big muddy pool has formed right where commuters walk.",
      categoryId: cat["water-supply"], locationId: wards["whitefield"].id, reporterId: priya.id,
      showIdentity: true, status: "verified", supporterCount: 356,
      photoPath: "https://media.istockphoto.com/id/1081436086/photo/water-pressure-from-a-large-pipe-over-the-river.jpg?s=612x612&w=0&k=20&c=JoUu7W3og1KTi4O5pddUznkqkNd4kAtbTKop-ull09c=",
      createdAt: daysAgo(18),
    },
    {
      title: "Potholes on Kodihalli–Nonavinakere road",
      description: "The connecting road between Kodihalli and Nonavinakere had developed more than a dozen deep potholes over about 1.2 km, making it dangerous for cyclists and damaging vehicles daily.",
      categoryId: cat["roads"], locationId: nagaraghattaGp.id, reporterId: kiran.id,
      showIdentity: true, status: "completed", supporterCount: 289,
     photoPath: "https://media.assettype.com/deccanherald%2F2025-09-04%2Fn3501evl%2Ffile82076r3l8v61juj26jrw.jpg?rect=0%2C0%2C1600%2C900&w=undefined&auto=format%2Ccompress&fit=max",
      createdAt: daysAgo(90),
    },
    {
      title: "Landslide risk on Baba Budangiri road",
      description: "Heavy rain has caused soil erosion along the mountain road stretch near Mallenahalli. Large boulders are precariously hanging over the road used by tourists and locals daily.",
      categoryId: cat["public-safety"], locationId: mallenahalli.id, reporterId: ashok.id,
      showIdentity: true, status: "reported", supporterCount: 610,
      photoPath: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Landslide_in_Cusco%2C_Peru_-_2018.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original",
      createdAt: daysAgo(12),
    },
  ] as const;

  const inserted = [];
  for (const p of problemDefs) {
    const [row] = await db.insert(problems).values({ ...p, updatedAt: p.createdAt }).returning();
    inserted.push(row);
  }
  const [road, drainage, streetlights, garbage, water, potholes, landslide] = inserted;
  console.log(`Problems: ${inserted.length}`);

  /* ============================ STATUS EVENTS ============================== */
  const event = (problemId: number, status: string, note: string, createdAt: Date) => ({ problemId, status, note, createdAt });
  await db.insert(statusEvents).values([
    event(road.id, "reported", "Report submitted by a citizen.", daysAgo(45)),
    event(road.id, "verified", "Verified as genuine with site photographs.", daysAgo(41)),
    event(road.id, "awaiting_response", "Forwarded to the RDPR engineering cell, Tiptur.", daysAgo(38)),
    event(drainage.id, "reported", "Report submitted by a citizen.", daysAgo(75)),
    event(drainage.id, "verified", "Verified as genuine.", daysAgo(72)),
    event(drainage.id, "awaiting_response", "Sent to Tiptur Town Municipal Council.", daysAgo(66)),
    event(drainage.id, "overdue", "No official action within 45 days.", daysAgo(30)),
    event(streetlights.id, "reported", "Report submitted by a citizen.", daysAgo(30)),
    event(streetlights.id, "verified", "Verified as genuine.", daysAgo(27)),
    event(streetlights.id, "awaiting_response", "Forwarded to BBMP East Zone.", daysAgo(25)),
    event(streetlights.id, "in_progress", "Work order issued; lamp replacement underway.", daysAgo(12)),
    event(potholes.id, "reported", "Report submitted by a citizen.", daysAgo(90)),
    event(potholes.id, "verified", "Verified as genuine.", daysAgo(86)),
    event(potholes.id, "awaiting_response", "Forwarded to Nagaraghatta Gram Panchayat.", daysAgo(82)),
    event(potholes.id, "in_progress", "Patch work sanctioned.", daysAgo(60)),
    event(potholes.id, "completed", "Surface re-laid over the full 1.2 km stretch.", daysAgo(21)),
    event(landslide.id, "reported", "Report submitted by a citizen.", daysAgo(12)),
  ]);

  /* ========================= OFFICIAL RESPONSES ============================ */
  await db.insert(officialResponses).values([
    { problemId: drainage.id, body: "Desilting of the market drain has been included in the next week's work plan.", officialName: "K. Manjunath, Chief Officer", department: "Tiptur Town Municipal Council", createdAt: daysAgo(60) },
    { problemId: streetlights.id, body: "A work order has been issued for replacing 124 faulty lamps with LED fittings across Indiranagar.", officialName: "Assistant Executive Engineer", department: "BBMP East Zone", createdAt: daysAgo(12) },
    { problemId: potholes.id, body: "Re-surfacing of the Kodihalli–Nonavinakere road stretch is complete.", officialName: "S. Rathnamma, PDO", department: "Nagaraghatta Gram Panchayat", createdAt: daysAgo(21) },
  ]);

  /* ============================== COMMENTS ================================= */
  const comment = (problemId: number, userId: number, body: string, createdAt: Date) => ({ problemId, userId, body, createdAt });
  await db.insert(comments).values([
    comment(road.id, kiran.id, "The school bus now takes 20 extra minutes every morning.", daysAgo(40)),
    comment(road.id, divya.id, "My father fell off his scooter here last week.", daysAgo(36)),
    comment(streetlights.id, lakshmi.id, "Glad to see the ward office respond on the record.", daysAgo(20)),
    comment(landslide.id, priya.id, "PWD engineers need to inspect this before the next downpour.", daysAgo(10)),
    comment(potholes.id, priya.id, "The full stretch is freshly laid. Great to see COMPLETED.", daysAgo(19)),
  ]);

  /* ============================== SUPPORTS ================================= */
  const support = (problemId: number, userId: number, createdAt: Date) => ({ problemId, userId, createdAt });
  await db.insert(supports).values([
    support(road.id, priya.id, daysAgo(44)), support(road.id, kiran.id, daysAgo(43)),
    support(drainage.id, ashok.id, daysAgo(70)), support(streetlights.id, ashok.id, daysAgo(28)),
    support(landslide.id, divya.id, daysAgo(11)), support(landslide.id, kiran.id, daysAgo(9)),
    support(potholes.id, meena.id, daysAgo(80)),
  ]);

  /* =========================== NOTIFICATIONS =============================== */
  await db.insert(notifications).values([
    { userId: ashok.id, body: "Your report crossed 1,000 supporters.", link: `/problems/${road.id}`, isRead: true, createdAt: daysAgo(35) },
  ]);

  console.log("Seed complete ✔");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});