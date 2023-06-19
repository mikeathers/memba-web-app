import '@testing-library/jest-dom/extend-expect'

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    isReady: true,
    pathname: '/',
    hash: '',
    query: {},
    asPath: '/',
    basePath: '',
  }),
}))

window.scrollTo = jest.fn()
