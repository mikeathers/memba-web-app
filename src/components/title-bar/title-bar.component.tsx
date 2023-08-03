'use client'
import type React from 'react'

import {
  ActionButton,
  ActionsContainer,
  AvatarCircle,
  AvatarCircleSmall,
  Circle,
  Container,
  LeftContent,
  Menu,
  MenuTitleContainer,
  Name,
  NameContainer,
  RightContent,
} from './title-bar.styles'
import {Text} from '../text'
import {useAuth} from '@/context'
import {useComponentVisible, useSafeAsync, useTenant} from '@/hooks'
import {sentenceCase} from '@/utils'
import {spacingTokens} from '@/styles'
import {useRouter} from 'next/navigation'
import {CONFIG} from '@/config'
import {useEffect, useState} from 'react'

export const TitleBar: React.FC = () => {
  const {signUserOut} = useAuth()
  const router = useRouter()
  const {user} = useTenant()
  const [initials, setInitials] = useState<{firstInitial: string; lastInitial: string}>({
    firstInitial: '',
    lastInitial: '',
  })
  const [appName, setAppName] = useState<string>('')
  const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false)

  useEffect(() => {
    console.log({user})
    if (user) {
      const firstNameInitial = user?.firstName?.charAt(0).toUpperCase()
      const lastNameInitial = user?.lastName?.charAt(0).toUpperCase()

      setInitials({firstInitial: firstNameInitial, lastInitial: lastNameInitial})
    }
  }, [user?.firstName, user?.lastName])

  useEffect(() => {
    const tenant = user?.tenant?.apps.find((item) => item.type === 'gym-management')
    const appName = tenant?.name || 'Memba'
    setAppName(appName)
  }, [user?.tenant])

  const handleLogout = async () => {
    await signUserOut()
    if (user?.isTenantAdmin) {
      router.push(CONFIG.SITE_ROUTES.ID)
    }
  }

  return (
    <Container>
      <LeftContent>
        <Circle />
        <Text type={'h2'}>{appName}</Text>
      </LeftContent>
      <RightContent>
        <AvatarCircle onClick={() => setIsComponentVisible(!isComponentVisible)}>
          <Text type={'h4'}>{initials.firstInitial}</Text>
          <Text type={'h4'}>{initials.lastInitial}</Text>
        </AvatarCircle>
        {isComponentVisible && (
          <Menu ref={ref}>
            <MenuTitleContainer>
              <Text type={'body-bold'} $marginBottomX={spacingTokens.space2x}>
                Account
              </Text>
              <NameContainer>
                <AvatarCircleSmall>
                  <Text type={'body'}>{initials.firstInitial}</Text>
                  <Text type={'body'}>{initials.lastInitial}</Text>
                </AvatarCircleSmall>
                <Name>
                  <Text type={'body'}>{`${sentenceCase(user?.firstName)} ${sentenceCase(
                    user?.lastName,
                  )}`}</Text>
                  <Text type={'caption'}>{user?.emailAddress}</Text>
                </Name>
              </NameContainer>
            </MenuTitleContainer>
            <ActionsContainer>
              <ActionButton variant={'text'}>Account settings</ActionButton>
              <ActionButton variant={'text'} onClick={handleLogout}>
                Log out
              </ActionButton>
            </ActionsContainer>
          </Menu>
        )}
      </RightContent>
    </Container>
  )
}
