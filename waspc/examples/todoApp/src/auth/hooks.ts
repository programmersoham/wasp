import type {
  OnAfterOAuthTokenReceivedHookFn,
  OnAfterSignupHookFn,
  OnBeforeOAuthRedirectHookFn,
  OnBeforeSignupHookFn,
} from 'wasp/server/auth'

export const onBeforeSignup: OnBeforeSignupHookFn = async (args) => {
  const count = await args.prisma.user.count()
  console.log('before', count)
  console.log(args.providerId)
}

export const onAfterSignup: OnAfterSignupHookFn = async (args) => {
  const count = await args.prisma.user.count()
  console.log('after', count)
  console.log('user', args.user)
}

export const onBeforeOAuthRedirect: OnBeforeOAuthRedirectHookFn = async (
  args,
) => {
  console.log('req.query before redirect', args.req.query)
  args.url.searchParams.set('someState', '123')
  console.log('redirect to', args.url.toString())
  return { url: args.url }
}

export const onAfterOAuthTokenReceived: OnAfterOAuthTokenReceivedHookFn =
  async (args) => {
    console.log('req.query after callback', args.req.query)
    console.log('access token', args.accessToken)
  }
