'use client'
import axios from 'axios'
import type React from 'react'
import {object, string} from 'yup'
import {Formik} from 'formik'
import {useRouter} from 'next/navigation'

import {Button, Text, TextInput} from '@/components'
import {passwordValidation, sentenceCase} from '@/utils'
import {colorTokens, spacingTokens} from '@/styles'

import {useCustomerStore} from '../customers.store'
import {
  Container,
  Content,
  YourPlanCard,
  YourPlanChangeText,
  YourPlanContainer,
} from './new-customer.styles'
import {CONFIG} from '@/config'
import {createCustomerAccount} from '@/services'
import {isHttpBadResponse} from '@/utils/type-guarding'
import {useSafeAsync} from '@/hooks'
import {useEffect, useState} from 'react'

interface NewCustomersComponentProps {
  content: NewCustomerContent
}

interface YourPlanCardProps {
  tier: string
  pricing: string
  change: string
}

const Card: React.FC<YourPlanCardProps> = ({tier, pricing, change}) => {
  const router = useRouter()

  const handleChangePlanClick = () => {
    router.push(CONFIG.PAGE_ROUTES.PRICING_PLANS)
  }

  return (
    <YourPlanCard>
      <Text type={'h1'}>{sentenceCase(tier)}</Text>
      <Text type={'body'}>{pricing}</Text>
      <YourPlanChangeText onClick={handleChangePlanClick}>{change}</YourPlanChangeText>
    </YourPlanCard>
  )
}

export const NewCustomer: React.FC<NewCustomersComponentProps> = (props) => {
  const {content} = props
  const {tier} = useCustomerStore()
  const router = useRouter()
  const {run, data, error, isLoading, isSuccess} = useSafeAsync()
  const [fetchError, setFetchError] = useState<string>('')
  const getPricing = () => {
    if (tier == 'Free') return content.freePricing
    if (tier == 'Basic') return content.basicPricing
    if (tier == 'Premium') return content.premiumPricing
    return ''
  }

  useEffect(() => {
    console.log({error, data, isLoading})

    if (isSuccess) {
      router.push(CONFIG.PAGE_ROUTES.CONFIRM_ACCOUNT)
    }

    if (axios.isAxiosError(error)) {
      if (isHttpBadResponse(error.response?.data)) {
        if (error.response?.data.message.includes('already exists')) {
          setFetchError('A tenant with the details you have provided already exists')
        }
      }
    }
  }, [error, data, isLoading])

  const handleSubmitForm = async (values: NewCustomerFormDetails) => {
    const {companyName, ...rest} = values

    await run(
      createCustomerAccount({
        tenantName: companyName,
        tier,
        ...rest,
      }),
    )
  }

  const formSchema = object({
    emailAddress: string()
      .required(content.form.validation.emailAddress)
      .email(content.form.validation.emailAddressFormat),
    firstName: string().required(content.form.validation.firstName),
    lastName: string().required(content.form.validation.lastName),
    companyName: string().required(content.form.validation.companyName),
    password: string()
      .required(content.form.validation.password)
      .min(6, content.form.validation.passwordLengthMessage)
      .test(
        'isValidPassword',
        content.form.validation.passwordValidationMessage,
        (value) => passwordValidation(value),
      ),
  })

  return (
    <Container>
      <Content>
        <Text type={'h1'}>{content.heading}</Text>

        <YourPlanContainer>
          <Text type={'h2'}>{content.yourPlan}</Text>
          <Card
            tier={tier}
            pricing={`${getPricing()} ${content.perMonth}`}
            change={content.change}
          />
        </YourPlanContainer>

        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            emailAddress: '',
            password: '',
            companyName: '',
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
                  name={'companyName'}
                  error={errors.companyName}
                  label={content.form.companyName}
                  placeholder={content.form.companyNamePlaceholder}
                  onChange={handleChange('companyName')}
                  value={values.companyName}
                />
                <TextInput
                  name={'firstName'}
                  error={errors.firstName}
                  label={content.form.firstName}
                  placeholder={content.form.firstNamePlaceholder}
                  onChange={handleChange('firstName')}
                  value={values.firstName}
                />
                <TextInput
                  name={'lastName'}
                  error={errors.lastName}
                  label={content.form.lastName}
                  placeholder={content.form.lastNamePlaceholder}
                  onChange={handleChange('lastName')}
                  value={values.lastName}
                />
                <TextInput
                  name={'emailAddress'}
                  error={errors.emailAddress}
                  label={content.form.email}
                  placeholder={content.form.emailPlaceholder}
                  onChange={handleChange('emailAddress')}
                  value={values.emailAddress}
                />
                <TextInput
                  name={'password'}
                  error={errors.password}
                  label={content.form.password}
                  placeholder={content.form.passwordPlaceholder}
                  onChange={handleChange('password')}
                  value={values.password}
                  type={'password'}
                />

                {errors.firstName && (
                  <Text type={'body'} color={colorTokens.reds500}>
                    {errors.firstName}
                  </Text>
                )}

                {errors.lastName && (
                  <Text type={'body'} color={colorTokens.reds500}>
                    {errors.lastName}
                  </Text>
                )}

                {errors.companyName && (
                  <Text type={'body'} color={colorTokens.reds500}>
                    {errors.companyName}
                  </Text>
                )}

                {errors.emailAddress && (
                  <Text type={'body'} color={colorTokens.reds500}>
                    {errors.emailAddress}
                  </Text>
                )}

                {errors.password && (
                  <Text type={'body'} color={colorTokens.reds500}>
                    {errors.password}
                  </Text>
                )}

                {fetchError && (
                  <Text type={'body'} color={colorTokens.reds500}>
                    {fetchError}
                  </Text>
                )}

                <Button
                  isLoading={isLoading}
                  variant={'primary'}
                  onClick={() => handleSubmit()}
                  $marginTopX={spacingTokens.space4x}
                  type={'submit'}
                >
                  {content.form.createAccount}
                </Button>
              </>
            )
          }}
        </Formik>
      </Content>
    </Container>
  )
}