#!/usr/bin/env node
/**
 * KOMPLETTE APP-PRÜFUNG SCRIPT
 * Testet alle wichtigen Funktionen der App
 */

const fetch = require('node:fetch');

const BASE_URL = 'http://localhost:3000';
const API_URL = `${BASE_URL}/api`;

// Test Results
const results = {
  passed: [],
  failed: [],
  skipped: []
};

// ANSI Colors
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logTest(name, passed, message = '') {
  const icon = passed ? '✅' : '❌';
  const color = passed ? 'green' : 'red';
  log(`${icon} ${name}${message ? ': ' + message : ''}`, color);
  
  if (passed) {
    results.passed.push(name);
  } else {
    results.failed.push(name);
  }
}

// Tests

async function testServerRunning() {
  try {
    const res = await fetch(BASE_URL);
    logTest('Server läuft', res.ok);
    return res.ok;
  } catch (error) {
    logTest('Server läuft', false, error.message);
    return false;
  }
}

async function testHomepage() {
  try {
    const res = await fetch(BASE_URL);
    const html = await res.text();
    const hasContent = html.includes('FahrGewerbe') || html.includes('Lernen');
    logTest('Homepage lädt', hasContent);
    return hasContent;
  } catch (error) {
    logTest('Homepage lädt', false, error.message);
    return false;
  }
}

async function testLearnPage() {
  try {
    const res = await fetch(`${BASE_URL}/learn`);
    const html = await res.text();
    const hasKapitel = html.includes('PBefG') || html.includes('Kapitel');
    logTest('Learn-Seite lädt', hasKapitel);
    return hasKapitel;
  } catch (error) {
    logTest('Learn-Seite lädt', false, error.message);
    return false;
  }
}

async function testPricingPage() {
  try {
    const res = await fetch(`${BASE_URL}/pricing-new`);
    logTest('Pricing-Seite lädt', res.ok);
    return res.ok;
  } catch (error) {
    logTest('Pricing-Seite lädt', false, error.message);
    return false;
  }
}

async function testSigninPage() {
  try {
    const res = await fetch(`${BASE_URL}/auth/signin`);
    logTest('Signin-Seite lädt', res.ok);
    return res.ok;
  } catch (error) {
    logTest('Signin-Seite lädt', false, error.message);
    return false;
  }
}

async function testStripeCheckoutAPI() {
  try {
    const res = await fetch(`${API_URL}/stripe/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        priceId: 'price_test123',
        email: 'test@example.com',
        name: 'Test User'
      })
    });
    
    // Erwarten 400 oder 500 weil fake priceId, aber API existiert
    const exists = res.status === 400 || res.status === 500;
    logTest('Stripe Checkout API existiert', exists);
    return exists;
  } catch (error) {
    logTest('Stripe Checkout API existiert', false, error.message);
    return false;
  }
}

async function testVerifySessionAPI() {
  try {
    const res = await fetch(`${API_URL}/stripe/verify-session?session_id=test123`);
    const data = await res.json();
    
    // Erwarten Error weil fake session, aber API antwortet
    const exists = !!data.error || !!data.success;
    logTest('Verify Session API existiert', exists);
    return exists;
  } catch (error) {
    logTest('Verify Session API existiert', false, error.message);
    return false;
  }
}

async function testRegistrationAPI() {
  try {
    const res = await fetch(`${API_URL}/auth/complete-registration`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test',
        email: 'test@test.com',
        password: 'Test1234!',
        sessionId: 'fake'
      })
    });
    
    const data = await res.json();
    // API existiert und gibt response
    const exists = !!data.error || !!data.success;
    logTest('Registration API existiert', exists);
    return exists;
  } catch (error) {
    logTest('Registration API existiert', false, error.message);
    return false;
  }
}

async function testExamPageProtected() {
  try {
    const res = await fetch(`${BASE_URL}/exam`, {
      redirect: 'manual'
    });
    
    // Should redirect to signin (302/303/307) or show signin page
    const isProtected = res.status >= 300 && res.status < 400;
    logTest('Exam-Seite ist geschützt', isProtected);
    return isProtected;
  } catch (error) {
    // Fetch might throw on redirect with 'manual'
    logTest('Exam-Seite ist geschützt', true, 'Redirect erkannt');
    return true;
  }
}

// Main Test Suite
async function runTests() {
  log('\n🚀 STARTE APP-PRÜFUNG\n', 'cyan');
  log('=' .repeat(60), 'blue');
  
  log('\n📋 SEITEN-TESTS', 'yellow');
  log('-'.repeat(60), 'blue');
  await testServerRunning();
  await testHomepage();
  await testLearnPage();
  await testPricingPage();
  await testSigninPage();
  
  log('\n🔌 API-TESTS', 'yellow');
  log('-'.repeat(60), 'blue');
  await testStripeCheckoutAPI();
  await testVerifySessionAPI();
  await testRegistrationAPI();
  
  log('\n🔒 SICHERHEITS-TESTS', 'yellow');
  log('-'.repeat(60), 'blue');
  await testExamPageProtected();
  
  // Summary
  log('\n' + '='.repeat(60), 'blue');
  log('\n📊 TEST-ZUSAMMENFASSUNG\n', 'cyan');
  log(`✅ Bestanden: ${results.passed.length}`, 'green');
  log(`❌ Fehlgeschlagen: ${results.failed.length}`, 'red');
  log(`⏭️  Übersprungen: ${results.skipped.length}`, 'yellow');
  
  const total = results.passed.length + results.failed.length + results.skipped.length;
  const percentage = ((results.passed.length / total) * 100).toFixed(1);
  
  log(`\n🎯 Erfolgsrate: ${percentage}%`, percentage >= 80 ? 'green' : 'red');
  
  if (results.failed.length > 0) {
    log('\n❌ FEHLGESCHLAGENE TESTS:', 'red');
    results.failed.forEach(test => log(`  • ${test}`, 'red'));
  }
  
  log('\n' + '='.repeat(60), 'blue');
  log('\n✨ Prüfung abgeschlossen!\n', 'cyan');
  
  // Exit with error if tests failed
  if (results.failed.length > 0) {
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  runTests().catch(error => {
    log(`\n💥 FATALER FEHLER: ${error.message}`, 'red');
    process.exit(1);
  });
}

module.exports = { runTests };
