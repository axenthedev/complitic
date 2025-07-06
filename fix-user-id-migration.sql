-- Migration script to fix user_id column type for Clerk compatibility
-- Run this if you already have the policy_documents table

-- Check if table exists and has the wrong user_id type
DO $$
BEGIN
    -- Check if the table exists
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'policy_documents') THEN
        -- Check if user_id column is UUID type
        IF EXISTS (
            SELECT FROM information_schema.columns 
            WHERE table_name = 'policy_documents' 
            AND column_name = 'user_id' 
            AND data_type = 'uuid'
        ) THEN
            -- Alter the column type from UUID to TEXT
            ALTER TABLE policy_documents ALTER COLUMN user_id TYPE TEXT;
            RAISE NOTICE 'Updated user_id column from UUID to TEXT';
        ELSE
            RAISE NOTICE 'user_id column is already TEXT type';
        END IF;
    ELSE
        RAISE NOTICE 'policy_documents table does not exist';
    END IF;
END $$;

-- Verify the change
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'policy_documents' 
AND column_name = 'user_id'; 