// Test script to verify database connection and table existence
// Run this with: node test-database.js

const { createClient } = require('@supabase/supabase-js');

// Check environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('Environment Variables Check:');
console.log('SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
console.log('SUPABASE_KEY:', supabaseKey ? '✅ Set' : '❌ Missing');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing required environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testDatabase() {
  try {
    console.log('\n🔍 Testing database connection...');
    
    // Test basic connection
    const { data, error } = await supabase
      .from('policy_documents')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Database connection failed:', error.message);
      
      if (error.message.includes('relation "policy_documents" does not exist')) {
        console.log('\n💡 The policy_documents table does not exist.');
        console.log('Please run the database schema:');
        console.log('psql -d your_database -f database-schema-update.sql');
      }
      
      return;
    }
    
    console.log('✅ Database connection successful');
    console.log('✅ policy_documents table exists');
    
    // Test inserting a sample record
    console.log('\n🧪 Testing insert operation...');
    const testData = {
      user_id: 'test-user-id',
      template_slug: 'test-template',
      template_name: 'Test Template',
      content: 'Test content',
      form_data: { test: true },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    const { data: insertData, error: insertError } = await supabase
      .from('policy_documents')
      .insert([testData])
      .select()
      .single();
    
    if (insertError) {
      console.error('❌ Insert test failed:', insertError.message);
      return;
    }
    
    console.log('✅ Insert operation successful');
    console.log('✅ Sample record created with ID:', insertData.id);
    
    // Clean up test data
    await supabase
      .from('policy_documents')
      .delete()
      .eq('user_id', 'test-user-id');
    
    console.log('✅ Test data cleaned up');
    console.log('\n🎉 All database tests passed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testDatabase(); 