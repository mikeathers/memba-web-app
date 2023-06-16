'use client'
import type React from 'react'
import {object, string} from 'yup'

import {useCustomerStore} from '@/domains/customers/customers.store'
import {Button, Text, TextInput} from '@/components'
import {passwordValidation, sentenceCase} from '@/utils'

import {Container, YourPlanCard, YourPlanContainer} from './new-customer.styles'
import {Formik} from 'formik'
import {colorTokens, spacingTokens} from '@/styles'

interface NewCustomersComponentProps {
  content: NewCustomerContent
}

interface YourPlanCardProps {
  tier: string
  pricing: string
}

const Card: React.FC<YourPlanCardProps> = ({tier, pricing}) => {
  return (
    <YourPlanCard>
      <Text type={'h1'}>{sentenceCase(tier)}</Text>
      <Text type={'body'}>{pricing}</Text>
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

  return (
    <Container>
      <Text type={'h1'}>{content.heading}</Text>

      <YourPlanContainer>
        <Text type={'h2'}>{content.yourPlan}</Text>
        <Card tier={tier} pricing={`${getPricing()} ${content.perMonth}`} />
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
          console.log({errors})

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
              {errors.password && (
                <Text type={'body'} color={colorTokens.reds500}>
                  {errors.password}
                </Text>
              )}
              <Button
                variant={'primary'}
                onClick={() => handleSubmit()}
                $marginTopX={spacingTokens.space4x}
              >
                {content.form.createAccount}
              </Button>
            </>
          )
        }}
      </Formik>
    </Container>
  )
}
