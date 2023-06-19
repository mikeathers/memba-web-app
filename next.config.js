/** @type {import('next').NextConfig} */
require('dotenv').config({path: `${process.env.ENVIRONMENT}`})
const nextConfig = {
  output: 'standalone',
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig
