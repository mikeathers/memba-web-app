'use client'
import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import {Formik} from 'formik'
import {object, string} from 'yup'
import {useRouter} from 'next/navigation'

import {Button, CenterBox, ErrorToast, Text, TextInput} from '@/components'
import {colorTokens, spacingTokens} from '@/styles'
import {useSafeAsync, useTenant} from '@/hooks'
import {useAuth} from '@/context'
import {CONFIG} from '@/config'

import {ErrorContainer, ActionsContainer} from './login.styles'
import {toast} from 'react-toastify'
import {checkIfUserCanLogIn} from '@/utils'

export interface LoginProps {
  content: LoginContent
}

export const Login: React.FC<LoginProps> = (props) => {
  const {content} = props
  const router = useRouter()
  const {signUserIn, resendConfirmationEmail} = useAuth()
  const {app} = useTenant()
  const {run, data, error, isLoading, isSuccess} = useSafeAsync()
  const [fetchError, setFetchError] = useState<string>('')
  const [isLocalLoading, setIsLocalLoading] = useState<boolean>(false)
  const [emailAddress, setEmailAddress] = useState<string>('')

  const handleResendConfirmationEmail = async () => {
    await run(resendConfirmationEmail(emailAddress))
  }

  useEffect(() => {
    if (isSuccess) {
      router.push(CONFIG.PAGE_ROUTES.HOME)
    }

    console.log({error})
    if (error?.message && error.message.includes('User does not exist')) {
      setFetchError(content.userNotFoundError)
      return
    }
    if (error?.message && error.message.includes('Incorrect username or password')) {
      setFetchError(content.incorrectUserNameOrPassword)
      return
    }
    if (error?.message && error.message.includes('User is not confirmed')) {
      handleResendConfirmationEmail()
      router.push(`${CONFIG.PAGE_ROUTES.CONFIRM_ACCOUNT}/?emailAddress=${emailAddress}`)
      return
    }
    if (error) {
      toast(
        <ErrorToast>
          <Text type={'body-bold'}>Something went wrong.</Text>
          <Text type={'body'}>Please try again later.</Text>
        </ErrorToast>,
      )
    }
  }, [error, data, isLoading])

  const formSchema = object({
    emailAddress: string()
      .required(content.form.validation.emailAddress)
      .email(content.form.validation.emailAddressFormat),
    password: string().required(content.form.validation.password),
  })

  const handleSubmitForm = async (values: LoginFormDetails) => {
    if (values.emailAddress && values.password) {
      setEmailAddress(values.emailAddress)
      await run(signUserIn(values))
    }
  }

  return (
    <CenterBox>
      <Text type={'h4'} $textAlign={'center'} $marginBottomX={spacingTokens.space4x}>
        {content.heading}
      </Text>

      <Formik
        initialValues={{
          emailAddress: '',
          password: '',
        }}
        onSubmit={(values) =>
          handleSubmitForm({...values, userCollection: app?.users || []})
        }
        validationSchema={formSchema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({handleChange, handleSubmit, values, errors}) => {
          return (
            <>
              <TextInput
                name={'emailAddress'}
                error={errors.emailAddress}
                placeholder={content.form.emailPlaceholder}
                onChange={handleChange('emailAddress')}
                value={values.emailAddress}
                autoComplete={'email'}
                autoCapitalize={'off'}
              />
              <TextInput
                name={'password'}
                error={errors.password}
                placeholder={content.form.passwordPlaceholder}
                onChange={handleChange('password')}
                value={values.password}
                type={'password'}
                autoCapitalize={'off'}
              />

              <ErrorContainer>
                {errors.emailAddress && (
                  <Text
                    type={'caption'}
                    color={colorTokens.reds500}
                    $marginBottomX={spacingTokens.spaceHalfx}
                  >
                    {errors.emailAddress}
                  </Text>
                )}

                {errors.password && (
                  <Text type={'caption'} color={colorTokens.reds500}>
                    {errors.password}
                  </Text>
                )}

                {fetchError && (
                  <Text type={'caption'} color={colorTokens.reds500}>
                    {fetchError}
                  </Text>
                )}
              </ErrorContainer>

              <Button
                isDisabled={isLoading || isLocalLoading}
                isLoading={isLoading}
                variant={'primary'}
                onClick={() => handleSubmit()}
                $marginTopX={spacingTokens.space2x}
                type={'submit'}
              >
                {content.form.loginCta}
              </Button>
            </>
          )
        }}
      </Formik>

      <ActionsContainer>
        <Link
          href={`${CONFIG.PAGE_ROUTES.FORGOT_PASSWORD}/?emailAddress=${emailAddress}`}
        >
          <Text type={'caption'} color={colorTokens.blues800}>
            {content.cantLogin}
          </Text>
        </Link>
        <Text type={'caption'} color={colorTokens.blues800}>
          •
        </Text>
        <Link href={CONFIG.PAGE_ROUTES.SIGN_UP}>
          <Text type={'caption'} color={colorTokens.blues800}>
            {content.signUp}
          </Text>
        </Link>
      </ActionsContainer>
    </CenterBox>
  )
}
