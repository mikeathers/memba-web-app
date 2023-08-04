'use client'
import React, {useEffect} from 'react'
import {Button, CenterBox, ErrorToast, Text, TextInput} from '@/components'
import {colorTokens, spacingTokens} from '@/styles'
import {useRouter, useSearchParams} from 'next/navigation'
import {ErrorContainer} from '@/app-pages/forgot-password/forgot-password.styles'
import {Formik} from 'formik'
import {toast} from 'react-toastify'
import {object, string} from 'yup'
import {passwordValidation} from '@/utils'
import {useAuth} from '@/context'
import {useSafeAsync, useTenant} from '@/hooks'
import {CONFIG} from '@/config'

interface ResetPasswordProps {
  content: ResetPasswordContent
}

export const ResetPassword: React.FC<ResetPasswordProps> = (props) => {
  const {content} = props
  const searchParams = useSearchParams()
  const {completeResetPassword, signUserIn} = useAuth()
  const {app} = useTenant()
  const {run, isSuccess, isLoading, isError, error} = useSafeAsync()
  const router = useRouter()
  const [password, setPassword] = React.useState<string | undefined>(undefined)
  const code = searchParams?.get('code')
  const emailAddress = searchParams?.get('emailAddress')

  const handleSignIn = async () => {
    if (emailAddress && password) {
      await run(signUserIn({emailAddress, password, userCollection: app?.users || []}))
      router.push('/')
    }
  }
  useEffect(() => {
    if (isSuccess) {
      handleSignIn()
    } else if (isError) {
      toast(
        <ErrorToast>
          <Text type={'body-bold'}>Something went wrong.</Text>
          <Text type={'body'}>Please try again later.</Text>
        </ErrorToast>,
      )
    }
  }, [isSuccess, isError])

  const formSchema = object({
    password: string()
      .required(content.form.validation.password)
      .min(6, content.form.validation.passwordLengthMessage)
      .test(
        'isValidPassword',
        content.form.validation.passwordValidationMessage,
        (value) => passwordValidation(value),
      ),
  })

  const handleSubmitForm = async (values: ResetPasswordFormDetails) => {
    if (values.password && emailAddress && code) {
      setPassword(values.password)
      await run(completeResetPassword({emailAddress, code, password: values.password}))
    }
  }

  return (
    <CenterBox>
      <Text type={'h4'} $marginBottomX={spacingTokens.space4x} $textAlign={'center'}>
        {content.heading}
      </Text>
      <Formik
        initialValues={{
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
                name={'password'}
                error={errors.password}
                placeholder={content.form.passwordPlaceholder}
                onChange={handleChange('password')}
                value={values.password}
                type={'password'}
              />

              <ErrorContainer>
                {errors.password && (
                  <Text type={'body'} color={colorTokens.reds500}>
                    {errors.password}
                  </Text>
                )}
              </ErrorContainer>

              <Text
                type={'caption'}
                color={colorTokens.blues800}
                $marginBottomX={spacingTokens.space4x}
              >
                {content.form.validation.passwordValidationMessage}
              </Text>

              <Button
                isLoading={isLoading}
                isDisabled={isLoading}
                variant={'primary'}
                onClick={() => handleSubmit()}
                $marginTopX={spacingTokens.space2x}
                type={'submit'}
              >
                {content.submitCta}
              </Button>
            </>
          )
        }}
      </Formik>
    </CenterBox>
  )
}
