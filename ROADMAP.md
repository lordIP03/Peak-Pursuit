# PeakPursuit — Development Roadmap

> Build sequence for evolving PeakPursuit from MVP to a full-featured outdoor adventure platform.
> Work through each feature top-to-bottom. Check off as you go.

---

## ✅ Phase 0 — MVP (Complete)

- [x] React 19 + Vite 8 project setup
- [x] Supabase email/password authentication (sign-up + sign-in)
- [x] Protected routes with auto-redirect
- [x] Interactive Leaflet.js map with CARTO tiles
- [x] 11 curated trail & campsite locations (Maharashtra + pan-India)
- [x] Custom map markers (zig-zag for treks, tent for camps)
- [x] Trail detail sidebar (image, rating, difficulty, duration, tags)
- [x] User profile page (email, member since, sign-out)
- [x] Glassmorphism design system with Inter typography
- [x] Custom brand assets (logo, favicon, marker icons, login background)
- [x] Vercel deployment with SPA rewrites

---

## 🔨 Phase 1 — Trail Detail Page

- [ ] Create `/trail/:id` route with dynamic trail pages
- [ ] Full trail description with rich content
- [ ] Photo gallery section (hero image + additional photos)
- [ ] Trail stats card (distance, elevation gain, max altitude)
- [ ] "How to Reach" section (nearest city, transport options)
- [ ] "Best Season" indicator with month-by-month suitability
- [ ] Permit requirements info (if applicable)
- [ ] "Things to Carry" quick checklist
- [ ] Back-to-map navigation
- [ ] Smooth page transitions

---

## 🔨 Phase 2 — Review & Rating System

- [ ] Create Supabase `reviews` table (user_id, trail_id, rating, text, created_at)
- [ ] Star rating input component (1–5 stars)
- [ ] Written review form on trail detail page
- [ ] Display all reviews for a trail (newest first)
- [ ] Average rating calculation from user reviews
- [ ] Review count display
- [ ] One review per user per trail (edit/update allowed)
- [ ] Timestamp formatting ("2 days ago", "3 weeks ago")
- [ ] Empty state — "Be the first to review this trail"

---

## 🔨 Phase 3 — Save / Bookmark Trails

- [ ] Create Supabase `saved_trails` table (user_id, trail_id, saved_at)
- [ ] Bookmark icon on trail cards and trail detail page
- [ ] Toggle save/unsave with optimistic UI
- [ ] "Saved Trails" section on Profile page with trail cards
- [ ] Update "Trails Saved" counter on profile (live count)
- [ ] Empty state — "No saved trails yet. Start exploring!"

---

## 🔨 Phase 4 — Enhanced Profile & User Stats

- [ ] Editable display name and bio
- [ ] Profile avatar upload (Supabase Storage)
- [ ] "Trails Reviewed" counter
- [ ] "Trails Visited" log (mark trails as completed)
- [ ] Activity timeline — recent reviews, saves, visits
- [ ] Public profile view (shareable URL)

---

## 🔨 Phase 5 — Community Section

- [ ] `/community` page with discussion feed
- [ ] Trail-specific discussion threads
- [ ] "Find Trek Buddies" — trip planning posts
- [ ] Photo sharing wall — community uploads per trail
- [ ] Event board — group treks and meetup announcements
- [ ] Region-based filters (Maharashtra, Himachal, Kerala, etc.)
- [ ] Like / comment on posts
- [ ] User tagging and mentions

---

## 🔨 Phase 6 — Hiker/Camper Levels & Badges

- [ ] XP system — earn points for reviews, visits, saves, community posts
- [ ] Level progression:
  - 🌱 Seedling (0 XP)
  - 🥾 Trail Walker (100 XP)
  - ⛰️ Peak Climber (500 XP)
  - 🏔️ Summit Seeker (1500 XP)
  - 🦅 Mountain Legend (5000 XP)
