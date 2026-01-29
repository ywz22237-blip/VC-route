import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { name, email, password, userType, company } = await request.json()

    // Validation
    if (!name || !email || !password || !userType || !company) {
      return NextResponse.json(
        { error: '모든 필수 항목을 입력해주세요' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: '비밀번호는 8자 이상이어야 합니다' },
        { status: 400 }
      )
    }

    const supabase = createServerSupabaseClient()

    // Check if email already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single()

    if (existingUser) {
      return NextResponse.json(
        { error: '이미 등록된 이메일입니다' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const { data: newUser, error } = await supabase
      .from('users')
      .insert([
        {
          name,
          email,
          password: hashedPassword,
          user_type: userType,
          company,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: '회원가입 처리 중 오류가 발생했습니다' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: '회원가입이 완료되었습니다', userId: newUser.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json(
      { error: '회원가입 처리 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}
