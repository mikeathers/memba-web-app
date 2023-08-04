'use client'
import React, {useEffect} from 'react'
import {Button, CenterBox, ErrorToast, SuccessToast, Text, TextInput} from '@/components'
import {colorTokens, spacingTokens} from '@/styles'
import {Formik} from 'formik'
import {object, string} from 'yup'
import {ActionsContainer, ErrorContainer} from './forgot-password.styles'
import {useSafeAsync} from '@/hooks'
import {useAuth} from '@/context'
import {useSearchParams} from 'next/navigation'
import {toast} from 'react-toastify'
import Link from 'next/link'
import {CONFIG} from '@/config'

interface ForgotPasswordProps {
  content: ForgotPasswordContent
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = (props) => {
  const {content} = props
  const {isLoading, run, isSuccess} = useSafeAsync()
  const {sendForgotPasswordLink} = useAuth()
  const searchParams = useSearchParams()

  const emailAddress = searchParams.get('emailAddress')

  const formSchema = object({
    emailAddress: string()
      .required(content.form.validation.emailAddress)
      .email(content.form.validation.emailAddressFormat),
  })

  useEffect(() => {
    if (isSuccess) {
      toast(
        <SuccessToast>
          <Text type={'body-bold'}>{`We've sent you an email!`}</Text>
          <Text type={'body'}>The recovery email is on its way!</Text>
        </SuccessToast>,
      )
    }
  }, [isSuccess])

  const handleSubmitForm = async (values: ForgotPasswordFormDetails) => {
    if (emailAddress || values.emailAddress) {
      await run(sendForgotPasswordLink(emailAddress || values.emailAddress))
    } else {
      toast(
        <ErrorToast>
          <Text type={'body-bold'}>Something went wrong.</Text>
          <Text type={'body'}>Please try again later.</Text>
        </ErrorToast>,
      )
    }
  }

  return (
    <CenterBox>
      <Text type={'h4'} $textAlign={'center'} $marginBottomX={spacingTokens.space4x}>
        {content.heading}
      </Text>

      <Formik
        initialValues={{
          emailAddress: emailAddress || '',
        }}
        onSubmit={(values) => handleSubmitForm(values)}
        validationSchema={formSchema}
        validateOnChange={true}
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
                label={content.message}
              />

              <ErrorContainer>
                {errors.emailAddress && (
                  <Text type={'body'} color={colorTokens.reds500}>
                    {errors.emailAddress}
                  </Text>
                )}
              </ErrorContainer>

              <Button
                isLoading={isLoading}
                isDisabled={isLoading}
                variant={'primary'}
                onClick={() => handleSubmit()}
                $marginTopX={spacingTokens.space2x}
                type={'submit'}
              >
                {content.sendLinkCta}
              </Button>
            </>
          )
        }}
      </Formik>

      <ActionsContainer>
        <Link href={CONFIG.PAGE_ROUTES.LOGIN}>
          <Text type={'caption'} color={colorTokens.blues800}>
            {content.returnToLogin}
          </Text>
        </Link>
      </ActionsContainer>
    </CenterBox>
  )
}