- [ ] Achievement badges:
  - "First Trek Logged"
  - "Monsoon Warrior" (3 monsoon treks)
  - "Night Owl" (5 camping trips)
  - "Sahyadri Explorer" (10+ Maharashtra trails)
  - "Pan-India Trekker" (trails in 5+ states)
  - "Summit Collector" (5+ peaks reached)
  - "Streak Hunter" (3 consecutive weekend treks)
  - "Storyteller" (10+ reviews written)
  - "Trailblazer" (first review on a new trail)
- [ ] Badge showcase on profile
- [ ] Level badge next to username everywhere
- [ ] Regional and national leaderboards

---

## 🔨 Phase 7 — Facility Markers on Map

- [ ] Water source markers (springs, streams, taps)
- [ ] Restroom / toilet location markers
- [ ] Mobile network coverage zones
- [ ] Emergency shelter points
- [ ] Food stall / dhaba markers
- [ ] Parking areas and base village markers
- [ ] Medical aid / first-aid post markers
- [ ] Forest department checkpoints
- [ ] Campsite ground markers (flat tent-friendly areas)
- [ ] Toggle facility layers on/off on the map
- [ ] Community-submitted facility markers (with verification)

---

## 🔨 Phase 8 — Advanced Trail Features

- [ ] GPX track upload and download
- [ ] Elevation profile chart per trail
- [ ] Trail distance and elevation gain stats
- [ ] Difficulty auto-calculator (elevation, distance, terrain)
- [ ] Real-time weather overlay (temperature, rain, visibility)
- [ ] Trail condition reports (muddy, blocked, dry, clear)
- [ ] Estimated time calculator based on fitness level
- [ ] Offline map download for no-network zones
- [ ] Turn-by-turn navigation mode
- [ ] Seasonal trail photos (monsoon vs winter vs summer)

---

## 🔨 Phase 9 — Safety & Logistics

- [ ] SOS emergency button with GPS location sharing
- [ ] Emergency contact auto-notify
- [ ] Nearest hospital / rescue team info per trail
- [ ] Trail closure alerts and danger warnings
- [ ] Crowd density indicator (avoid overcrowded weekends)
- [ ] Trek checklist generator (auto packing list by trail + season)
- [ ] Gear recommendations per difficulty
- [ ] Permit requirement alerts with application links

---

## 🔨 Phase 10 — Smart Discovery & AI

- [ ] AI-powered trail recommendations based on:
  - Fitness level
  - Past treks
  - Season preference
  - Group size
  - Distance from user's city
- [ ] "Weekend Getaway" quick filter
- [ ] "Hidden Gems" section (lesser-known trails from community data)
- [ ] Search with autocomplete
- [ ] Advanced filters (difficulty, duration, type, region, rating)
- [ ] "Similar Trails" suggestions on trail detail page
- [ ] Personalized homepage feed

---

## 🔨 Phase 11 — Marketplace & Organizer Integration

- [ ] Verified trek organizer profiles
- [ ] Book guided treks through the platform
- [ ] Price comparison for organized treks
- [ ] Organizer reviews and safety ratings
- [ ] Campsite spot reservation
- [ ] Gear rental integration
- [ ] Package deals (tent + food + transport)

---

## 🔨 Phase 12 — Content & Blogs

- [ ] User-written trail guides and trip reports
- [ ] "How to Prepare" guides per difficulty level
- [ ] Best season guide per trail
- [ ] Community-curated photo galleries
- [ ] Video trail walkthroughs
- [ ] Newsletter with weekly trail recommendations

---

## 📌 Notes

- Each phase builds on the previous — don't skip ahead
- Phases 1–3 create a **complete user loop** (discover → explore → review → save)
- Phase 4–6 add **engagement and retention**
- Phase 7–9 add **depth and utility**
- Phase 10–12 add **intelligence and scale**
- Supabase tables needed: `reviews`, `saved_trails`, `profiles`, `community_posts`, `badges`, `facility_markers`

---

*Last updated: May 2026*
