'use client'
import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import {Formik} from 'formik'
import {object, string} from 'yup'
import {usePathname, useRouter} from 'next/navigation'

import {Button, CenterBox, Text, TextInput} from '@/components'
import {colorTokens, spacingTokens} from '@/styles'
import {passwordValidation} from '@/utils'
import {useSafeAsync, useTenant} from '@/hooks'
import {useAuth} from '@/context'
import {CONFIG} from '@/config'

import {ErrorContainer, LoginContainer} from './signup.styles'
import {getApp} from '@/services'

export interface SignUpProps {
  content: SignUpContent
}

export const SignUp: React.FC<SignUpProps> = (props) => {
  const {content} = props
  const router = useRouter()
  const {registerUser} = useAuth()
  const {app} = useTenant()
  const {run, data, error, isLoading, isSuccess} = useSafeAsync()
  const [fetchError, setFetchError] = useState<string>('')
  const [emailAddress, setEmailAddress] = useState<string>('')

  useEffect(() => {
    if (isSuccess) {
      router.push(`${CONFIG.PAGE_ROUTES.CONFIRM_ACCOUNT}/?emailAddress=${emailAddress}`)
    }

    if (error?.message.includes('already exists')) {
      setFetchError(content.userAlreadyExistsError)
      return
    }
    if (error?.message.includes('Name')) {
      setFetchError(content.fullNameRequireError)
      return
    }
    if (error) {
      setFetchError(content.genericError)
      return
    }
  }, [error, data, isLoading])

  const formSchema = object({
    emailAddress: string()
      .required(content.form.validation.emailAddress)
      .email(content.form.validation.emailAddressFormat),
    fullName: string().required(content.form.validation.fullName),
    password: string()
      .required(content.form.validation.password)
      .min(6, content.form.validation.passwordLengthMessage)
      .test(
        'isValidPassword',
        content.form.validation.passwordValidationMessage,
        (value) => passwordValidation(value),
      ),
  })

  const handleSubmitForm = async (values: SignupFormDetails) => {
    setEmailAddress(values.emailAddress)
    if (app?.groupName) {
      const membership: UserMembership = {
        name: app.name,
        id: app.id,
        url: app.url,
        tier: app.tier,
        type: app.type,
      }

      await run(
        registerUser({
          ...values,
          groupName: app?.groupName,
          appId: app.id,
          signUpRedirectUrl: app.url,
          membership,
        }),
      )
    }
  }

  const handleGoToLogin = () => {
    router.push(`${CONFIG.SITE_ROUTES.ID}/login/?id=${app?.id || ''}`)
  }

  return (
    <CenterBox>
      <Text type={'h4'} $textAlign={'center'} $marginBottomX={spacingTokens.space4x}>
        {content.heading}
      </Text>

      <Formik
        initialValues={{
          fullName: '',
          emailAddress: '',
          password: '',
        }}
        onSubmit={(values) => handleSubmitForm(values)}
        validationSchema={formSchema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({handleChange, handleSubmit, values, errors}) => {
          return (
            <>
              <TextInput
                name={'fullName'}
                error={errors.fullName}
                placeholder={content.form.fullNamePlaceholder}
                onChange={handleChange('fullName')}
                value={values.fullName}
                autoComplete={'name'}
              />
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
                {errors.fullName && (
                  <Text
                    type={'caption'}
                    color={colorTokens.reds500}
                    $marginBottomX={spacingTokens.spaceHalfx}
                  >
                    {errors.fullName}
                  </Text>
                )}

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
                  <Text
                    type={'caption'}
                    color={colorTokens.reds500}
                    $marginBottomX={spacingTokens.spaceHalfx}
                  >
                    {errors.password}
                  </Text>
                )}

                {fetchError && (
                  <Text type={'caption'} color={colorTokens.reds500}>
                    {fetchError}
                  </Text>
                )}
              </ErrorContainer>

              <Text type={'footnote'}>{content.termsOfService}</Text>

              <Button
                isDisabled={isLoading}
                isLoading={isLoading}
                variant={'primary'}
                onClick={() => handleSubmit()}
                $marginTopX={spacingTokens.space4x}
                type={'submit'}
              >
                {content.form.signUpCta}
              </Button>
            </>
          )
        }}
      </Formik>

      <LoginContainer>
        <Button onClick={handleGoToLogin} variant={'text'} color={colorTokens.blues800}>
          {content.login}
        </Button>
      </LoginContainer>
    </CenterBox>
  )
}
