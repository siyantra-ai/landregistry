-- ==========================================
-- Supabase Schema for landregistrytransfers.com
-- Database Table: enquiries
-- ==========================================

-- 1. Create Enquiries Table
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(100) NOT NULL,
    service VARCHAR(255) NOT NULL,
    notes TEXT,
    status VARCHAR(50) DEFAULT 'new'::character varying NOT NULL
);

-- Add comments for documentation on Supabase Dashboard
COMMENT ON TABLE public.enquiries IS 'Table containing contact quotes and document orders submitted by users.';
COMMENT ON COLUMN public.enquiries.id IS 'Unique UUID identifier for the application/enquiry.';
COMMENT ON COLUMN public.enquiries.created_at IS 'Timestamp when the enquiry was submitted in UTC.';
COMMENT ON COLUMN public.enquiries.name IS 'Full name of the applicant/enquirer.';
COMMENT ON COLUMN public.enquiries.email IS 'Contact email address.';
COMMENT ON COLUMN public.enquiries.phone IS 'Contact mobile or telephone number.';
COMMENT ON COLUMN public.enquiries.service IS 'The specific service requested (e.g. Apply Form, Document Order, Callback Request).';
COMMENT ON COLUMN public.enquiries.notes IS 'Serialized checklist details, prices, coordination coordinates, and user-provided notes.';
COMMENT ON COLUMN public.enquiries.status IS 'Processing status of the request (e.g. new, processing, completed, archived).';

-- 2. Performance Indexes
CREATE INDEX IF NOT EXISTS enquiries_created_at_idx ON public.enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS enquiries_email_idx ON public.enquiries (email);
CREATE INDEX IF NOT EXISTS enquiries_status_idx ON public.enquiries (status);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- 4. Row Level Security Policies

-- Policy A: Allow anyone (unauthenticated/anonymous public) to insert/submit new enquiries
CREATE POLICY "Allow public insert access" 
ON public.enquiries 
FOR INSERT 
WITH CHECK (true);

-- Policy B: Allow authenticated project users (e.g. administrators, managers, team) to read/select records
CREATE POLICY "Allow authenticated read access" 
ON public.enquiries 
FOR SELECT 
TO authenticated 
USING (true);

-- Policy C: Allow authenticated project users to update records (e.g. change status to processing/completed)
CREATE POLICY "Allow authenticated update access" 
ON public.enquiries 
FOR UPDATE 
TO authenticated 
USING (true);

-- Policy D: Allow authenticated project users to delete/archive records if needed
CREATE POLICY "Allow authenticated delete access" 
ON public.enquiries 
FOR DELETE 
TO authenticated 
USING (true);
