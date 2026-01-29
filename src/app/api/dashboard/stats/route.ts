import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function GET() {
  try {
    const supabase = createServerSupabaseClient()

    // Get counts from each table
    const [fundsResult, investorsResult, startupsResult] = await Promise.all([
      supabase.from('funds').select('id', { count: 'exact', head: true }),
      supabase.from('investors').select('id', { count: 'exact', head: true }),
      supabase.from('startups').select('id', { count: 'exact', head: true }),
    ])

    return NextResponse.json({
      totalFunds: fundsResult.count || 0,
      totalInvestors: investorsResult.count || 0,
      totalStartups: startupsResult.count || 0,
      recentMatches: 12, // Placeholder - would come from matches table
    })
  } catch (error) {
    console.error('Stats API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
