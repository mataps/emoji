import { useState } from 'react'
import { Box, Button, Input, VStack, useToast } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useEmojiStore } from '../store/emojiStore'
import Replicate from 'replicate'

type FormData = {
  prompt: string
}

const replicate = new Replicate({
  auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN,
})

const EmojiGenerator = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, reset } = useForm<FormData>()
  const addEmoji = useEmojiStore((state) => state.addEmoji)
  const toast = useToast()

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    try {
      const output = await replicate.run(
        "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
        {
          input: {
            prompt: data.prompt,
            width: 512,
            height: 512,
          }
        }
      )
      
      if (output && typeof output === 'string') {
        await addEmoji({
          imageUrl: output,
          likes: 0,
        })
        toast({
          title: 'Emoji generated',
          description: 'Your new emoji has been created and saved!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        reset()
      }
    } catch (error) {
      console.error('Error generating emoji:', error)
      toast({
        title: 'Error',
        description: 'Failed to generate emoji. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
    setIsLoading(false)
  }

  return (
    <Box className="max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <Input
            {...register('prompt', { required: true })}
            placeholder="Enter your emoji prompt"
          />
          <Button type="submit" isLoading={isLoading}>
            Generate Emoji
          </Button>
        </VStack>
      </form>
    </Box>
  )
}

export default EmojiGenerator