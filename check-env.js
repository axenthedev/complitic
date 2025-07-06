// Environment variable checker
// Run this with: node check-env.js

require('dotenv').config({ path: '.env.local' });

console.log('🔍 Checking Environment Variables...\n');

const requiredVars = {
  'NEXT_PUBLIC_SUPABASE_URL': 'Supabase project URL',
  'SUPABASE_SERVICE_ROLE_KEY': 'Supabase service role key (for server-side operations)',
  'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY': 'Clerk publishable key',
  'CLERK_SECRET_KEY': 'Clerk secret key'
};

let allGood = true;

for (const [varName, description] of Object.entries(requiredVars)) {
  const value = process.env[varName];
  if (value) {
    console.log(`✅ ${varName}: Set`);
    if (varName.includes('KEY') || varName.includes('SECRET')) {
      console.log(`   Value: ${value.substring(0, 10)}...${value.substring(value.length - 4)}`);
    } else {
      console.log(`   Value: ${value}`);
    }
  } else {
    console.log(`❌ ${varName}: Missing`);
    console.log(`   Description: ${description}`);
    allGood = false;
  }
  console.log('');
}

if (allGood) {
  console.log('🎉 All required environment variables are set!');
} else {
  console.log('⚠️  Some environment variables are missing.');
  console.log('\n📝 To fix this:');
  console.log('1. Create or update your .env.local file');
  console.log('2. Add the missing variables');
  console.log('3. Restart your development server');
  console.log('\n📋 Example .env.local file:');
  console.log(`
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_key
CLERK_SECRET_KEY=sk_test_your_clerk_secret
  `);
}

console.log('\n🔧 Next steps:');
console.log('1. Check your .env.local file exists');
console.log('2. Verify all variables are set correctly');
console.log('3. Restart your development server: npm run dev');
console.log('4. Make sure you are logged in to the application'); 