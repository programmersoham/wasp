{{={= =}=}}
import { handleRejection } from '../../utils.js'

import {= operationName =} from "{= operationImportPath =}"

export default handleRejection(async (req, res) => {
  const args = JSON.parse(req?.query?.args || '{}')

  const context = {
    {=# userEntityLower =}
    user: req.user
    {=/ userEntityLower =}
  }

  const result = await {= operationName =}(args, context)
  res.json(result)
})
