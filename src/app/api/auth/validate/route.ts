import { NextRequest, NextResponse } from 'next/server'
import AuthService from '@/lib/auth-service'

export async function POST(request: NextRequest) {
  try {
    console.log('🔍 Token validation API called')
    
    const body = await request.json()
    const { token } = body
    
    if (!token) {
      return NextResponse.json({
        success: false,
        error: 'Token ist erforderlich'
      }, { status: 400 })
    }
    
    // Token validieren
    const result = await AuthService.validateToken(token)
    
    if (result.success) {
      console.log('✅ Token validation successful')
      return NextResponse.json({
        success: true,
        user: result.user,
        token: result.token
      })
    } else {
      console.log('❌ Token validation failed:', result.error)
      return NextResponse.json({
        success: false,
        error: result.error
      }, { status: 401 })
    }
    
  } catch (error) {
    console.error('❌ Token validation API error:', error)
    return NextResponse.json({
      success: false,
      error: 'Interner Server-Fehler'
    }, { status: 500 })
  }
}

// GET method für Health Check
export async function GET() {
  return NextResponse.json({
    status: 'OK',
    service: 'Token Validation API',
    timestamp: new Date().toISOString()
  })
}
