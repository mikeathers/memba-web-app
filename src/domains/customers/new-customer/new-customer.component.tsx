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
import {CONFIG} from '@/config'

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

                <Text type={'body'} color={colorTokens.reds500}>
                  {errors.firstName}
                </Text>

                <Text type={'body'} color={colorTokens.reds500}>
                  {errors.lastName}
                </Text>

                <Text type={'body'} color={colorTokens.reds500}>
                  {errors.companyName}
                </Text>

                <Text type={'body'} color={colorTokens.reds500}>
                  {errors.emailAddress}
                </Text>

                <Text type={'body'} color={colorTokens.reds500}>
                  {errors.password}
                </Text>

                {/*{shouldShowPasswordMessage(errors.password) && (*/}
                {/*  <Text type={'body'} color={colorTokens.reds500}>*/}
                {/*    {errors.password}*/}
                {/*  </Text>*/}
                {/*)}*/}

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
