import {mocked} from 'jest-mock'
import {useRouter} from 'next/navigation'
import {fireEvent, render, waitFor} from '@testing-library/react'

import {useCustomerStore} from '@/domains/public/customers/customers.store'
import {NewCustomer} from '@/domains'
import {mockNewCustomerContent} from '@/test-utils'
import {CONFIG} from '@/config'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

jest.mock('../customers.store')

const mockPush = jest.fn()
const mockRouter = mocked(useRouter)
const mockCustomerStore = mocked(useCustomerStore)

const renderComponent = () => render(<NewCustomer content={mockNewCustomerContent} />)

describe('New Customer', () => {
  beforeEach(() => {
    mockRouter.mockReturnValue({
      push: mockPush,
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    })
    mockCustomerStore.mockReturnValue({
      tier: 'Free',
    })
  })

  it('should render a card for your plan with correct price', () => {
    const {getByText} = renderComponent()
    expect(getByText(/£0.00/)).toBeInTheDocument()
  })

  it('should call router.push with correct route when clicking change on the your plan card', () => {
    const {getByText} = renderComponent()

    fireEvent.click(getByText(mockNewCustomerContent.change))

    expect(mockPush).toHaveBeenCalledWith(CONFIG.PAGE_ROUTES.PRICING_PLANS)
  })

  describe('Form validation', () => {
    it('should show validation messages when form is submitted empty', async () => {
      const {getByText} = renderComponent()

      fireEvent.click(getByText(mockNewCustomerContent.form.createAccount))

      await waitFor(() => {
        expect(
          getByText(mockNewCustomerContent.form.validation.companyName),
        ).toBeInTheDocument()
        expect(
          getByText(mockNewCustomerContent.form.validation.firstName),
        ).toBeInTheDocument()
        expect(
          getByText(mockNewCustomerContent.form.validation.lastName),
        ).toBeInTheDocument()
        expect(
          getByText(mockNewCustomerContent.form.validation.emailAddress),
        ).toBeInTheDocument()
        expect(
          getByText(mockNewCustomerContent.form.validation.password),
        ).toBeInTheDocument()
      })
    })

    it('should show validation message when form is submitted with incorrect email address', async () => {
      const {getByPlaceholderText, getByText} = renderComponent()

      fireEvent.change(
        getByPlaceholderText(mockNewCustomerContent.form.emailPlaceholder),
        {target: {value: 'testemail'}},
      )

      fireEvent.click(getByText(mockNewCustomerContent.form.createAccount))

      await waitFor(() => {
        expect(
          getByText(mockNewCustomerContent.form.validation.emailAddressFormat),
        ).toBeInTheDocument()
      })
    })

    it('should show validation message when form is submitted with a password below 6 characters', async () => {
      const {getByPlaceholderText, getByText} = renderComponent()

      fireEvent.change(
        getByPlaceholderText(mockNewCustomerContent.form.passwordPlaceholder),
        {target: {value: 'pass1'}},
      )

      fireEvent.click(getByText(mockNewCustomerContent.form.createAccount))

      await waitFor(() => {
        expect(
          getByText(mockNewCustomerContent.form.validation.passwordLengthMessage),
        ).toBeInTheDocument()
      })
    })

    it('should show validation message when form is submitted with a password that does not meet the criteria', async () => {
      const {getByPlaceholderText, getByText} = renderComponent()

      fireEvent.change(
        getByPlaceholderText(mockNewCustomerContent.form.passwordPlaceholder),
        {target: {value: 'Password1'}},
      )

      fireEvent.click(getByText(mockNewCustomerContent.form.createAccount))

      await waitFor(() => {
        expect(
          getByText(mockNewCustomerContent.form.validation.passwordValidationMessage),
        ).toBeInTheDocument()
      })
    })
  })
})
