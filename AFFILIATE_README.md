# Affiliate System Implementation

## Overview

The affiliate system allows users to earn 30% commission on every $60 subscription they refer. The system includes comprehensive tracking, minimalistic UI, and real-time analytics.

## Commission Structure

- **Commission Rate**: 30%
- **Subscription Amount**: $60
- **Commission per Referral**: $18
- **Minimum Payout**: $50

## Database Schema

### Core Tables

1. **affiliate_stats** - User performance metrics
2. **referrals** - Referral tracking with status
3. **payouts** - Payment history and status
4. **referral_links** - Unique tracking links
5. **referral_clicks** - Detailed click analytics
6. **affiliate_materials** - Marketing materials
7. **commission_events** - Commission calculation tracking

### Key Features

- **Row Level Security (RLS)** - Users can only access their own data
- **Automatic Calculations** - Conversion rates and commissions calculated automatically
- **Click Tracking** - IP, user agent, and referrer tracking
- **Commission Events** - Detailed audit trail of all commission calculations

## API Endpoints

### Affiliate Dashboard APIs

- `GET /api/affiliate/stats` - Fetch user statistics
- `GET /api/affiliate/referrals` - Fetch referral list with pagination
- `GET /api/affiliate/links` - Fetch user's referral links
- `POST /api/affiliate/links` - Create new referral link
- `GET /api/affiliate/payouts` - Fetch payout history
- `GET /api/affiliate/materials` - Fetch marketing materials
- `POST /api/affiliate/commission` - Record commission event
- `GET /api/affiliate/commission` - Fetch commission history

### Referral Tracking

- `GET /api/ref/[code]` - Handle referral clicks and redirects

## UI Components

### Dashboard Features

1. **Minimalistic Design** - Clean, modern interface
2. **Real-time Stats** - Live updates of earnings and performance
3. **Referral Links** - Create and manage tracking links
4. **Commission Tracking** - Detailed breakdown of earnings
5. **Marketing Materials** - Downloadable promotional assets

### Key UI Elements

- **Stats Cards** - Total earnings, referrals, conversion rate
- **Referral Links Manager** - Create, copy, and track links
- **Referrals Table** - Complete referral history with status
- **Commission Info** - Clear explanation of earning structure

## Tracking System

### Referral Flow

1. **Link Creation** - User creates unique referral link
2. **Click Tracking** - System records click with metadata
3. **Cookie Setting** - Referral code stored for 30 days
4. **Conversion Tracking** - Commission calculated on subscription
5. **Commission Payment** - $18 added to user's balance

### Data Collected

- **Click Data**: IP address, user agent, referrer, timestamp
- **Conversion Data**: Email, subscription amount, commission earned
- **Performance Data**: Clicks, conversions, conversion rate, earnings

## Setup Instructions

### 1. Database Setup

Run the `affiliate_schema.sql` file in your Supabase SQL editor:

```sql
-- This will create all necessary tables, indexes, and policies
-- Run the entire affiliate_schema.sql file
```

### 2. Environment Variables

Ensure these environment variables are set in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_APP_URL=your_app_url
```

### 3. Testing

Run the test script to verify setup:

```bash
node scripts/test-affiliate-system.js
```

## Usage Guide

### For Affiliates

1. **Access Dashboard** - Navigate to `/dashboard/affiliate`
2. **Create Links** - Generate unique referral links
3. **Share Links** - Distribute links via social media, email, etc.
4. **Track Performance** - Monitor clicks, conversions, and earnings
5. **Request Payouts** - Withdraw earnings when balance reaches $50

### For Developers

1. **Commission Tracking** - Use `/api/affiliate/commission` to record conversions
2. **Referral Detection** - Check for `ref_code` cookie in signup flow
3. **Analytics** - Use commission events for detailed reporting

## Commission Calculation

```javascript
const subscriptionAmount = 60; // $60 subscription
const commissionRate = 30; // 30% commission
const commissionAmount = (subscriptionAmount * commissionRate) / 100; // $18
```

## Security Features

- **RLS Policies** - Users can only access their own data
- **Input Validation** - All API endpoints validate input
- **Rate Limiting** - Click tracking includes rate limiting
- **Audit Trail** - All commission events are logged

## Performance Optimizations

- **Database Indexes** - Optimized queries for user_id and status
- **Caching** - Stats are cached and updated incrementally
- **Batch Operations** - Multiple updates handled efficiently
- **Lazy Loading** - UI components load data on demand

## Monitoring and Analytics

### Key Metrics

- **Conversion Rate** - Clicks to conversions ratio
- **Earnings per Referral** - Average commission per successful referral
- **Click-through Rate** - Link performance metrics
- **Geographic Distribution** - Referral source analysis

### Reporting

- **Real-time Dashboard** - Live updates of all metrics
- **Historical Data** - 6-month performance overview
- **Export Capabilities** - Download reports for external analysis

## Troubleshooting

### Common Issues

1. **Missing Environment Variables** - Ensure all required env vars are set
2. **RLS Policy Errors** - Verify policies are correctly configured
3. **Commission Not Calculating** - Check trigger functions are active
4. **Links Not Tracking** - Verify referral redirect endpoint is working

### Debug Steps

1. Check browser console for JavaScript errors
2. Verify API endpoints are responding correctly
3. Check Supabase logs for database errors
4. Test referral flow end-to-end

## Future Enhancements

- **Advanced Analytics** - Geographic and demographic insights
- **Automated Payouts** - Integration with payment processors
- **Multi-tier Commissions** - Sub-affiliate programs
- **A/B Testing** - Link performance optimization
- **Mobile App** - Native affiliate dashboard

## Support

For technical support or questions about the affiliate system, refer to the API documentation or contact the development team. 