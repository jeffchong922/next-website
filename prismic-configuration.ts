// https://prismic.io/docs/technologies/prismic-and-nextjs

import Prismic from 'prismic-javascript'
import { ApiOptions } from 'prismic-javascript/types/Api'
import { DefaultClient } from 'prismic-javascript/types/client'

export type MakeClient = (req?: Partial<ApiOptions>) => DefaultClient
export type CreateClientOptions = (req?: Partial<ApiOptions>, token?: string) => ApiOptions

const API_TOKEN = process.env.PRISMIC_API_TOKEN
const REPOSITORY_NAME = process.env.PRISMIC_REPOSITORY_NAME
const API_ENDPOINT = `https://${REPOSITORY_NAME}.cdn.prismic.io/api/v2`


export const makeClient: MakeClient = (req = null) => (
  Prismic.client(API_ENDPOINT, createClientOptions(req, API_TOKEN))
)

const createClientOptions: CreateClientOptions = (req = null, prismicAccessToken = null) => {
  const reqOption = req ? req : {}
  const accessTokenOption: Partial<ApiOptions> = prismicAccessToken ? { accessToken: prismicAccessToken } : {}
  return {
    ...reqOption,
    ...accessTokenOption
  }
}