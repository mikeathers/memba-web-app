import {mocked} from 'jest-mock'
import {useRouter} from 'next/navigation'
import {fireEvent, render} from '@testing-library/react'

import {useCustomerStore} from '@/domains/customers/customers.store'
import {NewCustomer} from '@/domains'
import {mockNewCustomerContent} from '@/test-utils'
import {ROUTES} from '@/config'

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

    expect(mockPush).toHaveBeenCalledWith(ROUTES.PRICING_PLANS)
  })
})
