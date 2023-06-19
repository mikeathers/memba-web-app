'use client'
import type React from 'react'
import {object, string} from 'yup'
import {Formik} from 'formik'

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
import {useRouter} from 'next/navigation'
import {ROUTES} from '@/config'

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
    router.push(ROUTES.PRICING_PLANS)
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

  const getPricing = () => {
    if (tier == 'Free') return content.freePricing
    if (tier == 'Basic') return content.basicPricing
    if (tier == 'Premium') return content.premiumPricing
    return ''
  }

  const handleSubmitForm = (values: NewCustomerFormDetails) => {
    console.log({values})
  }

  const formSchema = object({
    emailAddress: string().required().email(),
    firstName: string().required(),
    lastName: string().required(),
    companyName: string().required(),
    password: string()
      .required()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      .min(6, content.form.passwordLengthMessage)
      .test('isValidPassword', content.form.passwordValidationMessage, (value) =>
        passwordValidation(value),
      ),
  })

  const shouldShowPasswordMessage = (error: string | undefined) =>
    error && (error.includes('symbols') || error.includes('6 characters'))

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

                {shouldShowPasswordMessage(errors.password) && (
                  <Text type={'body'} color={colorTokens.reds500}>
                    {errors.password}
                  </Text>
                )}

                <Button
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
