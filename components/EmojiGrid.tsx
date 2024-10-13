import { Box, SimpleGrid, Image, Button, Text } from '@chakra-ui/react'
import { useEmojiStore } from '../store/emojiStore'

const EmojiGrid = () => {
  const emojis = useEmojiStore((state) => state.emojis)
  const likeEmoji = useEmojiStore((state) => state.likeEmoji)

  if (emojis.length === 0) {
    return (
      <Box className="text-center mt-8">
        <Text>No emojis yet. Generate your first emoji!</Text>
      </Box>
    )
  }

  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={4} className="mt-8">
      {emojis.map((emoji) => (
        <Box key={emoji.id} className="relative">
          <Image src={emoji.imageUrl} alt="Generated Emoji" className="rounded-lg w-full" />
          <Button
            size="sm"
            position="absolute"
            bottom={2}
            right={2}
            onClick={() => likeEmoji(emoji.id)}
          >
            Like ({emoji.likes})
          </Button>
        </Box>
      ))}
    </SimpleGrid>
  )
}

export default EmojiGrid