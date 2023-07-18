import {fireEvent, render} from '@testing-library/react'
import {PricingPlans} from '@/domains'
import {mockPricingPlansContent} from '../../../test-support'
import {CONFIG} from '@/config'
import {useRouter} from 'next/navigation'
import {mocked} from 'jest-mock'
import {useTenantStore} from '../stores'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

jest.mock('../customers.store')

const mockPush = jest.fn()
const mockRouter = mocked(useRouter)
const mockCustomerStore = mocked(useTenantStore)
const mockSetTier = jest.fn()

const renderComponent = () => render(<PricingPlans content={mockPricingPlansContent} />)

describe('Pricing Plans', () => {
  beforeEach(() => {
    mockRouter.mockReturnValue({
      push: mockPush,
      ...expect.anything(),
    })
    mockCustomerStore.mockReturnValue({
      setTier: mockSetTier,
    })
  })

  it('should render three pricing plan cards', () => {
    const {getByText} = renderComponent()

    expect(getByText('Free')).toBeInTheDocument()
    expect(getByText('Basic')).toBeInTheDocument()
    expect(getByText('Premium')).toBeInTheDocument()
  })

  it('should call router.push when clicking get started', () => {
    const {getAllByText} = renderComponent()

    fireEvent.click(getAllByText('Get started')[0])

    expect(mockPush).toHaveBeenCalledWith(CONFIG.PAGE_ROUTES.NEW_TENANT)
  })

  it('should call setTier when clicking get started', () => {
    const {getAllByText} = renderComponent()

    fireEvent.click(getAllByText('Get started')[0])

    expect(mockSetTier).toHaveBeenCalledWith('Free')
  })
})
