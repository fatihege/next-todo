/** @type {import('next').NextConfig} */
require('dotenv').config()

const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    DEFAULT_PROFILE_PICTURE: process.env.DEFAULT_PROFILE_PICTURE,
  },
}

module.exports = nextConfig
