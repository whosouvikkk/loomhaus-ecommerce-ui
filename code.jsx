import React, { useState, useEffect, useRef, useCallback } from "react";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const PRODUCTS = {
  men: [
    { id: "m1", name: "Oversized Varsity Jacket", price: 4299, category: "men", tag: "bestseller", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80" },
    { id: "m2", name: "Baggy Cargo Trousers", price: 2899, category: "men", tag: "new", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80" },
    { id: "m3", name: "Striped Rugby Polo", price: 1999, category: "men", tag: "", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80" },
    { id: "m4", name: "Washed Denim Jacket", price: 3499, category: "men", tag: "sale", image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&q=80" },
    { id: "m5", name: "Tech Fleece Hoodie", price: 2599, category: "men", tag: "", image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80" },
    { id: "m6", name: "Plaid Flannel Shirt", price: 1799, category: "men", tag: "new", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80" },
    { id: "m7", name: "Slim Chino Trousers", price: 2299, category: "men", tag: "", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80" },
    { id: "m8", name: "Graphic Print Tee", price: 1299, category: "men", tag: "sale", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80" },
    { id: "m9", name: "Leather Biker Jacket", price: 7999, category: "men", tag: "premium", image: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=600&q=80" },
    { id: "m10", name: "Corduroy Blazer", price: 4599, category: "men", tag: "", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80" },
  ],
  women: [
    { id: "w1", name: "Satin Slip Dress", price: 3299, category: "women", tag: "bestseller", image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&q=80" },
    { id: "w2", name: "High-Waist Flare Jeans", price: 2799, category: "women", tag: "new", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80" },
    { id: "w3", name: "Cropped Blazer Set", price: 4999, category: "women", tag: "premium", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&q=80" },
    { id: "w4", name: "Knit Mini Skirt", price: 1899, category: "women", tag: "", image: "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=600&q=80" },
    { id: "w5", name: "Oversized Trench Coat", price: 6499, category: "women", tag: "new", image: "https://images.unsplash.com/photo-1559734840-f9509ee5677f?w=600&q=80" },
    { id: "w6", name: "Lace-Up Corset Top", price: 2199, category: "women", tag: "sale", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80" },
    { id: "w7", name: "Wide-Leg Palazzo Pants", price: 2599, category: "women", tag: "", image: "https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=600&q=80" },
    { id: "w8", name: "Floral Wrap Dress", price: 2899, category: "women", tag: "bestseller", image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80" },
    { id: "w9", name: "Velvet Slip Skirt", price: 2299, category: "women", tag: "sale", image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&q=80" },
    { id: "w10", name: "Puffer Jacket Cropped", price: 3799, category: "women", tag: "new", image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=600&q=80" },
  ],
  newIn: [
    { id: "n1", name: "Y2K Chain Belt Dress", price: 3499, category: "newIn", tag: "new", image: "https://images.unsplash.com/photo-1566479179817-c85a3e5d7de8?w=600&q=80" },
    { id: "n2", name: "Logomania Hoodie", price: 2999, category: "newIn", tag: "new", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80" },
    { id: "n3", name: "Mesh Layer Top", price: 1599, category: "newIn", tag: "new", image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&q=80" },
    { id: "n4", name: "Asymmetric Hem Skirt", price: 2199, category: "newIn", tag: "new", image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&q=80" },
    { id: "n5", name: "Washed Grey Tracksuit", price: 3299, category: "newIn", tag: "new", image: "https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=600&q=80" },
    { id: "n6", name: "Velour Two-Piece", price: 2799, category: "newIn", tag: "new", image: "https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=600&q=80" },
    { id: "n7", name: "Bucket Hat + Coord Set", price: 3999, category: "newIn", tag: "new", image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80" },
    { id: "n8", name: "Pinstripe Wide Trousers", price: 2499, category: "newIn", tag: "new", image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=600&q=80" },
    { id: "n9", name: "Ribbed Bodysuit", price: 1399, category: "newIn", tag: "new", image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80" },
    { id: "n10", name: "Silver Windbreaker", price: 4199, category: "newIn", tag: "new", image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=600&q=80" },
  ],
  sale: [
    { id: "s1", name: "Denim Miniskirt", price: 999, originalPrice: 1999, category: "sale", tag: "sale", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80" },
    { id: "s2", name: "Cropped Windbreaker", price: 1799, originalPrice: 3599, category: "sale", tag: "sale", image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=600&q=80" },
    { id: "s3", name: "Plaid Overshirt", price: 1299, originalPrice: 2599, category: "sale", tag: "sale", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80" },
    { id: "s4", name: "Velvet Mini Dress", price: 1499, originalPrice: 2999, category: "sale", tag: "sale", image: "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=600&q=80" },
    { id: "s5", name: "Tech Cargo Shorts", price: 1199, originalPrice: 2299, category: "sale", tag: "sale", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80" },
    { id: "s6", name: "Rib Knit Cardigan", price: 1599, originalPrice: 3199, category: "sale", tag: "sale", image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80" },
    { id: "s7", name: "Satin Bomber Jacket", price: 2199, originalPrice: 4399, category: "sale", tag: "sale", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80" },
    { id: "s8", name: "Wide Leg Jeans", price: 1699, originalPrice: 2999, category: "sale", tag: "sale", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80" },
    { id: "s9", name: "Logo Print Tee", price: 799, originalPrice: 1599, category: "sale", tag: "sale", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80" },
    { id: "s10", name: "Flare Trousers", price: 1899, originalPrice: 3799, category: "sale", tag: "sale", image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=600&q=80" },
  ],
  genz: [
    { id: "g1", name: "Y2K Butterfly Top", price: 1299, category: "genz", tag: "trending", image: "https://images.unsplash.com/photo-1566479179817-c85a3e5d7de8?w=600&q=80" },
    { id: "g2", name: "Boxy Graphic Hoodie", price: 2199, category: "genz", tag: "trending", image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80" },
    { id: "g3", name: "Micro Mini Skirt", price: 1499, category: "genz", tag: "", image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&q=80" },
    { id: "g4", name: "Low Rise Cargo Pants", price: 2799, category: "genz", tag: "trending", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80" },
    { id: "g5", name: "Sheer Mesh Layer Dress", price: 1999, category: "genz", tag: "new", image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&q=80" },
    { id: "g6", name: "Crop Puffer Vest", price: 2499, category: "genz", tag: "", image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=600&q=80" },
    { id: "g7", name: "Rhinestone Denim Set", price: 3299, category: "genz", tag: "trending", image: "https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=600&q=80" },
    { id: "g8", name: "Babydoll Tank Top", price: 999, category: "genz", tag: "", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80" },
    { id: "g9", name: "Platform Bootcut Jeans", price: 2599, category: "genz", tag: "new", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80" },
    { id: "g10", name: "Colourblock Windbreaker", price: 3099, category: "genz", tag: "trending", image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80" },
  ],
  millennials: [
    { id: "ml1", name: "Classic Trench Coat", price: 5999, category: "millennials", tag: "classic", image: "https://images.unsplash.com/photo-1559734840-f9509ee5677f?w=600&q=80" },
    { id: "ml2", name: "Tailored Wool Blazer", price: 6499, category: "millennials", tag: "premium", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80" },
    { id: "ml3", name: "Slim Fit Chinos", price: 2299, category: "millennials", tag: "", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80" },
    { id: "ml4", name: "Cashmere Turtleneck", price: 3999, category: "millennials", tag: "premium", image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80" },
    { id: "ml5", name: "Linen Button-Down Shirt", price: 1999, category: "millennials", tag: "", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80" },
    { id: "ml6", name: "Structured Maxi Dress", price: 4299, category: "millennials", tag: "classic", image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80" },
    { id: "ml7", name: "Wide Leg Suit Trousers", price: 3299, category: "millennials", tag: "", image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=600&q=80" },
    { id: "ml8", name: "Leather Crossbody Bag", price: 4799, category: "millennials", tag: "premium", image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=600&q=80" },
    { id: "ml9", name: "Ribbed Midi Skirt", price: 2499, category: "millennials", tag: "classic", image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&q=80" },
    { id: "ml10", name: "Merino Crew Sweater", price: 2999, category: "millennials", tag: "", image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&q=80" },
  ],
};

const CATEGORIES = [
  { key: "men", label: "Men", sub: ["Jackets", "Trousers", "Tops", "Accessories"] },
  { key: "women", label: "Women", sub: ["Dresses", "Skirts", "Tops", "Outerwear"] },
  { key: "newIn", label: "New In", sub: ["This Week", "This Month", "Trending"] },
  { key: "sale", label: "Sale", sub: ["Up to 50% off", "Under ₹999", "Last Sizes"] },
  { key: "genz", label: "Gen Z", sub: ["Y2K Revival", "Streetwear", "Cargo & Cargos"] },
  { key: "millennials", label: "Millennials", sub: ["Classic Cuts", "Office Wear", "Weekend Edit"] },
];

// ─── STYLES ───────────────────────────────────────────────────────────────────
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --black: #0a0a0a;
    --off-black: #111111;
    --dark: #1a1a1a;
    --mid: #2e2e2e;
    --grey: #555555;
    --light-grey: #999999;
    --border: #2a2a2a;
    --off-white: #f0ede8;
    --white: #ffffff;
    --cream: #faf8f5;
    --accent: #e8e0d5;
    --glow: rgba(255,255,255,0.15);
    --glow-strong: rgba(255,255,255,0.35);
    --font-display: 'Bebas Neue', sans-serif;
    --font-body: 'DM Sans', sans-serif;
    --nav-h: 64px;
    --radius: 2px;
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: var(--font-body);
    background: var(--black);
    color: var(--off-white);
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    cursor: default;
  }

  /* Grain overlay */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 9999;
    opacity: 0.35;
    mix-blend-mode: overlay;
  }

  button { cursor: pointer; border: none; background: none; font-family: var(--font-body); }
  a { text-decoration: none; color: inherit; }
  img { max-width: 100%; display: block; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--black); }
  ::-webkit-scrollbar-thumb { background: var(--mid); border-radius: 2px; }

  /* ── ANIMATIONS ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; } to { opacity: 1; }
  }
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideRight {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
  @keyframes ticker {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes shimmer {
    0% { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  @keyframes glowPulse {
    0%, 100% { box-shadow: 0 0 12px var(--glow); }
    50% { box-shadow: 0 0 28px var(--glow-strong), 0 0 56px var(--glow); }
  }

  .fade-up { animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both; }
  .fade-up-d1 { animation-delay: 0.1s; }
  .fade-up-d2 { animation-delay: 0.2s; }
  .fade-up-d3 { animation-delay: 0.3s; }
  .fade-up-d4 { animation-delay: 0.4s; }

  /* ── NAV ── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    height: var(--nav-h);
    background: rgba(10,10,10,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center;
    padding: 0 32px;
    justify-content: space-between;
    transition: background 0.3s;
  }
  .nav--scrolled { background: rgba(10,10,10,0.98); }

  .nav__logo {
    font-family: var(--font-display);
    font-size: 28px;
    letter-spacing: 3px;
    color: var(--white);
    flex-shrink: 0;
  }
  .nav__logo span { color: var(--light-grey); }

  .nav__links {
    display: flex; align-items: center; gap: 4px;
    list-style: none;
  }
  .nav__links li { position: relative; }

  .nav__link-btn {
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--light-grey);
    padding: 8px 14px;
    border-radius: var(--radius);
    transition: color 0.2s, background 0.2s;
    white-space: nowrap;
  }
  .nav__link-btn:hover, .nav__link-btn--active { color: var(--white); background: rgba(255,255,255,0.05); }

  .nav__dropdown {
    position: absolute; top: calc(100% + 8px); left: 0;
    background: var(--off-black);
    border: 1px solid var(--border);
    min-width: 180px;
    padding: 8px 0;
    animation: slideDown 0.2s ease both;
    z-index: 100;
  }
  .nav__dropdown-item {
    display: block;
    padding: 10px 20px;
    font-size: 12px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--light-grey);
    transition: color 0.15s, background 0.15s;
  }
  .nav__dropdown-item:hover { color: var(--white); background: rgba(255,255,255,0.04); }

  .nav__right { display: flex; align-items: center; gap: 16px; }

  .nav__cart-btn {
    position: relative;
    display: flex; align-items: center; gap: 8px;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--off-white);
    padding: 8px 16px;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    transition: all 0.25s;
  }
  .nav__cart-btn:hover {
    color: var(--white);
    border-color: rgba(255,255,255,0.35);
    box-shadow: 0 0 16px var(--glow);
  }
  .nav__cart-count {
    display: inline-flex; align-items: center; justify-content: center;
    width: 18px; height: 18px;
    background: var(--white);
    color: var(--black);
    font-size: 10px;
    font-weight: 700;
    border-radius: 50%;
  }

  .nav__hamburger {
    display: none;
    flex-direction: column; gap: 5px;
    padding: 8px;
  }
  .nav__hamburger span {
    display: block; width: 24px; height: 1.5px;
    background: var(--off-white);
    transition: all 0.3s;
  }

  /* ── TICKER ── */
  .ticker {
    position: fixed; top: var(--nav-h); left: 0; right: 0; z-index: 999;
    background: var(--white);
    color: var(--black);
    height: 36px;
    overflow: hidden;
    display: flex; align-items: center;
  }
  .ticker__inner {
    display: flex;
    white-space: nowrap;
    animation: ticker 20s linear infinite;
  }
  .ticker__text {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 0 48px;
  }
  .ticker__dot { margin: 0 8px; }

  /* ── HERO ── */
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex; align-items: flex-end;
    padding: calc(var(--nav-h) + 36px + 60px) 48px 80px;
    overflow: hidden;
    background: var(--black);
  }
  .hero__bg {
    position: absolute; inset: 0;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%);
  }
  .hero__bg-img {
    position: absolute; inset: 0;
    background: url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&q=80') center/cover no-repeat;
    opacity: 0.25;
    filter: grayscale(100%);
  }
  .hero__overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, var(--black) 0%, transparent 60%);
  }
  .hero__content { position: relative; z-index: 1; max-width: 720px; }
  .hero__eyebrow {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--light-grey);
    margin-bottom: 24px;
    display: flex; align-items: center; gap: 12px;
  }
  .hero__eyebrow::before {
    content: ''; display: block;
    width: 40px; height: 1px;
    background: var(--grey);
  }
  .hero__title {
    font-family: var(--font-display);
    font-size: clamp(72px, 12vw, 160px);
    line-height: 0.9;
    letter-spacing: -2px;
    color: var(--white);
    margin-bottom: 32px;
  }
  .hero__title em {
    font-style: normal;
    color: var(--light-grey);
  }
  .hero__sub {
    font-size: 15px;
    font-weight: 300;
    color: var(--light-grey);
    line-height: 1.7;
    max-width: 420px;
    margin-bottom: 48px;
    letter-spacing: 0.3px;
  }
  .hero__cta-row { display: flex; gap: 16px; flex-wrap: wrap; }

  /* ── BUTTONS ── */
  .btn-primary {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 16px 36px;
    background: var(--white);
    color: var(--black);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    border-radius: var(--radius);
    transition: all 0.3s;
    border: 1px solid var(--white);
  }
  .btn-primary:hover {
    background: transparent;
    color: var(--white);
    box-shadow: 0 0 24px var(--glow-strong), 0 0 60px rgba(255,255,255,0.1);
    transform: translateY(-1px);
  }

  .btn-outline {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 16px 36px;
    background: transparent;
    color: var(--off-white);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    transition: all 0.3s;
  }
  .btn-outline:hover {
    border-color: rgba(255,255,255,0.3);
    color: var(--white);
    box-shadow: 0 0 16px var(--glow);
    transform: translateY(-1px);
  }

  .btn-cart {
    width: 100%;
    padding: 14px;
    background: var(--off-black);
    color: var(--off-white);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    transition: all 0.3s;
    margin-top: 12px;
  }
  .btn-cart:hover {
    background: var(--white);
    color: var(--black);
    border-color: var(--white);
    box-shadow: 0 0 20px var(--glow);
  }
  .btn-cart--added {
    background: var(--mid);
    color: var(--white);
    border-color: var(--grey);
  }

  /* ── SECTION LABELS ── */
  .section { padding: 100px 48px; }
  .section--grey { background: var(--off-black); }

  .section__header {
    display: flex; align-items: flex-end; justify-content: space-between;
    margin-bottom: 56px;
    flex-wrap: wrap; gap: 16px;
  }
  .section__title {
    font-family: var(--font-display);
    font-size: clamp(40px, 6vw, 80px);
    letter-spacing: 2px;
    line-height: 1;
    color: var(--white);
  }
  .section__link {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--light-grey);
    display: flex; align-items: center; gap: 8px;
    transition: color 0.2s, gap 0.2s;
    padding-bottom: 4px;
    border-bottom: 1px solid var(--border);
  }
  .section__link:hover { color: var(--white); gap: 12px; border-color: var(--grey); }

  /* ── CATEGORIES GRID ── */
  .cat-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;
  }
  .cat-card {
    position: relative;
    aspect-ratio: 3/4;
    overflow: hidden;
    cursor: pointer;
  }
  .cat-card:first-child { grid-row: span 2; aspect-ratio: auto; }
  .cat-card__img {
    width: 100%; height: 100%;
    object-fit: cover;
    filter: grayscale(60%);
    transition: transform 0.6s cubic-bezier(0.16,1,0.3,1), filter 0.6s;
  }
  .cat-card:hover .cat-card__img { transform: scale(1.06); filter: grayscale(20%); }
  .cat-card__overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%);
  }
  .cat-card__label {
    position: absolute; bottom: 24px; left: 24px;
  }
  .cat-card__label h3 {
    font-family: var(--font-display);
    font-size: clamp(24px, 3vw, 42px);
    letter-spacing: 2px;
    color: var(--white);
    line-height: 1;
  }
  .cat-card__label span {
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--light-grey);
  }

  /* ── PRODUCT GRID ── */
  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 24px;
  }

  .product-card {
    position: relative;
    background: var(--off-black);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
    transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s;
    animation: fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both;
  }
  .product-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06);
  }

  .product-card__img-wrap {
    position: relative;
    aspect-ratio: 3/4;
    overflow: hidden;
    background: var(--dark);
  }
  .product-card__img {
    width: 100%; height: 100%;
    object-fit: cover;
    filter: grayscale(30%);
    transition: transform 0.6s cubic-bezier(0.16,1,0.3,1), filter 0.4s;
  }
  .product-card:hover .product-card__img { transform: scale(1.05); filter: grayscale(0%); }

  .product-card__tag {
    position: absolute; top: 12px; left: 12px;
    padding: 4px 10px;
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    border-radius: 1px;
  }
  .product-card__tag--new { background: var(--white); color: var(--black); }
  .product-card__tag--sale { background: #c0392b; color: var(--white); }
  .product-card__tag--bestseller { background: var(--mid); color: var(--off-white); border: 1px solid var(--grey); }
  .product-card__tag--premium { background: transparent; color: var(--light-grey); border: 1px solid var(--grey); }
  .product-card__tag--trending { background: var(--white); color: var(--black); }
  .product-card__tag--classic { background: transparent; color: var(--light-grey); border: 1px solid var(--border); }

  .product-card__body { padding: 16px; }
  .product-card__name {
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.3px;
    color: var(--off-white);
    margin-bottom: 8px;
    line-height: 1.4;
  }
  .product-card__price-row { display: flex; align-items: center; gap: 10px; }
  .product-card__price {
    font-size: 15px;
    font-weight: 600;
    color: var(--white);
  }
  .product-card__og-price {
    font-size: 12px;
    color: var(--grey);
    text-decoration: line-through;
  }
  .product-card__discount {
    font-size: 10px;
    font-weight: 600;
    color: #e74c3c;
    letter-spacing: 0.5px;
  }

  /* ── SKELETON ── */
  .skeleton {
    background: linear-gradient(90deg, var(--dark) 25%, var(--mid) 50%, var(--dark) 75%);
    background-size: 400px 100%;
    animation: shimmer 1.2s infinite;
    border-radius: var(--radius);
  }
  .skeleton-card {
    background: var(--off-black);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
  }
  .skeleton-img { aspect-ratio: 3/4; }
  .skeleton-body { padding: 16px; }
  .skeleton-line { height: 13px; margin-bottom: 8px; }
  .skeleton-line--short { width: 60%; }

  /* ── PAGE HEADER ── */
  .page-header {
    padding: calc(var(--nav-h) + 36px + 60px) 48px 60px;
    border-bottom: 1px solid var(--border);
  }
  .page-header__label {
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--grey);
    margin-bottom: 16px;
  }
  .page-header__title {
    font-family: var(--font-display);
    font-size: clamp(56px, 10vw, 120px);
    letter-spacing: 3px;
    line-height: 1;
    color: var(--white);
  }
  .page-header__sub {
    font-size: 14px;
    color: var(--light-grey);
    margin-top: 16px;
    font-weight: 300;
  }

  /* ── CART DRAWER ── */
  .cart-overlay {
    position: fixed; inset: 0; z-index: 2000;
    background: rgba(0,0,0,0.7);
    backdrop-filter: blur(4px);
    animation: fadeIn 0.25s ease;
  }
  .cart-drawer {
    position: absolute; top: 0; right: 0; bottom: 0;
    width: min(420px, 100vw);
    background: var(--off-black);
    border-left: 1px solid var(--border);
    display: flex; flex-direction: column;
    animation: slideRight 0.35s cubic-bezier(0.16,1,0.3,1) both;
  }
  .cart-drawer__header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 24px 28px;
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
  }
  .cart-drawer__title {
    font-family: var(--font-display);
    font-size: 28px;
    letter-spacing: 3px;
    color: var(--white);
  }
  .cart-drawer__close {
    width: 36px; height: 36px;
    display: flex; align-items: center; justify-content: center;
    color: var(--light-grey);
    font-size: 20px;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    transition: all 0.2s;
  }
  .cart-drawer__close:hover { color: var(--white); border-color: var(--grey); }

  .cart-drawer__items {
    flex: 1; overflow-y: auto; padding: 0;
  }
  .cart-item {
    display: grid;
    grid-template-columns: 80px 1fr auto;
    gap: 16px; align-items: start;
    padding: 20px 28px;
    border-bottom: 1px solid var(--border);
  }
  .cart-item__img {
    width: 80px; height: 100px;
    object-fit: cover;
    filter: grayscale(20%);
    border-radius: var(--radius);
  }
  .cart-item__name {
    font-size: 13px;
    font-weight: 500;
    color: var(--off-white);
    margin-bottom: 8px;
    line-height: 1.4;
  }
  .cart-item__price { font-size: 14px; font-weight: 600; color: var(--white); }
  .cart-item__qty {
    display: flex; align-items: center; gap: 12px; margin-top: 12px;
  }
  .cart-item__qty-btn {
    width: 26px; height: 26px;
    display: flex; align-items: center; justify-content: center;
    border: 1px solid var(--border);
    color: var(--light-grey);
    font-size: 16px;
    transition: all 0.2s;
    border-radius: 1px;
    line-height: 1;
  }
  .cart-item__qty-btn:hover { border-color: var(--grey); color: var(--white); }
  .cart-item__qty-num {
    font-size: 13px; font-weight: 500; min-width: 20px; text-align: center;
  }
  .cart-item__remove {
    font-size: 11px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--grey);
    transition: color 0.2s;
  }
  .cart-item__remove:hover { color: #e74c3c; }

  .cart-drawer__footer {
    padding: 24px 28px;
    border-top: 1px solid var(--border);
    flex-shrink: 0;
  }
  .cart-drawer__total-row {
    display: flex; justify-content: space-between;
    font-size: 13px; color: var(--light-grey);
    margin-bottom: 8px;
  }
  .cart-drawer__total-row--main {
    font-size: 18px; font-weight: 600; color: var(--white);
    margin-bottom: 24px;
  }
  .cart-drawer__empty {
    flex: 1; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    color: var(--grey); gap: 16px;
    font-size: 13px; letter-spacing: 1px; text-transform: uppercase;
  }
  .cart-drawer__empty-icon { font-size: 48px; opacity: 0.3; }

  /* ── MOBILE NAV ── */
  .mobile-nav {
    position: fixed; inset: 0; z-index: 1500;
    background: var(--black);
    display: flex; flex-direction: column;
    animation: fadeIn 0.25s ease;
    overflow-y: auto;
    padding: calc(var(--nav-h) + 36px + 20px) 32px 48px;
  }
  .mobile-nav__item {
    border-bottom: 1px solid var(--border);
  }
  .mobile-nav__btn {
    display: flex; align-items: center; justify-content: space-between;
    width: 100%;
    padding: 20px 0;
    font-family: var(--font-display);
    font-size: 32px;
    letter-spacing: 2px;
    color: var(--white);
  }
  .mobile-nav__btn svg { flex-shrink: 0; }
  .mobile-nav__sub {
    padding-bottom: 16px;
    display: flex; flex-direction: column; gap: 2px;
  }
  .mobile-nav__sub-link {
    padding: 10px 0;
    font-size: 12px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--light-grey);
    transition: color 0.2s;
  }
  .mobile-nav__sub-link:hover { color: var(--white); }

  /* ── FILTER BAR ── */
  .filter-bar {
    display: flex; align-items: center; gap: 12px;
    padding: 24px 48px;
    border-bottom: 1px solid var(--border);
    overflow-x: auto;
    scrollbar-width: none;
  }
  .filter-bar::-webkit-scrollbar { display: none; }
  .filter-chip {
    flex-shrink: 0;
    padding: 8px 18px;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    border: 1px solid var(--border);
    border-radius: 100px;
    color: var(--light-grey);
    transition: all 0.2s;
    white-space: nowrap;
  }
  .filter-chip:hover, .filter-chip--active {
    border-color: var(--white);
    color: var(--white);
    background: rgba(255,255,255,0.05);
  }

  /* ── FOOTER ── */
  .footer {
    background: var(--off-black);
    border-top: 1px solid var(--border);
    padding: 80px 48px 48px;
  }
  .footer__grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 48px;
    margin-bottom: 64px;
  }
  .footer__logo {
    font-family: var(--font-display);
    font-size: 36px;
    letter-spacing: 3px;
    color: var(--white);
    margin-bottom: 20px;
  }
  .footer__logo span { color: var(--grey); }
  .footer__tagline {
    font-size: 13px;
    color: var(--grey);
    line-height: 1.7;
    max-width: 280px;
    font-weight: 300;
  }
  .footer__col-title {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--light-grey);
    margin-bottom: 24px;
  }
  .footer__links { display: flex; flex-direction: column; gap: 12px; }
  .footer__link {
    font-size: 13px;
    color: var(--grey);
    transition: color 0.2s;
    font-weight: 300;
  }
  .footer__link:hover { color: var(--white); }
  .footer__bottom {
    display: flex; justify-content: space-between; align-items: center;
    padding-top: 32px;
    border-top: 1px solid var(--border);
    flex-wrap: wrap; gap: 16px;
  }
  .footer__copy {
    font-size: 11px;
    color: var(--grey);
    letter-spacing: 0.5px;
  }

  /* ── NOTIFICATION ── */
  .notif {
    position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
    background: var(--white);
    color: var(--black);
    padding: 14px 28px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    border-radius: var(--radius);
    z-index: 9000;
    animation: fadeUp 0.4s ease both;
    white-space: nowrap;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 1024px) {
    .footer__grid { grid-template-columns: 1fr 1fr; gap: 40px; }
    .cat-grid { grid-template-columns: repeat(2, 1fr); }
    .cat-card:first-child { grid-row: span 1; }
  }

  @media (max-width: 768px) {
    :root { --nav-h: 56px; }
    .nav { padding: 0 20px; }
    .nav__links { display: none; }
    .nav__hamburger { display: flex; }
    .section { padding: 64px 20px; }
    .hero { padding: calc(var(--nav-h) + 36px + 40px) 24px 60px; }
    .page-header { padding: calc(var(--nav-h) + 36px + 40px) 20px 40px; }
    .filter-bar { padding: 16px 20px; }
    .cat-grid { grid-template-columns: repeat(2, 1fr); }
    .product-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
    .footer { padding: 60px 20px 40px; }
    .footer__grid { grid-template-columns: 1fr; gap: 40px; }
    .footer__bottom { flex-direction: column; align-items: flex-start; }
    .section__header { margin-bottom: 32px; }
  }

  @media (max-width: 480px) {
    .hero__title { font-size: 60px; }
    .hero__cta-row { flex-direction: column; }
    .btn-primary, .btn-outline { width: 100%; justify-content: center; }
  }
`;

// ─── UTILS ───────────────────────────────────────────────────────────────────
const formatPrice = (p) => `₹${p.toLocaleString("en-IN")}`;
const discountPct = (orig, sale) => Math.round(((orig - sale) / orig) * 100);

// ─── HOOKS ───────────────────────────────────────────────────────────────────
function useLocalStorage(key, init) {
  const [val, setVal] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : init; }
    catch { return init; }
  });
  const set = useCallback((v) => {
    setVal(v);
    try { localStorage.setItem(key, JSON.stringify(v)); } catch {}
  }, [key]);
  return [val, set];
}

function useScrolled(threshold = 10) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, [threshold]);
  return scrolled;
}

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function StyleInjector() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = GLOBAL_STYLES;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  return null;
}

function Notification({ msg, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);
  return <div className="notif">{msg}</div>;
}

function SkeletonGrid({ count = 8 }) {
  return (
    <div className="product-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton skeleton-img" />
          <div className="skeleton-body">
            <div className="skeleton skeleton-line" style={{ width: "80%" }} />
            <div className="skeleton skeleton-line skeleton-line--short" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ProductCard({ product, onAddToCart, delay = 0 }) {
  const [added, setAdded] = useState(false);
  const [ref, visible] = useReveal();

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div
      ref={ref}
      className="product-card"
      style={{ animationDelay: `${delay}ms`, opacity: visible ? undefined : 0 }}
    >
      <div className="product-card__img-wrap">
        <img
          className="product-card__img"
          src={product.image}
          alt={product.name}
          loading="lazy"
        />
        {product.tag && (
          <span className={`product-card__tag product-card__tag--${product.tag}`}>
            {product.tag === "bestseller" ? "Best Seller" : product.tag}
          </span>
        )}
      </div>
      <div className="product-card__body">
        <p className="product-card__name">{product.name}</p>
        <div className="product-card__price-row">
          <span className="product-card__price">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <>
              <span className="product-card__og-price">{formatPrice(product.originalPrice)}</span>
              <span className="product-card__discount">
                -{discountPct(product.originalPrice, product.price)}%
              </span>
            </>
          )}
        </div>
        <button
          className={`btn-cart${added ? " btn-cart--added" : ""}`}
          onClick={handleAdd}
        >
          {added ? "✓ Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

function CartDrawer({ cart, onClose, onQtyChange, onRemove }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const subtotal = total;
  const shipping = total > 2999 ? 0 : 199;

  return (
    <div className="cart-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="cart-drawer">
        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title">CART</h2>
          <button className="cart-drawer__close" onClick={onClose}>✕</button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-drawer__empty">
            <div className="cart-drawer__empty-icon">◻</div>
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="cart-drawer__items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img className="cart-item__img" src={item.image} alt={item.name} />
                  <div>
                    <p className="cart-item__name">{item.name}</p>
                    <p className="cart-item__price">{formatPrice(item.price)}</p>
                    <div className="cart-item__qty">
                      <button className="cart-item__qty-btn" onClick={() => onQtyChange(item.id, item.qty - 1)}>−</button>
                      <span className="cart-item__qty-num">{item.qty}</span>
                      <button className="cart-item__qty-btn" onClick={() => onQtyChange(item.id, item.qty + 1)}>+</button>
                    </div>
                    <button className="cart-item__remove" onClick={() => onRemove(item.id)} style={{ marginTop: 8 }}>
                      Remove
                    </button>
                  </div>
                  <div style={{ textAlign: "right", fontSize: 14, fontWeight: 600, color: "var(--white)" }}>
                    {formatPrice(item.price * item.qty)}
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-drawer__footer">
              <div className="cart-drawer__total-row">
                <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
              </div>
              <div className="cart-drawer__total-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              {shipping > 0 && (
                <div style={{ fontSize: 11, color: "var(--grey)", marginBottom: 8, letterSpacing: 0.5 }}>
                  Free shipping on orders above ₹2,999
                </div>
              )}
              <div className="cart-drawer__total-row cart-drawer__total-row--main">
                <span>Total</span><span>{formatPrice(subtotal + shipping)}</span>
              </div>
              <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                Checkout →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Navbar({ cartCount, onCartOpen, currentPage, onNavigate }) {
  const scrolled = useScrolled();
  const [hovered, setHovered] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);

  return (
    <>
      <nav className={`nav${scrolled ? " nav--scrolled" : ""}`}>
        <button className="nav__logo" onClick={() => onNavigate("home")}>
          LOOM<span>HAUS</span>
        </button>

        <ul className="nav__links">
          {CATEGORIES.map((cat) => (
            <li
              key={cat.key}
              onMouseEnter={() => setHovered(cat.key)}
              onMouseLeave={() => setHovered(null)}
            >
              <button
                className={`nav__link-btn${currentPage === cat.key ? " nav__link-btn--active" : ""}`}
                onClick={() => { onNavigate(cat.key); setHovered(null); }}
              >
                {cat.label}
              </button>
              {hovered === cat.key && (
                <div className="nav__dropdown">
                  {cat.sub.map((s) => (
                    <button key={s} className="nav__dropdown-item" onClick={() => onNavigate(cat.key)}>
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="nav__right">
          <button className="nav__cart-btn" onClick={onCartOpen}>
            <span>Bag</span>
            {cartCount > 0 && <span className="nav__cart-count">{cartCount}</span>}
          </button>
          <button className="nav__hamburger" onClick={() => setMobileOpen(true)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="mobile-nav">
          <button
            onClick={() => setMobileOpen(false)}
            style={{ position: "fixed", top: 16, right: 20, fontSize: 20, color: "var(--light-grey)", zIndex: 10 }}
          >✕</button>
          {CATEGORIES.map((cat) => (
            <div key={cat.key} className="mobile-nav__item">
              <button
                className="mobile-nav__btn"
                onClick={() => setMobileExpanded(mobileExpanded === cat.key ? null : cat.key)}
              >
                <span>{cat.label}</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d={mobileExpanded === cat.key ? "M4 10L8 6L12 10" : "M4 6L8 10L12 6"}
                    stroke="currentColor" strokeWidth="1.5"
                  />
                </svg>
              </button>
              {mobileExpanded === cat.key && (
                <div className="mobile-nav__sub">
                  {cat.sub.map((s) => (
                    <button
                      key={s}
                      className="mobile-nav__sub-link"
                      onClick={() => { onNavigate(cat.key); setMobileOpen(false); }}
                    >
                      {s}
                    </button>
                  ))}
                  <button
                    className="mobile-nav__sub-link"
                    style={{ color: "var(--white)", fontWeight: 500 }}
                    onClick={() => { onNavigate(cat.key); setMobileOpen(false); }}
                  >
                    View All →
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function Ticker() {
  const items = ["Free Shipping on Orders Above ₹2,999", "New Season Drop — Shop Now", "Use Code LOOM10 for 10% Off", "Limited Stock — Don't Miss Out"];
  const doubled = [...items, ...items];
  return (
    <div className="ticker">
      <div className="ticker__inner">
        {doubled.map((t, i) => (
          <span key={i} className="ticker__text">
            {t}<span className="ticker__dot">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Hero({ onNavigate }) {
  return (
    <section className="hero">
      <div className="hero__bg" />
      <div className="hero__bg-img" />
      <div className="hero__overlay" />
      <div className="hero__content">
        <p className="hero__eyebrow fade-up">SS '25 Collection</p>
        <h1 className="hero__title fade-up fade-up-d1">
          DEFINE<br />YOUR<br /><em>ERA.</em>
        </h1>
        <p className="hero__sub fade-up fade-up-d2">
          Curated fashion for those who refuse to be invisible. Retro energy, modern precision.
        </p>
        <div className="hero__cta-row fade-up fade-up-d3">
          <button className="btn-primary" onClick={() => onNavigate("newIn")}>
            Shop New In →
          </button>
          <button className="btn-outline" onClick={() => onNavigate("women")}>
            Women's Edit
          </button>
        </div>
      </div>
    </section>
  );
}

const CAT_IMAGES = {
  men: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800&q=80",
  women: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
  newIn: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80",
  sale: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80",
  genz: "https://images.unsplash.com/photo-1495385794356-15371f348c31?w=800&q=80",
  millennials: "https://images.unsplash.com/photo-1591085686350-798c0f9faa1f?w=800&q=80",
};

function HomeCategoryGrid({ onNavigate }) {
  const [ref, visible] = useReveal();
  const cats = CATEGORIES;
  return (
    <section className="section">
      <div className="section__header">
        <h2 className="section__title">SHOP BY<br />CATEGORY</h2>
        <button className="section__link" onClick={() => onNavigate("newIn")}>View All →</button>
      </div>
      <div ref={ref} className="cat-grid" style={{ opacity: visible ? 1 : 0, transition: "opacity 0.5s" }}>
        {cats.map((cat, i) => (
          <div key={cat.key} className="cat-card" onClick={() => onNavigate(cat.key)}>
            <img className="cat-card__img" src={CAT_IMAGES[cat.key]} alt={cat.label} loading="lazy" />
            <div className="cat-card__overlay" />
            <div className="cat-card__label">
              <h3>{cat.label.toUpperCase()}</h3>
              <span>{cat.sub.length} categories</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturedSection({ onAddToCart, onNavigate }) {
  const [ref, visible] = useReveal();
  const featured = [
    ...PRODUCTS.women.slice(0, 3),
    ...PRODUCTS.men.slice(0, 2),
    ...PRODUCTS.newIn.slice(0, 3),
  ];
  return (
    <section className="section section--grey">
      <div className="section__header">
        <h2 className="section__title">FEATURED</h2>
        <button className="section__link" onClick={() => onNavigate("newIn")}>All Products →</button>
      </div>
      <div ref={ref} className="product-grid">
        {featured.map((p, i) => (
          <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} delay={i * 60} />
        ))}
      </div>
    </section>
  );
}

function BannerSection({ onNavigate }) {
  return (
    <section style={{ position: "relative", height: "60vh", overflow: "hidden", minHeight: 340 }}>
      <img
        src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&q=80"
        alt=""
        style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(50%)", display: "block" }}
      />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 24px" }}>
        <p style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "var(--light-grey)", marginBottom: 20 }}>Sale — Up to 50% Off</p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px,8vw,100px)", letterSpacing: 4, color: "var(--white)", lineHeight: 1, marginBottom: 36 }}>
          FINAL<br />CLEARANCE
        </h2>
        <button className="btn-primary" onClick={() => onNavigate("sale")}>Shop Sale →</button>
      </div>
    </section>
  );
}

function HomePage({ onAddToCart, onNavigate }) {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <HomeCategoryGrid onNavigate={onNavigate} />
      <FeaturedSection onAddToCart={onAddToCart} onNavigate={onNavigate} />
      <BannerSection onNavigate={onNavigate} />
    </>
  );
}

function CategoryPage({ categoryKey, onAddToCart }) {
  const cat = CATEGORIES.find((c) => c.key === categoryKey);
  const products = PRODUCTS[categoryKey] || [];
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, [categoryKey]);

  const filters = ["All", ...cat.sub];
  const filtered = products; // In real app, filter by sub-category

  const LABELS = {
    men: "MEN",
    women: "WOMEN",
    newIn: "NEW IN",
    sale: "SALE",
    genz: "GEN Z",
    millennials: "MILLENNIALS",
  };

  return (
    <>
      <div className="page-header">
        <p className="page-header__label">
          {cat.sub.length} Categories · {products.length} Items
        </p>
        <h1 className="page-header__title">{LABELS[categoryKey]}</h1>
        <p className="page-header__sub">
          {categoryKey === "sale" && "Don't miss out — limited time offers"}
          {categoryKey === "newIn" && "Fresh drops, just landed"}
          {categoryKey === "genz" && "Built for the bold generation"}
          {categoryKey === "millennials" && "Timeless pieces, elevated"}
          {categoryKey === "men" && "Sharp. Effortless. Defined."}
          {categoryKey === "women" && "Where luxury meets edge."}
        </p>
      </div>

      <div className="filter-bar">
        {filters.map((f) => (
          <button
            key={f}
            className={`filter-chip${filter === f ? " filter-chip--active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="section">
        {loading ? (
          <SkeletonGrid count={10} />
        ) : (
          <div className="product-grid">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} delay={i * 50} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function Footer({ onNavigate }) {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div>
          <div className="footer__logo">LOOM<span>HAUS</span></div>
          <p className="footer__tagline">
            Curated fashion that bridges the gap between 90s nostalgia and modern luxury. 
            Because style is never just clothes — it's a statement.
          </p>
        </div>
        <div>
          <p className="footer__col-title">Shop</p>
          <div className="footer__links">
            {CATEGORIES.map((c) => (
              <button key={c.key} className="footer__link" onClick={() => onNavigate(c.key)}>
                {c.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="footer__col-title">Help</p>
          <div className="footer__links">
            {["Size Guide", "Shipping & Returns", "Track Order", "FAQs", "Contact Us"].map((l) => (
              <a key={l} href="#" className="footer__link">{l}</a>
            ))}
          </div>
        </div>
        <div>
          <p className="footer__col-title">Brand</p>
          <div className="footer__links">
            {["Our Story", "Sustainability", "Careers", "Press", "Affiliates"].map((l) => (
              <a key={l} href="#" className="footer__link">{l}</a>
            ))}
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <p className="footer__copy">© 2025 LOOMHAUS. All rights reserved.</p>
        <p className="footer__copy">Made in India · Shipped Worldwide</p>
      </div>
    </footer>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
function App() {
  const [cart, setCart] = useLocalStorage("loomhaus_cart", []);
  const [cartOpen, setCartOpen] = useState(false);
  const [page, setPage] = useState("home");
  const [notif, setNotif] = useState(null);
  const notifRef = useRef(null);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const navigate = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addToCart = useCallback((product) => {
    setCart((prev) => {
      const ex = prev.find((i) => i.id === product.id);
      if (ex) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    clearTimeout(notifRef.current);
    setNotif(`${product.name} added to cart`);
    notifRef.current = setTimeout(() => setNotif(null), 2200);
  }, [setCart]);

  const changeQty = useCallback((id, qty) => {
    if (qty < 1) {
      setCart((prev) => prev.filter((i) => i.id !== id));
    } else {
      setCart((prev) => prev.map((i) => i.id === id ? { ...i, qty } : i));
    }
  }, [setCart]);

  const removeItem = useCallback((id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }, [setCart]);

  return (
    <>
      <StyleInjector />
      <Navbar
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        currentPage={page}
        onNavigate={navigate}
      />
      <Ticker />

      <main style={{ paddingTop: page === "home" ? 0 : 0, minHeight: "100vh" }}>
        {page === "home" ? (
          <HomePage onAddToCart={addToCart} onNavigate={navigate} />
        ) : (
          <CategoryPage categoryKey={page} onAddToCart={addToCart} />
        )}
      </main>

      <Footer onNavigate={navigate} />

      {cartOpen && (
        <CartDrawer
          cart={cart}
          onClose={() => setCartOpen(false)}
          onQtyChange={changeQty}
          onRemove={removeItem}
        />
      )}

      {notif && (
        <Notification key={notif + Date.now()} msg={notif} onDone={() => setNotif(null)} />
      )}
    </>
  );
}

export default App;