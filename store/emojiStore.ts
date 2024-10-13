import { create } from 'zustand'
import { supabase } from '../lib/supabase'

type Emoji = {
  id: string
  imageUrl: string
  likes: number
}

type EmojiStore = {
  emojis: Emoji[]
  fetchEmojis: () => Promise<void>
  addEmoji: (emoji: Omit<Emoji, 'id'>) => Promise<void>
  likeEmoji: (id: string) => Promise<void>
}

export const useEmojiStore = create<EmojiStore>((set) => ({
  emojis: [],
  fetchEmojis: async () => {
    const { data, error } = await supabase
      .from('emojis')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching emojis:', error)
    } else {
      set({ emojis: data || [] })
    }
  },
  addEmoji: async (emoji) => {
    const { data, error } = await supabase
      .from('emojis')
      .insert([emoji])
      .select()
    
    if (error) {
      console.error('Error adding emoji:', error)
    } else if (data) {
      set((state) => ({ emojis: [data[0], ...state.emojis] }))
    }
  },
  likeEmoji: async (id) => {
    const { data, error } = await supabase
      .from('emojis')
      .update({ likes: supabase.raw('likes + 1') })
      .eq('id', id)
      .select()

    if (error) {
      console.error('Error liking emoji:', error)
    } else if (data) {
      set((state) => ({
        emojis: state.emojis.map((emoji) =>
          emoji.id === id ? { ...emoji, likes: data[0].likes } : emoji
        ),
      }))
    }
  },
}))