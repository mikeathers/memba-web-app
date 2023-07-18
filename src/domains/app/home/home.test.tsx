import {render} from '@testing-library/react'
import {Home} from './home.component'

const renderComponent = () => render(<Home />)

describe('App Home', () => {
  it('should render correctly', () => {
    const {getByText} = renderComponent()

    expect(getByText('App Home')).toBeInTheDocument()
  })
})
