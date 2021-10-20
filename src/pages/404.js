import * as React from "react"

import Seo from "components/seo"
import Template from "components/Template"

const NotFoundPage = () => (
  <Template>
    <Seo title="404: Not found" />
    <h1>404: Not Found</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Template>
)

export default NotFoundPage
