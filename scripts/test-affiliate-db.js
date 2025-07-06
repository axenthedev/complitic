const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function testAffiliateDatabase() {
  console.log('🧪 Testing Affiliate Database Setup...\n');

  try {
    // Test 1: Check if tables exist
    console.log('1. Checking if affiliate tables exist...');
    
    const tables = ['affiliate_stats', 'referrals', 'payouts', 'referral_links', 'affiliate_materials'];
    
    for (const table of tables) {
      try {
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .limit(1);
        
        if (error) {
          console.log(`❌ Table ${table}: ${error.message}`);
        } else {
          console.log(`✅ Table ${table}: Exists`);
        }
      } catch (err) {
        console.log(`❌ Table ${table}: ${err.message}`);
      }
    }

    // Test 2: Check RLS policies
    console.log('\n2. Checking RLS policies...');
    
    const { data: policies, error: policiesError } = await supabase
      .rpc('get_policies');
    
    if (policiesError) {
      console.log('⚠️  Could not check RLS policies (this is normal if function does not exist)');
    } else {
      console.log('✅ RLS policies are configured');
    }

    // Test 3: Test sample data insertion
    console.log('\n3. Testing sample data insertion...');
    
    const testUserId = 'test-user-' + Date.now();
    
    // Test affiliate_stats insertion
    const { data: statsData, error: statsError } = await supabase
      .from('affiliate_stats')
      .insert({
        user_id: testUserId,
        clicks: 10,
        conversions: 2,
        total_earnings: 50.0,
        available_balance: 25.0,
        pending_balance: 25.0
      })
      .select();

    if (statsError) {
      console.log(`❌ affiliate_stats insertion: ${statsError.message}`);
    } else {
      console.log('✅ affiliate_stats insertion: Success');
      
      // Clean up test data
      await supabase
        .from('affiliate_stats')
        .delete()
        .eq('user_id', testUserId);
    }

    // Test 4: Check affiliate materials
    console.log('\n4. Checking affiliate materials...');
    
    const { data: materials, error: materialsError } = await supabase
      .from('affiliate_materials')
      .select('*')
      .eq('is_active', true);

    if (materialsError) {
      console.log(`❌ affiliate_materials query: ${materialsError.message}`);
    } else {
      console.log(`✅ affiliate_materials: ${materials?.length || 0} active materials found`);
    }

    // Test 5: Check environment variables
    console.log('\n5. Checking environment variables...');
    
    const requiredEnvVars = [
      'NEXT_PUBLIC_SUPABASE_URL',
      'SUPABASE_SERVICE_ROLE_KEY'
    ];

    for (const envVar of requiredEnvVars) {
      if (process.env[envVar]) {
        console.log(`✅ ${envVar}: Set`);
      } else {
        console.log(`❌ ${envVar}: Missing`);
      }
    }

    console.log('\n🎉 Affiliate database test completed!');
    
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.log('\n📋 Next steps:');
      console.log('1. Run the affiliate_schema.sql in your Supabase SQL editor');
      console.log('2. Test the affiliate dashboard page');
      console.log('3. Verify that data is being fetched correctly');
    }

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run the test
testAffiliateDatabase(); 