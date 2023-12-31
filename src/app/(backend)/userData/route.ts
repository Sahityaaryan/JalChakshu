import {cookies} from 'next/headers'
import {verify} from 'jsonwebtoken'
import { pool } from '../config/db';
import Decrypt from '@/utils/Decrypt';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(req:NextRequest)
{
   try {
     const cookieStore = cookies();

    const encryptedToken = cookieStore.get('Auth')?.value;

    const token:string = Decrypt(encryptedToken);

    const user = await verify(token,process.env.NEXT_PUBLIC_PRIVATE_KEY);

      // console.log("user: ",user);
   return NextResponse.json({user:user})
   
   } catch (e) {
   //  console.log("Error: ",e);
    return NextResponse.json({user:'',message:e.message})
   }
}