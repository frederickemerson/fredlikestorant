
import { NextRequest, NextResponse } from 'next/server'
import type { Message } from '@grammyjs/types';
import { env } from '~/env';

interface TelegramChatMessage {
    message_id: number;
    chat: {
      id: number;
      title: string;
      type: string;
    };
    date: number;
    text?: string;
  }
  
  interface TelegramChatHistoryResponse {
    ok: boolean;
    result: TelegramChatMessage[];
    description?: string;
  }
  

export const GET = async (req: NextRequest) => {
    const telegramApiUrl = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/getChat`;

    try {
      // Fetch the last message from the specified chat_id
      const response = await fetch(telegramApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: parseInt(env.TELEGRAM_CHAT_ID), // Ensure TELEGRAM_CHAT_ID is a valid number
          limit: 1, // Fetch only the last message
        }),
      });
  
      const data: TelegramChatHistoryResponse = await response.json();
      
      if (!data.ok) {
        return new NextResponse(JSON.stringify({ error: data.description || 'Failed to fetch chat history.' }), {
          status: 400,
        });
      }
        
      // Get the last message
      const lastMessage = data.result ? data.result.pinned_message.text : null;
  
      return new NextResponse(JSON.stringify({ lastMessage }), { status: 200 });
    } catch (error) {
      console.error('Error fetching last message:', error);
      return new NextResponse('Internal server error', { status: 500 });
    }
}