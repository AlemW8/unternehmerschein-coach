import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  console.log('🧪 API Health Check called')
  
  try {
    return NextResponse.json({
      success: true,
      message: 'API ist erreichbar',
      timestamp: new Date().toISOString(),
      routes: {
        register: '/api/auth/register',
        verifySession: '/api/stripe/verify-session',
        testEmail: '/api/test-email'
      }
    })
  } catch (error) {
    console.error('❌ Health check error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Health check failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  console.log('🧪 API Test POST called')
  
  try {
    const body = await req.json()
    console.log('📋 Test POST body:', body)
    
    return NextResponse.json({
      success: true,
      message: 'POST Test erfolgreich',
      received: body,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('❌ Test POST error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Test POST failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
