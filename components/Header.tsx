import { Box, Flex, Button } from '@chakra-ui/react'
import { useClerk, useUser } from '@clerk/nextjs'

const Header = () => {
  const { openSignIn } = useClerk()
  const { isSignedIn, user } = useUser()

  return (
    <Box as="header" className="py-4 mb-8">
      <Flex justify="space-between" align="center">
        <Box className="text-2xl font-bold">Emoji Maker</Box>
        {isSignedIn ? (
          <Box>{user.fullName}</Box>
        ) : (
          <Button onClick={() => openSignIn()}>Sign In</Button>
        )}
      </Flex>
    </Box>
  )
}

export default Header