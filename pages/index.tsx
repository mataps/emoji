import { useEffect } from 'react'
import { Box, Container } from '@chakra-ui/react'
import { useUser } from '@clerk/nextjs'
import Header from '../components/Header'
import EmojiGenerator from '../components/EmojiGenerator'
import EmojiGrid from '../components/EmojiGrid'
import { useEmojiStore } from '../store/emojiStore'

export default function Home() {
  const { isSignedIn } = useUser()
  const fetchEmojis = useEmojiStore((state) => state.fetchEmojis)

  useEffect(() => {
    if (isSignedIn) {
      fetchEmojis()
    }
  }, [isSignedIn, fetchEmojis])

  return (
    <Container maxW="container.xl" className="py-8">
      <Header />
      {isSignedIn ? (
        <>
          <EmojiGenerator />
          <EmojiGrid />
        </>
      ) : (
        <Box className="text-center mt-16">
          Please sign in to create and view emojis.
        </Box>
      )}
    </Container>
  )
}