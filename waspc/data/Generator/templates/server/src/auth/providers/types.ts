{{={= =}=}}
import type { Router, Request } from 'express'
import type { {= userEntityUpper =} } from '../../entities'
import type { Expand } from '../../universal/types'

type UserEntity = {= userEntityUpper =}

export type ProviderConfig = {
    // Unique provider identifier, used as part of URL paths
    id: string;
    displayName: string;
    // Each provider config can have an init method which is ran on setup time
    // e.g. for oAuth providers this is the time when the Passport strategy is registered.
    init?(provider: ProviderConfig): Promise<InitData>;
    // Every provider must have a setupRouter method which returns the Express router.
    // In this function we are flexibile to do what ever is necessary to make the provider work.
    createRouter(provider: ProviderConfig, initData: InitData): Router;
};

export type InitData = {
    [key: string]: any;
}

export type RequestWithWasp = Request & { wasp?: { [key: string]: any } }

export type PossibleAdditionalSignupFields = Expand<Partial<UserEntity>>

export function createDefineAdditionalSignupFieldsFn() {
  return function defineFields(config: {
    [key in keyof PossibleAdditionalSignupFields]: FieldGetter<
      PossibleAdditionalSignupFields[key]
    >
  }) {
    return config
  }
}

type FieldGetter<T> = (
  data: { [key: string]: unknown }
) => Promise<T | undefined> | T | undefined
